# Website/public/videos

Self-hosted tanıtım video dosyalarının yeri.

## Beklenen dosyalar (FFmpeg ile üretilecek)

| Dosya | Codec | Hedef boyut | Notlar |
|---|---|---|---|
| `focussan-tanitim.mp4` | H.264 720p | 30-40 MB | Safari / iOS uyumlu, fallback |
| `focussan-tanitim.webm` | VP9 720p | 25-35 MB | Chrome / Firefox tarafında daha hafif |
| `focussan-tanitim-poster.jpg` | JPG | < 200 KB | 1280×720, lazy-load için ilk frame |

## Kaynak

Kaynak dosya: workspace kökünde `FOCUSSAN_TANITIM.mp4` (~311 MB). Cloudflare Pages 25 MB/file limiti var, sıkıştırma sonrası dosya üstüne çıkarsa Cloudflare R2 (10 GB ücretsiz tier) kullanılacak.

## Anasayfa entegrasyonu

Dosyalar buraya konunca `src/pages/index.astro` ve `src/pages/en/index.astro` içindeki "Üretim Hattımız" / "Inside the factory" section'ında:

1. `.video-placeholder` div'i silinir.
2. Yorumlu duran `<video>` bloğu aktif edilir.

Kontrol için TR + EN anasayfalarında "Video sources buraya gelecek" yorum işareti aranır.
