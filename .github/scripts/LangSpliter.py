# -*- coding: utf-8 -*-
"""
LangSpliter 命令行工具

该脚本用于处理 FTB Quests 的 SNBT 语言文件，提供拆分和合并功能。
它既可以作为独立的命令行工具运行，也可以被其他 Python 脚本导入以使用其功能。

--- 使用方法 ---

1. 拆分 SNBT 文件为多个 JSON 文件:
   - 使用默认路径 (标准行为):
     python LangSpliter.py split
   - 指定自定义路径:
     python LangSpliter.py split --source-lang "path/to/en_us.snbt" --output-dir "path/to/output"
   - **(新功能)** 拆分时将单行列表展平 (不加数字后缀):
     python LangSpliter.py split --flatten-single-lines

2. 合并 JSON 文件为 SNBT 文件:
   - 使用默认路径:
     python LangSpliter.py merge
   - 指定自定义路径:
     python LangSpliter.py merge --json-dir "path/to/json_files" --output-snbt "path/to/zh_cn.snbt"
   - **(新功能)** 在合并时，将 custom_name/lore 更新回其原始的章节 SNBT 文件中:
     python LangSpliter.py merge --chapters-dir "path/to/chapters" --output-chapters-dir "path/to/modified_chapters"

要查看所有可用参数，请使用 -h 或 --help:
  python LangSpliter.py -h
  python LangSpliter.py split -h
  python LangSpliter.py merge -h
"""

import argparse
import json
import os
import re
from collections import OrderedDict

import ftb_snbt_lib as snbtlib
from ftb_snbt_lib.tag import Compound, List, String

# --- Author: Maxing ---

# --- 拆分逻辑配置 ---
CATEGORIES_TO_FILES = {
    "en_us_chapters.json": ["chapter_group."],
    "en_us_reward_tables.json": ["reward_table."],
}
OTHER_ENTRIES_FILE = "en_us_other_entries.json"

# --- 排序逻辑配置 ---
SORT_ORDER_CONFIG = {
    "chapter.": [".title", ".description"],
    "quest.": [".title", ".quest_subtitle", ".quest_desc"],
}


def unescape_string(s: str) -> str:
    """对从 SNBT 加载的字符串进行反转义处理。"""
    s = s.replace(r"\"", '"')
    s = s.replace(r"\\", "\\")
    return s


def escape_string_for_snbt(s: str) -> str:
    """在将字符串写入 SNBT 文件前，对其进行转义。"""
    s = s.replace("\\", "\\\\")
    s = s.replace('"', '\\"')
    return s


def split_and_process_all(
    source_lang_file,
    chapters_dir,
    chapter_groups_file,
    output_dir,
    flatten_single_lines: bool,
):
    """
    一个完整的处理流程，现在会将 chapter.* 条目分发到对应的章节文件中。
    新增 flatten_single_lines 参数用于控制单行列表的处理方式。
    """
    print(f"--- 1. 开始拆分和处理 {source_lang_file} ---")
    if flatten_single_lines:
        print("  -> 已启用【单行列表展平】模式。")
    os.makedirs(output_dir, exist_ok=True)

    # 1. 加载源语言文件
    try:
        with open(source_lang_file, "r", encoding="utf-8") as f:
            snbt_data = snbtlib.loads(f.read())

        lang_data = OrderedDict()
        for key, value in snbt_data.items():
            if isinstance(value, list):
                # 根据命令行参数选择处理逻辑
                if flatten_single_lines and len(value) == 1:
                    # 如果开启了展平功能，且列表只有一个元素，则不加数字后缀
                    processed_line = unescape_string(str(value[0]))
                    lang_data[key] = processed_line
                else:
                    # 默认行为：为所有行（或当展平功能关闭时）添加数字后缀
                    for i, line in enumerate(value, 1):
                        # 将数字格式化为两位，例如 1 -> 01, 10 -> 10
                        new_key = f"{key}{i:02d}"
                        processed_line = unescape_string(str(line))
                        lang_data[new_key] = processed_line
            elif isinstance(value, str):
                processed_value = unescape_string(value)
                lang_data[key] = processed_value
            else:
                lang_data[key] = value

        print(
            f"成功加载并处理了 {len(snbt_data)} 个原始SNBT条目，生成了 {len(lang_data)} 条扁平化语言条目。"
        )
    except Exception as e:
        print(f"错误: 加载或解析 {source_lang_file} 失败: {e}")
        return

    # 2. 预分类所有语言条目
    categorized_data = {filename: OrderedDict() for filename in CATEGORIES_TO_FILES}
    chapters_lang_data = OrderedDict()
    quests_data = OrderedDict()
    tasks_data = OrderedDict()
    rewards_data = OrderedDict()
    other_data = OrderedDict()

    for key, value in lang_data.items():
        assigned = False
        if key.startswith("chapter."):
            chapters_lang_data[key] = value
            assigned = True
        elif key.startswith("quest."):
            quests_data[key] = value
            assigned = True
        elif key.startswith("task."):
            tasks_data[key] = value
            assigned = True
        elif key.startswith("reward."):
            rewards_data[key] = value
            assigned = True
        else:
            for filename, prefixes in CATEGORIES_TO_FILES.items():
                for prefix in prefixes:
                    if key.startswith(prefix):
                        categorized_data[filename][key] = value
                        assigned = True
                        break
                if assigned:
                    break
        if not assigned:
            other_data[key] = value

    # 3. 写入固定的分类文件
    for filename, data in categorized_data.items():
        if data:
            output_path = os.path.join(output_dir, filename)
            with open(output_path, "w", encoding="utf-8") as f:
                json.dump(data, f, ensure_ascii=False, indent=4)
            print(f"  -> 成功导出 {len(data)} 条条目到: {output_path}")

    # 4. 写入其他条目文件
    if other_data:
        output_path = os.path.join(output_dir, OTHER_ENTRIES_FILE)
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(other_data, f, ensure_ascii=False, indent=4)
        print(f"  -> 成功导出 {len(other_data)} 条条目到: {output_path}")

    # 5. 处理章节文件，导出章节、任务、子任务和奖励的相关条目
    process_chapter_quests(
        chapters_dir,
        chapters_lang_data,
        quests_data,
        tasks_data,
        rewards_data,
        output_dir,
    )

    print("--- 拆分和处理完成 ---\n")


