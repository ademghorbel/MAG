# tools/watermark.py

Not part of the site build — internal use only, for sending client preview
images that shouldn't be usable straight off the bat.

Tiles `assets/brand/mag-logo-mono.svg` diagonally over an image, brick-offset
so cropping one corner won't clear it, then downscales and re-compresses so
the result isn't print-usable.

## Setup (once)

```
pip install -r tools/requirements.txt
```

## Usage

```
python tools/watermark.py <input-image> -o <output-path>
```

Example, from the repo root:

```
python tools/watermark.py "C:\path\to\client-preview.jpg" -o "C:\path\to\client-preview-watermarked.jpg"
```

That's it for the common case — it defaults to `assets/brand/mag-logo-mono.svg`
as the mark, 0.16 opacity, ~4.5 tiles across, 30° angle, downscaled to max
1800px wide, JPEG quality 72.

## Trying it on a new image

1. Point at any image file (PNG/JPG, any size — large source files are fine,
   they get downscaled at the end):
   ```
   python tools/watermark.py "path\to\some-banner.png" -o "path\to\some-banner-wm.jpg"
   ```
2. Open the output. Check the mark reads clearly but doesn't fight the
   artwork. If it's too strong/weak or too sparse/dense, adjust:
   ```
   python tools/watermark.py input.jpg -o output.jpg --opacity 0.20 --tiles-across 6
   ```

## All options

| Flag | Default | What it does |
|---|---|---|
| `-o / --out` | *(required)* | Output JPEG path |
| `--mark` | `assets/brand/mag-logo-mono.svg` | Which SVG to tile |
| `--opacity` | `0.16` | Mark opacity, 0–1 |
| `--tiles-across` | `4.5` | How many mark tiles fit across the image width (lower = bigger tiles) |
| `--angle` | `30.0` | Tile rotation, degrees |
| `--max-width` | `1800` | Output is downscaled to this width if larger |
| `--quality` | `72` | JPEG re-compression quality |

## Notes

- Uses `resvg_py` to rasterize the SVG mark — a self-contained, pip-only
  renderer. (The brief originally specced `cairosvg`, but that needs the
  native Cairo library, which isn't installable here without admin rights;
  `resvg_py` needs nothing beyond `pip install`.)
- Test outputs are gitignored under `tools/test-output/` — put scratch runs
  there if you want them out of `git status`.
