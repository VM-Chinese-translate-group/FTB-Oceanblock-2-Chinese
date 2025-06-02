import os
import zipfile
from pathlib import Path

def should_include_file(file_path):
    # 排除指定的文件
    if file_path.endswith('modpackinfo.json'):
        return False
    if file_path.endswith('vmtranslationupdate.toml'):
        return False
    if file_path.endswith('CNPack.zip'):
        return False
    if file_path.endswith('LICENSE'):
        return False
        
    # 排除mods目录
    if '\\mods\\' in file_path:
        return False
        
    # 仅保留kubejs/assets/ftb/lang目录,排除其他assets目录
    if '\\kubejs\\assets\\' in file_path:
        if '\\kubejs\\assets\\ftb\\lang\\' in file_path:
            return True
        return False
        
    return True

def zip_cnpack():
    # 获取脚本所在目录
    script_dir = Path(__file__).parent
    
    # CNPack目录路径
    cnpack_dir = script_dir / 'CNPack'
    
    # 输出zip文件路径 
    output_zip = cnpack_dir / 'CNPack.zip'
    
    # 创建zip文件
    with zipfile.ZipFile(output_zip, 'w', zipfile.ZIP_DEFLATED) as zf:
        # 遍历CNPack目录
        for root, dirs, files in os.walk(cnpack_dir):
            for file in files:
                file_path = os.path.join(root, file)
                
                # 检查是否需要包含该文件
                if should_include_file(file_path):
                    # 计算在zip中的相对路径
                    arcname = os.path.relpath(file_path, script_dir)
                    # 添加到zip
                    zf.write(file_path, arcname)
                    
    print(f'CNPack.zip created successfully!')

if __name__ == '__main__':
    zip_cnpack()