def sanitize_filename(name: str) -> str:
    """移除文件名中的非法字符。"""
    name = re.sub(r"&[0-9a-fklmnor]", "", name)
    return re.sub(r'[\\/*?:"<>|]', "", name).strip()


def create_sort_key(item, config, task_to_quest_map, reward_to_quest_map):
    """
    为字典项创建一个分层级的排序元组，以满足所有排序需求。

    排序元组结构: (is_chapter_key, quest_group_id, internal_type_priority, custom_priority, non_numeric_part, numeric_part)
    - is_chapter_key: 顶级排序依据。0表示章节级条目，1表示任务级条目。确保章节标题总在最前。
    - quest_group_id: 次级排序依据。对任务级条目，这是它们所属的 quest_id，用于将任务、子任务、奖励聚合。
    - internal_type_priority: 三级排序依据。在任务组内排序，0: quest, 1: task, 2: reward。
    - custom_priority: 对 chapter.* 和 quest.* 条目的可配置排序。
    - non_numeric_part & numeric_part: 用于实现数字的自然排序 (desc09, desc10)。
    """
    key, _ = item

    # 初始化默认值
    is_chapter_key = 1  # 默认为任务级条目
    quest_group_id = key  # 默认分组ID为键本身，用于未匹配情况
    internal_type_priority = 99  # 默认为一个较大的数
    custom_priority = 99
    key_prefix_for_config = ""

    # 1. 解析键，并填充排序元组的各个部分
    if key.startswith("chapter."):
        match = re.match(r"^chapter\.([0-9A-F]+)", key)
        if match:
            is_chapter_key = 0  # 这是章节级条目，优先级最高
            quest_group_id = match.group(1)
            internal_type_priority = 0
            if ".image." not in key:  # 将 image.hover 排序在后
                key_prefix_for_config = "chapter."
    elif key.startswith("quest."):
        match = re.match(r"^quest\.([0-9A-F]+)", key)
        if match:
            is_chapter_key = 1  # 这是任务级条目
            quest_group_id = match.group(1)  # 分组ID就是它自己的ID
            internal_type_priority = 0  # 在任务组内，quest本身排第一
            key_prefix_for_config = "quest."
    elif key.startswith("task."):
        match = re.match(r"^task\.([0-9A-F]+)", key)
        if match:
            task_id = match.group(1)
            is_chapter_key = 1
            quest_group_id = task_to_quest_map.get(
                task_id, task_id
            )  # 分组ID是其父任务的ID
            internal_type_priority = 1  # 在任务组内，task排第二
    elif key.startswith("tasks."):
        match = re.match(r"^tasks\.([0-9A-F]+)", key)
        if match:
            task_id = match.group(1)
            is_chapter_key = 1
            quest_group_id = task_to_quest_map.get(task_id, task_id)
            internal_type_priority = 1
    elif key.startswith("reward."):
        match = re.match(r"^reward\.([0-9A-F]+)", key)
        if match:
            reward_id = match.group(1)
            is_chapter_key = 1
            quest_group_id = reward_to_quest_map.get(
                reward_id, reward_id
            )  # 分组ID是其父任务的ID
            internal_type_priority = 2  # 在任务组内，reward排第三
    elif key.startswith("rewards."):
        match = re.match(r"^rewards\.([0-9A-F]+)", key)
        if match:
            reward_id = match.group(1)
            is_chapter_key = 1
            quest_group_id = reward_to_quest_map.get(reward_id, reward_id)
            internal_type_priority = 2

    # 2. 计算自定义优先级
    if key_prefix_for_config and key_prefix_for_config in config:
        suffix_order = config[key_prefix_for_config]
        custom_priority = len(suffix_order)
        base_id_prefix_match = re.match(r"^(?:chapter|quest)\.[0-9A-F]+\.", key)
        if base_id_prefix_match:
            key_suffix = key[len(base_id_prefix_match.group(0)) :]
            for i, ordered_suffix in enumerate(suffix_order):
                if ("." + key_suffix).startswith(ordered_suffix):
                    custom_priority = i
                    break

    # 3. 为自然排序准备
    id_match = re.match(
        r"^(?:chapter|quest|task|tasks|reward|rewards)\.[0-9A-F]+\.(.*)", key
    )
    key_suffix_for_natural_sort = id_match.group(1) if id_match else ""
    non_numeric_part = key_suffix_for_natural_sort
    numeric_part = 0
    suffix_match = re.match(r"^(.*?)(\d+)$", key_suffix_for_natural_sort)
    if suffix_match:
        non_numeric_part = suffix_match.group(1)
        numeric_part = int(suffix_match.group(2))

    # 返回最终的、能够正确表达层级关系的排序元组
    return (
        is_chapter_key,
        quest_group_id,
        internal_type_priority,
        custom_priority,
        non_numeric_part,
        numeric_part,
    )


