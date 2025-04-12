import asyncio
import os
import json
from pprint import pprint
import paratranz_client
from paratranz_client.exceptions import ApiException, BadRequestException
# 恢复到仅传递文件路径，移除无效的 filename 参数尝试


configuration = paratranz_client.Configuration(host="https://paratranz.cn/api")
configuration.api_key["Token"] = os.environ["API_TOKEN"]


async def upload_file(local_file_path, target_path): # 重命名参数以更清晰
    async with paratranz_client.ApiClient(configuration) as api_client:
        api_instance = paratranz_client.FilesApi(api_client)
        project_id = int(os.environ["PROJECT_ID"])
        file_basename = os.path.basename(local_file_path)
        paratranz_file_path = f"{target_path}{file_basename}".lstrip('/') # Paratranz 上的预期路径

        try:
            # 尝试创建文件，直接传递本地文件路径给 SDK
            print(f"尝试创建文件: {paratranz_file_path} (源路径: {local_file_path})")
            api_response = await api_instance.create_file(
                project_id,
                file=local_file_path, # 传递本地文件路径字符串
                path=target_path # API 需要目录路径
            )
            print(f"成功创建文件: {paratranz_file_path}")
            pprint(api_response) # 修正缩进

        except BadRequestException as e:
            # 检查是否是 "文件已存在" 的错误 (HTTP 400)
            # 注意：错误消息可能变化，检查状态码和消息内容更可靠
            if e.status == 400 and "exists" in str(e.body).lower():
                print(f"文件已存在: {paratranz_file_path}。尝试更新。")
                try:
                    # 获取文件列表以查找文件 ID
                    files_response = await api_instance.get_files(project_id)
                    file_id_to_update = None

                    for p_file in files_response:
                        # 确保比较时处理前导斜杠一致性
                        if p_file.name.lstrip('/') == paratranz_file_path:
                            file_id_to_update = p_file.id
                            break

                    if file_id_to_update:
                        # 找到文件 ID，尝试使用文件路径更新（已知可能导致 500 错误）
                        try:
                            print(f"找到文件 ID: {file_id_to_update}，尝试使用文件路径更新... (源路径: {local_file_path})")
                            await api_instance.update_file(
                                project_id,
                                file_id=file_id_to_update,
                                file=local_file_path # 传递本地文件路径字符串
                            )
                            print(f"成功更新文件: {paratranz_file_path}")
                        except Exception as inner_update_e:
                             # 捕获调用 update_file 时可能发生的错误
                             print(f"使用文件路径更新文件 {paratranz_file_path} 时发生错误: {inner_update_e}")
                             if hasattr(inner_update_e, 'status') and hasattr(inner_update_e, 'reason'):
                                 print(f"HTTP Status: {inner_update_e.status} {inner_update_e.reason}")
                             if hasattr(inner_update_e, 'body') and inner_update_e.body:
                                 print(f"API 响应体: {inner_update_e.body}")


                    else:
                        print(f"错误: 文件 '{paratranz_file_path}' 报告为已存在，但在项目文件列表中未找到。")
                        print("可用文件列表:")
                        for p_file in files_response:
                            print(f"- {p_file.name} (ID: {p_file.id})")


                except ApiException as update_e:
                    print(f"更新文件 {paratranz_file_path} 时出错 (ApiException): {update_e}")
                    # 打印更详细的错误信息，如果可用
                    if hasattr(update_e, 'body') and update_e.body:
                        print(f"API 响应体: {update_e.body}")
                except Exception as update_gen_e:
                     print(f"更新文件 {paratranz_file_path} 时发生意外错误: {update_gen_e}")

            else:
                # 其他类型的 BadRequestException
                print(f"创建文件 {local_file_path} 时发生 BadRequestException: {e}")
                if hasattr(e, 'body') and e.body:
                    print(f"API 响应体: {e.body}")

        except ApiException as api_e:
            # 处理其他 Paratranz API 错误
            print(f"创建文件 {local_file_path} 时发生 ApiException: {api_e}")
            if hasattr(api_e, 'body') and api_e.body:
                print(f"API 响应体: {api_e.body}")

        except Exception as gen_e:
            # 处理其他意外错误
            print(f"处理文件 {local_file_path} 时发生意外错误: {gen_e}")


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

    for local_file in files: # 重命名变量
        # 构建 Paratranz 上的目标目录路径
        # 确保路径以 / 结尾，除非它是根目录
        target_dir_path = (
            local_file.split("Source", 1)[1] # 使用 split 第二个参数限制只分割一次
            .replace("\\", "/")
            .replace(os.path.basename(local_file), "")
        )
        # 确保 target_dir_path 以 / 结尾，如果它不是根目录 ""
        if target_dir_path and not target_dir_path.endswith('/'):
             target_dir_path += '/'

        print(f"准备上传 {local_file} 到目录 {target_dir_path}")
        # 传递本地文件完整路径和目标目录路径
        tasks.append(upload_file(local_file_path=local_file, target_path=target_dir_path))

    if tasks:
        print(f"开始处理 {len(tasks)} 个文件...")
        await asyncio.gather(*tasks)
        print("所有文件处理完毕。")
    else:
        print("在 ./Source 目录下未找到 en_us.json 文件。")


if __name__ == "__main__":
    # 不需要 aiofiles
    asyncio.run(main())
