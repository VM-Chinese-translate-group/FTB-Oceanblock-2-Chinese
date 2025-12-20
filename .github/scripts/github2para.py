import asyncio
import json
import os
from pprint import pprint

import paratranz_client
from pydantic import ValidationError

from LangSpliter import split_and_process_all

configuration = paratranz_client.Configuration(host="https://paratranz.cn/api")
configuration.api_key["Token"] = os.environ["API_TOKEN"]


async def upload_file(path, file):
    async with paratranz_client.ApiClient(configuration) as api_client:
        api_instance = paratranz_client.FilesApi(api_client)
        project_id = int(os.environ["PROJECT_ID"])
        files_response = await api_instance.get_files(project_id)
        try:
            # 第一次创建文件
            api_response = await api_instance.create_file(
                project_id, file=file, path=path
            )
            pprint(api_response)
        except ValidationError as error:
            print(f"文件上传成功{path}{os.path.basename(file)}")
        except Exception as e:
            try:
                # 尝试解析错误信息以更新文件
                filePath: str = json.loads(e.__dict__.get("body"))["message"].split(
                    " "
                )[1]
                for fileName in files_response:
                    if fileName.name == filePath:
                        await api_instance.update_file(
                            project_id, file_id=fileName.id, file=file
                        )
                        print(f"文件已更新！文件路径为：{fileName.name}")
            except (json.JSONDecodeError, KeyError, IndexError):
                # 如果错误信息不是预期的格式，打印原始错误
                print(f"上传文件 {file} 时发生未知错误: {e}")


def get_filelist(dir):
    filelist = []
    for root, _, files in os.walk(dir):
        for file in files:
            if "en_us" in file and file.endswith(".json"):
                filelist.append(os.path.join(root, file))
    return filelist


def handle_ftb_quests_snbt():
    """
    检查是否存在 FTB Quests 的 en_us.snbt 文件。
    如果存在，则使用 LangSpliter 将其拆分为多个 JSON 文件，以便上传。
    """
    snbt_file = "Source/config/ftbquests/quests/lang/en_us.snbt"
    chapters_dir = "Source/config/ftbquests/quests/chapters"
    chapter_groups_file = "Source/config/ftbquests/quests/chapter_groups.snbt"
    # 定义拆分后的JSON文件输出目录，与para2github.py的逻辑保持一致
    output_json_dir = "Source/kubejs/assets/quests/lang"

    if os.path.exists(snbt_file):
        print(f"检测到 SNBT 文件: {snbt_file}，将进行自动拆分...")

        # 确保输出目录存在
        os.makedirs(output_json_dir, exist_ok=True)

        # 调用 LangSpliter 的拆分函数
        # flatten_single_lines=False 是为了让多行文本在Paratranz中成为多个独立的词条，便于翻译
        split_and_process_all(
            source_lang_file=snbt_file,
            chapters_dir=chapters_dir,
            chapter_groups_file=chapter_groups_file,
            output_dir=output_json_dir,
            flatten_single_lines=False,
        )
        print("SNBT 文件已成功拆分为 JSON，准备上传。")
    else:
        print("未检测到 FTB Quests 的 en_us.snbt 文件，跳过拆分步骤。")


async def main():
    handle_ftb_quests_snbt()

    files = get_filelist("./Source")
    tasks = []

    if not files:
        print("在 'Source' 目录中未找到任何 'en_us.json' 文件。请检查文件是否存在。")
        return

    for file in files:
        # 使用 os.path.relpath 获取相对于 'Source' 目录的正确路径
        path = os.path.relpath(os.path.dirname(file), "./Source")

        # 如果文件直接位于 Source 目录下，relpath 会返回 "."，将其转换为空路径
        if path == ".":
            path = ""

        # 统一路径分隔符为 '/'
        path = path.replace("\\", "/")

        # 如果路径非空（不是根目录），确保它以 '/' 结尾
        if path:
            path += "/"

        print(f"准备上传 {file} 到 Paratranz 路径: '{path}'")
        tasks.append(upload_file(path=path, file=file))

    await asyncio.gather(*tasks)


if __name__ == "__main__":
    asyncio.run(main())