def process_item_list_for_components(item_list, list_key_name, output_dict):
    """
    扫描项目列表（如 'tasks' 或 'rewards'），为每个项目执行深度递归搜索，
    以查找 'minecraft:custom_name' 和 'minecraft:lore'。
    此函数可处理 'components' 块在项目数据结构中的任意嵌套。
    """
    if not isinstance(item_list, list):
        return

    def find_translatables_recursively(data, current_item_id):
        """
        在数据结构中递归搜索，携带父项的 ID。
        """
        if isinstance(data, dict):
            # 检查当前字典是否包含 'components' 块
            if "components" in data and isinstance(data["components"], dict):
                components = data["components"]

                # 提取 custom_name
                if "minecraft:custom_name" in components:
                    name_val = components["minecraft:custom_name"]
                    try:
                        name_val = name_val.replace(r"\\", "\\")
                        name_val = name_val.replace(r"\"", '"')
                    except (json.JSONDecodeError, TypeError):
                        pass
                    lang_key = f"{list_key_name}.{current_item_id}.custom_name"
                    output_dict[lang_key] = name_val

                # 提取 lore
                if "minecraft:lore" in components:
                    lore_list = components["minecraft:lore"]
                    if isinstance(lore_list, list):
                        for i, lore_line in enumerate(lore_list, 1):
                            try:
                                lore_line = lore_line.replace(r"\\", "\\")
                                lore_line = lore_line.replace(r"\"", '"')
                            except (json.JSONDecodeError, TypeError):
                                pass
                            # 将数字格式化为两位，例如 1 -> 01, 10 -> 10
                            lang_key = f"{list_key_name}.{current_item_id}.lore{i:02d}"
                            output_dict[lang_key] = lore_line

            # 无论是否找到 'components'，都继续向更深层递归
            for value in data.values():
                find_translatables_recursively(value, current_item_id)

        elif isinstance(data, list):
            # 如果是列表，则对每个元素进行递归
            for element in data:
                find_translatables_recursively(element, current_item_id)

    # 遍历列表中的每一个顶层项目（如每个 task 或 reward）
    for item_dict in item_list:
        if not isinstance(item_dict, dict) or "id" not in item_dict:
            continue

        item_id = item_dict["id"]
        # 对当前项目启动递归搜索，并将此项目的 ID 传递下去
        find_translatables_recursively(item_dict, item_id)


