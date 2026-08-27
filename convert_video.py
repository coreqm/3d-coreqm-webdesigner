"""
Apple Tarzı WebP Kare Çıkarıcı (Image Sequence Converter)
Kullanım:
    python convert_video.py
    veya
    python convert_video.py benim_videom.mp4
"""

import os
import sys
import subprocess
import imageio_ffmpeg

def convert_video_to_webp(video_file="video.mp4", output_dir="frames", fps=24, quality=80):
    if not os.path.exists(video_file):
        print(f"Hata: '{video_file}' bulunamadı!")
        return

    os.makedirs(output_dir, exist_ok=True)
    ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()

    print(f"'{video_file}' dosyası {fps} FPS WebP karelerine ayrılıyor...")

    output_pattern = os.path.join(output_dir, "frame_%04d.webp")

    cmd = [
        ffmpeg_exe,
        "-y",
        "-i", video_file,
        "-vf", f"fps={fps},scale=1280:-1",
        "-c:v", "libwebp",
        "-quality", str(quality),
        output_pattern
    ]

    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode == 0:
        frames = [f for f in os.listdir(output_dir) if f.endswith(".webp")]
        total_size_mb = sum(os.path.getsize(os.path.join(output_dir, f)) for f in frames) / (1024 * 1024)
        print(f"BAŞARILI! Toplam {len(frames)} WebP karesi '{output_dir}/' klasörüne kaydedildi.")
        print(f"Toplam Boyut: {total_size_mb:.2f} MB")
    else:
        print("Dönüştürme Hatası:", res.stderr)

if __name__ == "__main__":
    v_file = sys.argv[1] if len(sys.argv) > 1 else "video.mp4"
    convert_video_to_webp(v_file)
