import asyncio
import os
import json
import mimetypes
from pprint import pprint
import paratranz_client
from pydantic import ValidationError

configuration = paratranz_client.Configuration(host="https://paratranz.cn/api")
configuration.api_key["Token"] = os.environ["API_TOKEN"]


async def upload_file(path, file_path):
    async with paratranz_client.ApiClient(configuration) as api_client:
        api_instance = paratranz_client.FilesApi(api_client)
        project_id = int(os.environ["PROJECT_ID"])
        files_response = await api_instance.get_files(project_id)
        
        # 打印获取到的所有文件信息
        print(f"当前项目共有 {len(files_response)} 个文件")
        
        # 确保文件路径正确
        file_name = os.path.basename(file_path)
        file_dest_path = path + file_name
        
        try:
            # 第一次创建文件
            with open(file_path, 'rb') as f:
                file_content = f.read()
                
            api_response = await api_instance.create_file(
                project_id, 
                path=path,
                file=file_path  # 传递文件路径
            )
            pprint(api_response)
        except paratranz_client.exceptions.BadRequestException as error:
            # 检查错误信息是否表示文件已存在
            if "exists" in error.body:
                # 提取文件路径
                error_msg = json.loads(error.body)["message"]
                print(f"错误信息: {error_msg}")
                
                # 从错误信息中提取完整的文件路径
                existing_file_path = error_msg.split("File ")[1].split(" exists")[0]
                print(f"需要更新的文件路径: {existing_file_path}")
                
                # 查找文件 ID
                file_id = None
                for fileName in files_response:
                    if hasattr(fileName, 'name'):
                        print(f"检查文件: {fileName.name}")
                        # 不同格式的匹配尝试
                        if fileName.name == existing_file_path or \
                           fileName.name.endswith(existing_file_path) or \
                           existing_file_path.endswith(fileName.name):
                            file_id = fileName.id
                            print(f"找到匹配! ID: {file_id}")
                            break
                
                if file_id:
                    # 更新文件，确保使用正确的参数格式
                    try:
                        response = await api_instance.update_file(
                            project_id, 
                            file_id=file_id, 
                            file=file_path  # 传递文件路径
                        )
                        print(f"文件已更新！文件路径为：{existing_file_path}")
                    except Exception as update_error:
                        print(f"更新文件时出错: {update_error}")
                        # 如果仍然失败，尝试另一种方法
                        try:
                            print("尝试替代更新方法...")
                            # 使用save_file方法代替update_file
                            save_response = await api_instance.save_file(
                                project_id,
                                file_id=file_id,
                                save_file_request={"name": existing_file_path}
                            )
                            print(f"文件元数据已更新：{save_response}")
                        except Exception as save_error:
                            print(f"保存文件元数据也失败: {save_error}")
                else:
                    print(f"无法找到要更新的文件的ID：{existing_file_path}")
                    print("可用的文件列表:")
                    for idx, f in enumerate(files_response):
                        if hasattr(f, 'name'):
                            print(f"  {idx+1}. {f.name} (ID: {f.id})")
            else:
                # 其他错误
                print(f"上传文件时出错：{error}")
        except Exception as e:
            print(f"处理文件时出错：{e}")


def get_filelist(dir):
    filelist = []
    for root, _, files in os.walk(dir):
        for file in files:
            if "en_us" in file and file.endswith(".json"):
                filelist.append(os.path.join(root, file))
    return filelist


async def main():
    files = get_filelist("./Source")
    tasks = []

    for file_path in files:
        path = (
            file_path.split("Source")[1]
            .replace("\\", "/")
            .replace(os.path.basename(file_path), "")
        )
        print(f"Uploading {file_path} to {path}")
        tasks.append(upload_file(path=path, file_path=file_path))

    await asyncio.gather(*tasks)


if __name__ == "__main__":
    asyncio.run(main())