def process_chapter_quests(
    chapters_dir, chapters_lang_data, quests_data, tasks_data, rewards_data, output_dir
):
    """
    根据章节文件，将章节、任务、子任务、奖励的相关语言条目导出到对应的JSON文件。
    """
    if not os.path.isdir(chapters_dir):
        return

    print("\n--- 开始处理章节文件以导出所有相关语言条目 ---")

    # 构建 task/reward 到 quest 的映射表
    task_to_quest_map = {}
    reward_to_quest_map = {}
    print("正在构建任务和奖励的映射关系...")
    for filename in os.listdir(chapters_dir):
        if not filename.endswith(".snbt"):
            continue
        try:
            with open(os.path.join(chapters_dir, filename), "r", encoding="utf-8") as f:
                chapter_data = snbtlib.loads(f.read())
            for quest in chapter_data.get("quests", []):
                quest_id = quest.get("id")
                if not quest_id:
                    continue
                for task in quest.get("tasks", []):
                    if task.get("id"):
                        task_to_quest_map[task["id"]] = quest_id
                for reward in quest.get("rewards", []):
                    if reward.get("id"):
                        reward_to_quest_map[reward["id"]] = quest_id
        except Exception as e:
            print(f"  -> 构建映射时警告：处理文件 {filename} 失败: {e}")
    print("映射关系构建完成。")

    for filename in os.listdir(chapters_dir):
        if not filename.endswith(".snbt"):
            continue
        chapter_path = os.path.join(chapters_dir, filename)

        try:
            with open(chapter_path, "r", encoding="utf-8") as f:
                chapter_data = snbtlib.loads(f.read())

            chapter_id = chapter_data.get("id")
            if not chapter_id:
                continue

            chapter_output_content = OrderedDict()

            # 收集与本章节ID匹配的 chapter.* 语言条目
            chapter_prefix = f"chapter.{chapter_id}"
            for key, value in chapters_lang_data.items():
                if key.startswith(chapter_prefix):
                    chapter_output_content[key] = value

            # 提取章节顶层的 images.hover
            if "images" in chapter_data and isinstance(chapter_data["images"], list):
                for i, image_data in enumerate(chapter_data["images"]):
                    if isinstance(image_data, dict) and "hover" in image_data:
                        hover_value = image_data["hover"]
                        if isinstance(hover_value, str):
                            key = f"chapter.{chapter_id}.image.{i}.hover"
                            chapter_output_content[key] = unescape_string(hover_value)
                        elif isinstance(hover_value, list):
                            for j, line in enumerate(hover_value, 1):
                                # 将数字格式化为两位，例如 1 -> 01, 10 -> 10
                                key = f"chapter.{chapter_id}.image.{i}.hover{j:02d}"
                                chapter_output_content[key] = unescape_string(str(line))

            # 收集本章节所有相关的任务和奖励语言条目
            for quest in chapter_data.get("quests", []):
                quest_id = quest.get("id")
                if not quest_id:
                    continue

                quest_prefix = f"quest.{quest_id}."
                for key, value in quests_data.items():
                    if key.startswith(quest_prefix):
                        chapter_output_content[key] = value

                # 从任务和奖励中提取基于组件的翻译
                process_item_list_for_components(
                    quest.get("tasks", []), "tasks", chapter_output_content
                )
                process_item_list_for_components(
                    quest.get("rewards", []), "rewards", chapter_output_content
                )

                for task in quest.get("tasks", []):
                    task_id = task.get("id")
                    if not task_id:
                        continue
                    task_prefix = f"task.{task_id}."
                    for key, value in tasks_data.items():
                        if key.startswith(task_prefix):
                            chapter_output_content[key] = value

                for reward in quest.get("rewards", []):
                    reward_id = reward.get("id")
                    if not reward_id:
                        continue
                    reward_prefix = f"reward.{reward_id}."
                    for key, value in rewards_data.items():
                        if key.startswith(reward_prefix):
                            chapter_output_content[key] = value
                    # 提取 reward.feedback_message
                    if "feedback_message" in reward:
                        feedback_value = reward["feedback_message"]
                        if isinstance(feedback_value, str):
                            key = f"reward.{reward_id}.feedback_message"
                            chapter_output_content[key] = unescape_string(
                                feedback_value
                            )
                        elif isinstance(feedback_value, list):
                            for j, line in enumerate(feedback_value, 1):
                                # 将数字格式化为两位，例如 1 -> 01, 10 -> 10
                                key = f"reward.{reward_id}.feedback_message{j:02d}"
                                chapter_output_content[key] = unescape_string(str(line))

            if not chapter_output_content:
                continue

            # 使用增强的排序逻辑对本章的所有条目进行排序
            sorted_items = sorted(
                chapter_output_content.items(),
                key=lambda item: create_sort_key(
                    item, SORT_ORDER_CONFIG, task_to_quest_map, reward_to_quest_map
                ),
            )
            chapter_output_content = OrderedDict(sorted_items)

            cleaned_filename = filename.removesuffix(".snbt").replace(" ", "_")
            output_filename = f"en_us_{cleaned_filename}.json"

            output_path = os.path.join(output_dir, output_filename)
            with open(output_path, "w", encoding="utf-8") as f:
                json.dump(chapter_output_content, f, ensure_ascii=False, indent=4)
            print(
                f"  -> 成功导出 {len(chapter_output_content)} 条已排序的语言条目到: {output_path}"
            )

        except Exception as e:
            print(f"  -> 处理文件 {filename} 时发生错误: {e}")


