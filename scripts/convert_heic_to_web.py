"""Convert HEIC/HEIF to web-ready JPG for artempiremj.com.

Usage:
    python convert_heic_to_web.py <src_file_or_dir> <dest_path_or_name>

If src is a file: writes one JPG at dest (resized longest edge 1600px, quality 82).
"""
import sys, os
from pathlib import Path

import pillow_heif
from PIL import Image

pillow_heif.register_heif_opener()

MAX_EDGE = 1600
QUALITY = 82


def convert(src: Path, dest: Path) -> None:
    img = Image.open(src)
    img = img.convert("RGB")
    w, h = img.size
    scale = MAX_EDGE / max(w, h)
    if scale < 1:
        img = img.resize((int(w * scale), int(h * scale)), Image.LANCZOS)
    dest.parent.mkdir(parents=True, exist_ok=True)
    img.save(dest, "JPEG", quality=QUALITY, optimize=True, progressive=True)
    size_kb = dest.stat().st_size // 1024
    print(f"[OK] {src.name} -> {dest.name}  ({img.size[0]}x{img.size[1]}, {size_kb}KB)")


def main():
    if len(sys.argv) != 3:
        print(__doc__)
        sys.exit(1)
    src = Path(sys.argv[1])
    dest = Path(sys.argv[2])
    if not src.exists():
        print(f"[ERR] source not found: {src}")
        sys.exit(2)
    convert(src, dest)


if __name__ == "__main__":
    main()
