#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import argparse
import difflib
import hashlib
import os
import pathlib
import shutil
import tarfile
import tempfile
import zipfile
from datetime import datetime
from html import escape
import string

TEMPLATE_PATH = os.path.join(os.path.dirname(__file__), "comparison_report_template.html")

def is_text_file(file_path):
    """判断文件是否为文本文件"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            f.read(1024)
        return True
    except (UnicodeDecodeError, IOError, PermissionError):
        return False


def generate_contextual_diff(path1, path2, context_lines=2):
    """为文本文件生成包含统计信息和上下文差异的HTML"""
    try:
        with open(path1, 'r', encoding='utf-8') as f1, open(path2, 'r', encoding='utf-8') as f2:
            lines1 = f1.readlines()
            lines2 = f2.readlines()
    except Exception as e:
        return {"stats": {"added": 0, "removed": 0}, "html": f"<p>无法读取文件进行比较: {e}</p>"}

    # 1. 计算统计信息
    added_lines, removed_lines = 0, 0
    matcher = difflib.SequenceMatcher(None, lines1, lines2)
    for tag, i1, i2, j1, j2 in matcher.get_opcodes():
        if tag == 'replace':
            removed_lines += (i2 - i1)
            added_lines += (j2 - j1)
        elif tag == 'delete':
            removed_lines += (i2 - i1)
        elif tag == 'insert':
            added_lines += (j2 - j1)

    # 2. 生成上下文差异HTML
    diff_lines = difflib.unified_diff(lines1, lines2, n=context_lines, lineterm='')

    html_rows = []
    # 跳过 unified_diff 的文件头
    try:
        next(diff_lines)
        next(diff_lines)
    except StopIteration:
        pass  # 如果文件完全相同，diff为空

    line_num1, line_num2 = 0, 0
    for line in diff_lines:
        line = escape(line)
        if line.startswith('@@'):
            # 解析行号信息
            parts = line.split(' ')
            line_num1_str = parts[1].split(',')[0]
            line_num2_str = parts[2].split(',')[0]
            line_num1 = abs(int(line_num1_str))
            line_num2 = abs(int(line_num2_str))

            html_rows.append(f'<tr class="diff-hunk"><td colspan="4">{line}</td></tr>')
            # 补上上下文的第一行行号
            if len(parts) > 3 and not (parts[1].endswith(",0") or parts[2].endswith(",0")):
                html_rows.append(
                    f'<tr><td class="diff-line-num">{line_num1 - 1}</td><td class="diff-line-num">{line_num2 - 1}</td><td class="diff-line-op"></td><td class="diff-line-code">{escape(lines1[line_num1 - 2]) if line_num1 > 1 else ""}</td></tr>')

        elif line.startswith('+'):
            html_rows.append(
                f'<tr class="diff-add"><td class="diff-line-num"></td><td class="diff-line-num">{line_num2}</td><td class="diff-line-op">+</td><td class="diff-line-code">{line[1:]}</td></tr>')
            line_num2 += 1
        elif line.startswith('-'):
            html_rows.append(
                f'<tr class="diff-sub"><td class="diff-line-num">{line_num1}</td><td class="diff-line-num"></td><td class="diff-line-op">-</td><td class="diff-line-code">{line[1:]}</td></tr>')
            line_num1 += 1
        else:  # 上下文行
            html_rows.append(
                f'<tr><td class="diff-line-num">{line_num1}</td><td class="diff-line-num">{line_num2}</td><td class="diff-line-op"> </td><td class="diff-line-code">{line[1:]}</td></tr>')
            line_num1 += 1
            line_num2 += 1

    diff_table = f'<table class="context-diff-table">{"".join(html_rows)}</table>'

    return {
        "stats": {"added": added_lines, "removed": removed_lines},
        "html": diff_table
    }


def extract_archive(archive_path, dest_dir):
    """解压压缩包"""
    path = pathlib.Path(archive_path)
    print(f"正在解压 {path.name}...")
    try:
        if path.name.endswith('.zip'):
            with zipfile.ZipFile(archive_path, 'r') as z:
                z.extractall(dest_dir)
        elif path.name.endswith(('.tar.gz', '.tgz', '.tar')):
            with tarfile.open(archive_path, 'r:*') as t:
                t.extractall(dest_dir)
        else:
            raise ValueError(f"不支持的压缩格式: {path.name}")
    except Exception as e:
        print(f"错误: 解压 {path.name} 失败. {e}")
        return False
    return True


def compare_directories(dir1, dir2):
    """比较目录并为文本文件生成上下文差异"""
    print("正在比较文件内容...")

    files1 = {p.relative_to(dir1) for p in pathlib.Path(dir1).rglob('*') if p.is_file()}
    files2 = {p.relative_to(dir2) for p in pathlib.Path(dir2).rglob('*') if p.is_file()}

    common_files = files1.intersection(files2)
    modified_files = []
    identical_files = set()

    for rel_path in common_files:
        path1 = pathlib.Path(dir1) / rel_path
        path2 = pathlib.Path(dir2) / rel_path

        # 使用哈希值进行精确比较
        if path1.stat().st_size == path2.stat().st_size and hashlib.sha256(
                path1.read_bytes()).hexdigest() == hashlib.sha256(path2.read_bytes()).hexdigest():
            identical_files.add(rel_path)
        else:
            is_text = is_text_file(path1) and is_text_file(path2)
            diff_data = None
            if is_text:
                print(f"  - 正在为 {rel_path} 生成 diff...")
                diff_data = generate_contextual_diff(path1, path2)

            modified_files.append({
                "path": rel_path, "is_binary": not is_text, "diff_data": diff_data
            })

    print("比较完成。")
    modified_files.sort(key=lambda x: x['path'])
    return {
        "added": sorted(list(files2 - files1)),
        "removed": sorted(list(files1 - files2)),
        "modified": modified_files,
        "identical": sorted(list(identical_files)),
    }


def generate_html_report(results, archive1_path, archive2_path, output_path):
    """生成最终的 HTML 报告（从外部模板文件读取并填充数据）"""
    print(f"正在生成报告到 {output_path}...")

    def create_simple_file_list_html(files):
        if not files:
            return ""
        items = "".join(f'<li>{escape(f.as_posix())}</li>' for f in files)
        return f'<ul class="file-list">{items}</ul>'

    def create_modified_files_html(files):
        if not files:
            return ""
        details_items = []
        for file_info in files:
            path_str = escape(file_info['path'].as_posix())

            if file_info['is_binary']:
                summary_extra = ''
                content_html = '<div class="diff-summary-bin">二进制文件，内容已修改。</div>'
            else:
                stats = file_info['diff_data']['stats']
                add_stat = f'<span class="diff-stat-add">+{stats["added"]}</span>' if stats["added"] > 0 else ''
                del_stat = f'<span class="diff-stat-del">-{stats["removed"]}</span>' if stats["removed"] > 0 else ''
                summary_extra = f'<div class="diff-stats">{add_stat} {del_stat}</div>'
                content_html = f'<div class="diff-container">{file_info["diff_data"]["html"]}</div>'

            details_items.append(f"""
            <details>
                <summary><span>{path_str}</span>{summary_extra}</summary>
                {content_html}
            </details>
            """)
        return "".join(details_items)

    # 区块标题与数据键映射
    key_map = {
        "新增文件": "added",
        "删除文件": "removed",
        "修改文件": "modified",
        "未变文件": "identical"
    }

    sections = {
        "新增文件": create_simple_file_list_html(results['added']),
        "删除文件": create_simple_file_list_html(results['removed']),
        "修改文件": create_modified_files_html(results['modified']),
        "未变文件": create_simple_file_list_html(results['identical'])
    }

    details_html = ""
    for title, content in sections.items():
        data_key = key_map[title]
        count = len(results[data_key])

        if count > 0:
            if title == "修改文件":
                # 修改文件每个文件本身就是一个 details，不再额外包一层
                details_html += f'<div>{content}</div>'
            else:
                details_html += f"""
                <details>
                    <summary><span>{title} ({count})</span></summary>
                    <div class="file-list-wrapper">{content}</div>
                </details>
                """

    # 读取外部 HTML 模板
    try:
        with open(TEMPLATE_PATH, 'r', encoding='utf-8') as tf:
            template_str = tf.read()
    except FileNotFoundError:
        print(f"错误: 找不到模板文件 {TEMPLATE_PATH}，请确认模板文件已放在脚本同目录。")
        return

    # 使用 string.Template 填充
    tpl = string.Template(template_str)
    html_content = tpl.substitute(
        archive1_name=escape(os.path.basename(archive1_path)),
        archive2_name=escape(os.path.basename(archive2_path)),
        report_time=datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        added_count=len(results['added']),
        removed_count=len(results['removed']),
        modified_count=len(results['modified']),
        identical_count=len(results['identical']),
        details_html=details_html
    )

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html_content)

    print("报告生成成功！")


def main():
    parser = argparse.ArgumentParser(
        description="比较两个压缩包内容，并生成一个带上下文差异和统计信息的高级HTML报告。",
        formatter_class=argparse.RawTextHelpFormatter
    )
    parser.add_argument("archive1", help="第一个压缩包（旧版本）的路径。")
    parser.add_argument("archive2", help="第二个压缩包（新版本）的路径。")
    parser.add_argument("-o", "--output", default="comparison_report.html", help="输出HTML报告的文件名。")
    args = parser.parse_args()

    for path in [args.archive1, args.archive2]:
        if not os.path.exists(path):
            print(f"错误: 文件不存在 {path}");
            return

    with tempfile.TemporaryDirectory() as td1, tempfile.TemporaryDirectory() as td2:
        if not extract_archive(args.archive1, td1) or not extract_archive(args.archive2, td2): return

        results = compare_directories(td1, td2)
        generate_html_report(results, args.archive1, args.archive2, args.output)
        print(f"\n报告已保存到: {os.path.abspath(args.output)}")

if __name__ == "__main__":
    main()