def update_chapter_files_with_components(
    component_data, input_chapters_dir, output_chapters_dir
):
    """
    将来自JSON的翻译（components, hover, feedback_message）更新回其原始的章节SNBT文件。
    从 input_chapters_dir 读取，并写入到 output_chapters_dir。
    """
    if not component_data:
        return
    if not os.path.isdir(input_chapters_dir):
        print(
            f"警告：未提供有效的章节目录 '{input_chapters_dir}'。跳过 SNBT 文件内嵌文本的更新。"
        )
        return

    print("\n--- 开始将内嵌文本更新到章节 SNBT 文件 ---")
    os.makedirs(output_chapters_dir, exist_ok=True)

    # 1. 解析所有需要回填的数据
    mods_by_id = {}
    feedback_mods_by_id = {}
    hover_mods_by_chapter_id = {}

    # 无需修改，(\d+) 和 (\d*) 可以正确匹配 01, 02 等
    lore_pattern = re.compile(r"^(?:tasks|rewards)\.([0-9A-F]+)\.lore(\d+)$")
    name_pattern = re.compile(r"^(?:tasks|rewards)\.([0-9A-F]+)\.custom_name$")
    feedback_pattern = re.compile(r"^reward\.([0-9A-F]+)\.feedback_message(\d*)$")
    hover_pattern = re.compile(r"^chapter\.([0-9A-F]+)\.image\.(\d+)\.hover(\d*)$")

    for key, value in component_data.items():
        # custom_name/lore
        name_match = name_pattern.match(key)
        if name_match:
            item_id = name_match.group(1)
            mods_by_id.setdefault(item_id, {})["name"] = value
            continue
        lore_match = lore_pattern.match(key)
        if lore_match:
            item_id, lore_index = lore_match.groups()
            mods_by_id.setdefault(item_id, {}).setdefault("lore", []).append(
                (int(lore_index), value)
            )
            continue

        # feedback_message
        feedback_match = feedback_pattern.match(key)
        if feedback_match:
            item_id, num = feedback_match.groups()
            feedback_mods_by_id.setdefault(item_id, []).append(
                (int(num) if num else 0, value)
            )
            continue

        # hover
        hover_match = hover_pattern.match(key)
        if hover_match:
            chapter_id, image_index, num = hover_match.groups()
            hover_mods_by_chapter_id.setdefault(chapter_id, {}).setdefault(
                int(image_index), []
            ).append((int(num) if num else 0, value))

    # 对多行文本进行排序
    for item_id in mods_by_id:
        if "lore" in mods_by_id[item_id]:
            mods_by_id[item_id]["lore"].sort(key=lambda x: x[0])
            mods_by_id[item_id]["lore"] = [v for _, v in mods_by_id[item_id]["lore"]]
    for item_id in feedback_mods_by_id:
        feedback_mods_by_id[item_id].sort(key=lambda x: x[0])
        feedback_mods_by_id[item_id] = [v for _, v in feedback_mods_by_id[item_id]]
    for chapter_id in hover_mods_by_chapter_id:
        for image_index in hover_mods_by_chapter_id[chapter_id]:
            hover_mods_by_chapter_id[chapter_id][image_index].sort(key=lambda x: x[0])
            hover_mods_by_chapter_id[chapter_id][image_index] = [
                v for _, v in hover_mods_by_chapter_id[chapter_id][image_index]
            ]

    # 2. 遍历章节文件，应用修改
    modified_files_count = 0
    updated_ids = set()

    for filename in os.listdir(input_chapters_dir):
        if not filename.endswith(".snbt"):
            continue

        input_file_path = os.path.join(input_chapters_dir, filename)
        try:
            with open(input_file_path, "r", encoding="utf-8") as f:
                snbt_data = snbtlib.loads(f.read())

            file_was_modified = [False]
            chapter_id = snbt_data.get("id")

            # 更新 hover
            if chapter_id in hover_mods_by_chapter_id:
                images_list = snbt_data.get("images", List())
                for img_idx, lines in hover_mods_by_chapter_id[chapter_id].items():
                    if 0 <= img_idx < len(images_list):
                        original_key = f"chapter.{chapter_id}.image.{img_idx}.hover"
                        is_multiline = any(
                            k.startswith(original_key + "01")
                            for k in component_data.keys()
                        )

                        if is_multiline or len(lines) > 1:
                            # 将 list[str] 转换为 List[String]
                            images_list[img_idx]["hover"] = List(
                                [String(line) for line in lines]
                            )
                        else:
                            # 将 str 转换为 String
                            images_list[img_idx]["hover"] = String(lines[0])
                        file_was_modified[0] = True

            def find_and_update_components_recursively(data, item_id, comp_mods):
                if item_id not in comp_mods:
                    return
                modifications = comp_mods[item_id]

                if isinstance(data, dict):
                    if "components" in data:
                        if "name" in modifications:
                            # 将 str 转换为 String，无需手动转义
                            data["components"][String("minecraft:custom_name")] = (
                                String(modifications["name"])
                            )
                            file_was_modified[0] = True
                        if "lore" in modifications:
                            # 将 list[str] 转换为 List[String]，无需手动转义
                            data["components"][String("minecraft:lore")] = List(
                                [String(line) for line in modifications["lore"]]
                            )
                            file_was_modified[0] = True
                        updated_ids.add(item_id)
                        return

                    for v in data.values():
                        find_and_update_components_recursively(v, item_id, comp_mods)
                elif isinstance(data, list):
                    for elem in data:
                        find_and_update_components_recursively(elem, item_id, comp_mods)

            def traverse_and_apply(data, comp_mods, feed_mods):
                if isinstance(data, dict):
                    item_id = data.get("id")
                    if item_id:
                        # 更新 feedback_message
                        if item_id in feed_mods:
                            lines = feed_mods[item_id]
                            original_key = f"reward.{item_id}.feedback_message"
                            is_multiline = any(
                                k.startswith(original_key + "01")
                                for k in component_data.keys()
                            )
                            if is_multiline or len(lines) > 1:
                                data["feedback_message"] = List(
                                    [String(line) for line in lines]
                                )
                            else:
                                data["feedback_message"] = String(lines[0])
                            file_was_modified[0] = True
                            updated_ids.add(item_id)

                        # 更新 components (在子项中递归搜索)
                        if item_id in comp_mods:
                            find_and_update_components_recursively(
                                data, item_id, comp_mods
                            )

                    # 无论如何，继续遍历整个结构
                    for value in data.values():
                        traverse_and_apply(value, comp_mods, feed_mods)
                elif isinstance(data, list):
                    for item in data:
                        traverse_and_apply(item, comp_mods, feed_mods)

            traverse_and_apply(snbt_data, mods_by_id, feedback_mods_by_id)

            if file_was_modified[0]:
                snbt_output_string = snbtlib.dumps(snbt_data)
                output_file_path = os.path.join(output_chapters_dir, filename)
                with open(output_file_path, "w", encoding="utf-8") as f:
                    f.write(snbt_output_string)
                print(f"  -> 已将更新后的 {filename} 写入到: {output_file_path}")
                modified_files_count += 1
        except Exception as e:
            import traceback

            print(f"  -> 更新文件 {filename} 时出错: {e}")
            traceback.print_exc()

    print(f"更新完成。共修改了 {modified_files_count} 个文件。")
    all_updated_ids = updated_ids.union(set(feedback_mods_by_id.keys()))
    all_ids_to_update = set(mods_by_id.keys()).union(set(feedback_mods_by_id.keys()))
    remaining_ids = all_ids_to_update - all_updated_ids
    if remaining_ids:
        print(
            f"警告：在任何章节文件中都找不到以下 {len(remaining_ids)} 个物品ID：{', '.join(remaining_ids)}"
        )


