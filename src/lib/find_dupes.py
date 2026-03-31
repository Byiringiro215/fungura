import re

def find_intra_block_duplicates(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the translation blocks
    blocks = re.split(r'translation:\s*\{', content)
    # Block 0 is anything before the first translation: {
    # Block 1 is the 'en' content (mostly)
    # Block 2 is the 'rw' content (mostly)
    
    for i, block in enumerate(blocks[1:]):
        lang = "en" if i == 0 else "rw"
        print(f"--- Checking {lang} ---")
        # Find everything until the next block or end of file
        # This is rough but good enough for finding keys
        lines = block.split('\n')
        seen = {}
        for line_num, line in enumerate(lines):
            match = re.search(r'\"([a-z0-9_]+)\":', line)
            if match:
                key = match.group(1)
                if key in seen:
                    print(f"DUPE in {lang}: '{key}' on lines {seen[key]} and {line_num + 1}")
                else:
                    seen[key] = line_num + 1

if __name__ == "__main__":
    find_intra_block_duplicates(r'd:\PROJECTS\Y2\fungura\web\src\lib\i18n.ts')