def merge_all_to_snbt(
    json_dir: str, output_snbt_file: str, chapters_dir: str, output_chapters_dir: str
):
    """
    合并所有JSON文件为单个SNBT文件。
    如果提供了chapters_dir，则会将内嵌文本更新回原始章节文件，
    并从最终的语言文件中排除这些条目。
    """
    print(f"--- 2. 开始从 {json_dir} 合并所有 JSON 文件到 SNBT ---")
    if not os.path.isdir(json_dir):
        print(f"错误：JSON目录 '{json_dir}' 不存在。无法合并。")
        return

    combined_data = OrderedDict()
    json_files = sorted([f for f in os.listdir(json_dir) if f.endswith(".json")])
    for filename in json_files:
        filepath = os.path.join(json_dir, filename)
        try:
            with open(filepath, "r", encoding="utf-8-sig") as f:
                data = json.load(f, object_pairs_hook=OrderedDict)
                combined_data.update(data)
                print(f"  -> 已加载 {len(data)} 条条目从: {filename}")
        except Exception as e:
            print(f"  -> 警告：读取或解析 {filepath} 失败: {e}")

    if not combined_data:
        print("错误：没有加载到任何数据，无法生成 SNBT 文件。")
        return

    # 分离内嵌键和标准语言键
    embedded_data = OrderedDict()
    standard_data = OrderedDict()
    # 这个正则表达式匹配所有需要被回填到章节文件而不是写入语言文件的键
    # 无需修改，(\d+) 和 (\d*) 可以正确匹配 01, 02 等
    embedded_key_pattern = re.compile(
        r"^(tasks|rewards)\.[0-9A-F]+\.(custom_name|lore\d+)|"
        r"chapter\.[0-9A-F]+\.image\.\d+\.hover\d*|"
        r"reward\.[0-9A-F]+\.feedback_message\d*$"
    )
    for key, value in combined_data.items():
        if chapters_dir and embedded_key_pattern.match(key):
            embedded_data[key] = value
        else:
            standard_data[key] = value

    # 更新章节 SNBT 文件（如果需要）
    if chapters_dir and embedded_data:
        update_chapter_files_with_components(
            embedded_data, chapters_dir, output_chapters_dir
        )

    print("\n开始重构多行文本条目...")

    # 无需修改，(\d+) 可以正确匹配 01, 02 等
    multi_line_pattern = re.compile(r"^(.*?)(\d+)$")
    temp_multiline = OrderedDict()
    reconstructed_data = OrderedDict()

    # 只处理标准数据
    for key, value in standard_data.items():
        match = multi_line_pattern.match(key)
        if match:
            base_key = match.group(1)
            line_number = int(match.group(2))
            if base_key not in temp_multiline:
                temp_multiline[base_key] = []
            temp_multiline[base_key].append((line_number, value))
        else:
            reconstructed_data[key] = value

    for base_key, lines_with_nums in temp_multiline.items():
        lines_with_nums.sort(key=lambda x: x[0])
        sorted_lines = [line_text for _, line_text in lines_with_nums]
        reconstructed_data[base_key] = sorted_lines

    print(
        f"重构完成。原始 {len(standard_data)} 条标准条目被合并为 {len(reconstructed_data)} 条 SNBT 条目。"
    )

    if not reconstructed_data:
        print("没有需要写入 SNBT 语言文件的标准条目。")
        print("--- 合并完成 ---")
        return

    sorted_items = sorted(reconstructed_data.items())
    print(f"\n总共合并了 {len(sorted_items)} 条最终条目，并已按键名排序。")

    snbt_ready_data = Compound()  # 使用 Compound 而不是 dict
    for key, value in sorted_items:
        if isinstance(value, list):
            # 将 list[str] 转换为 List[String]
            # 无需手动转义
            snbt_ready_data[key] = List([String(str(line)) for line in value])
        elif isinstance(value, str):
            # 将 str 转换为 String
            # 无需手动转义
            snbt_ready_data[key] = String(value)
        else:
            snbt_ready_data[key] = String(str(value))

    try:
        # 现在 snbt_ready_data 是一个 Compound 对象，dumps 可以正确处理
        snbt_output_string = snbtlib.dumps(snbt_ready_data)

        if not snbt_output_string.strip() or snbt_output_string.strip() == "{}":
            print(
                "警告：snbtlib.dumps 返回了空或空的 Compound 字符串。检查 reconstructed_data 是否为空。"
            )
            if not reconstructed_data:
                return

        os.makedirs(os.path.dirname(output_snbt_file), exist_ok=True)
        with open(output_snbt_file, "w", encoding="utf-8") as f:
            f.write(snbt_output_string)
        print(f"成功将所有条目合并并写入到: {output_snbt_file}")
    except Exception as e:
        import traceback

        print(f"错误：生成或写入 SNBT 文件失败: {e}")
        traceback.print_exc()

    print("--- 合并完成 ---")


if __name__ == "__main__":

    def main_cli():
        """主函数，用于解析命令行参数并执行相应任务。"""
        # --- 默认文件路径配置 ---
        DEFAULT_SOURCE_LANG_FILE = "lang/en_us.snbt"
        DEFAULT_CHAPTER_GROUPS_FILE = "chapter_groups.snbt"
        DEFAULT_CHAPTERS_DIR = "chapters"
        DEFAULT_JSON_OUTPUT_DIR = "output_json"
        DEFAULT_MERGED_SNBT_FILE = "lang/zh_cn.snbt"
        DEFAULT_MODIFIED_CHAPTERS_DIR = "modified_chapters"

        parser = argparse.ArgumentParser(
            description="FTB Quests 语言文件拆分与合并工具。"
        )
        subparsers = parser.add_subparsers(
            dest="task",
            required=True,
            help="选择要执行的任务: split (拆分), merge (合并)",
        )

        # --- 拆分任务的参数 ---
        parser_split = subparsers.add_parser(
            "split", help="将源 SNBT 语言文件拆分为多个 JSON 文件。"
        )
        parser_split.add_argument(
            "--source-lang",
            default=DEFAULT_SOURCE_LANG_FILE,
            help=f"指定源语言 SNBT 文件的路径。默认: {DEFAULT_SOURCE_LANG_FILE}",
        )
        parser_split.add_argument(
            "--chapters-dir",
            default=DEFAULT_CHAPTERS_DIR,
            help=f"指定包含章节定义的 SNBT 文件的目录。默认: {DEFAULT_CHAPTERS_DIR}",
        )
        parser_split.add_argument(
            "--chapter-groups",
            default=DEFAULT_CHAPTER_GROUPS_FILE,
            help=f"指定章节组定义文件的路径。默认: {DEFAULT_CHAPTER_GROUPS_FILE}",
        )
        parser_split.add_argument(
            "--output-dir",
            default=DEFAULT_JSON_OUTPUT_DIR,
            help=f"指定输出 JSON 文件的目录。默认: {DEFAULT_JSON_OUTPUT_DIR}",
        )
        parser_split.add_argument(
            "--flatten-single-lines",
            action="store_true",
            help="当 SNBT 列表只有一个元素时，将其展平为不带数字后缀的键值对。",
        )

        # --- 合并任务的参数 (标准逻辑) ---
        parser_merge = subparsers.add_parser(
            "merge", help="将多个 JSON 文件合并为一个 SNBT 语言文件。"
        )
        parser_merge.add_argument(
            "--json-dir",
            default=DEFAULT_JSON_OUTPUT_DIR,
            help=f"指定包含 JSON 文件的目录。默认: {DEFAULT_JSON_OUTPUT_DIR}",
        )
        parser_merge.add_argument(
            "--output-snbt",
            default=DEFAULT_MERGED_SNBT_FILE,
            help=f"指定最终输出的 SNBT 文件的路径。默认: {DEFAULT_MERGED_SNBT_FILE}",
        )
        parser_merge.add_argument(
            "--chapters-dir",
            default=DEFAULT_CHAPTERS_DIR,
            help=f"指定用于更新的输入章节 SNBT 目录。如果提供此项，将启用 component 更新功能。默认: {DEFAULT_CHAPTERS_DIR}",
        )
        parser_merge.add_argument(
            "--output-chapters-dir",
            default=DEFAULT_MODIFIED_CHAPTERS_DIR,
            help=f"指定更新后的章节 SNBT 文件的输出目录。默认: {DEFAULT_MODIFIED_CHAPTERS_DIR}",
        )

        args = parser.parse_args()

        # --- 根据任务分派 ---
        if args.task == "split":
            split_and_process_all(
                source_lang_file=args.source_lang,
                chapters_dir=args.chapters_dir,
                chapter_groups_file=args.chapter_groups,
                output_dir=args.output_dir,
                flatten_single_lines=args.flatten_single_lines,
            )
        elif args.task == "merge":
            merge_all_to_snbt(
                json_dir=args.json_dir,
                output_snbt_file=args.output_snbt,
                chapters_dir=args.chapters_dir,
                output_chapters_dir=args.output_chapters_dir,
            )

    main_cli()
