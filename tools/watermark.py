#!/usr/bin/env python3
"""Tile the mono MAG mark diagonally over a client preview image, then downscale
and re-compress it so the result is unusable for printing."""

import argparse
import io
import math

import cairosvg
from PIL import Image


def render_watermark_tile(svg_path: str, tile_px: int) -> Image.Image:
    png_bytes = cairosvg.svg2png(url=svg_path, output_width=tile_px)
    return Image.open(io.BytesIO(png_bytes)).convert("RGBA")


def apply_opacity(tile: Image.Image, opacity: float) -> Image.Image:
    r, g, b, a = tile.split()
    a = a.point(lambda v: int(v * opacity))
    return Image.merge("RGBA", (r, g, b, a))


def build_tiled_layer(tile: Image.Image, canvas_size: int, angle: float) -> Image.Image:
    """Brick-offset tile across an oversized square, then rotate so a corner
    crop of the final image still carries the mark."""
    tile_w, tile_h = tile.size
    layer = Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0))
    row = 0
    y = -tile_h
    while y < canvas_size:
        x_offset = (tile_w // 2) if row % 2 else 0
        x = -tile_w - x_offset
        while x < canvas_size:
            layer.paste(tile, (x, y), tile)
            x += tile_w
        y += tile_h
        row += 1
    return layer.rotate(angle, resample=Image.BICUBIC, expand=False)


def watermark(
    image_path,
    svg_path,
    out_path,
    opacity=0.16,
    tiles_across=4.5,
    angle=30.0,
    max_width=1800,
    quality=72,
):
    base = Image.open(image_path).convert("RGBA")
    w, h = base.size

    tile_px = max(1, round(w / tiles_across))
    tile = apply_opacity(render_watermark_tile(svg_path, tile_px), opacity)

    canvas_size = math.ceil(math.hypot(w, h)) + max(tile.size)
    layer = build_tiled_layer(tile, canvas_size, angle)

    left = (canvas_size - w) // 2
    top = (canvas_size - h) // 2
    layer = layer.crop((left, top, left + w, top + h))

    composited = Image.alpha_composite(base, layer)

    if w > max_width:
        new_h = round(h * (max_width / w))
        composited = composited.resize((max_width, new_h), Image.LANCZOS)

    composited.convert("RGB").save(out_path, "JPEG", quality=quality)


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("image", help="client preview image to watermark")
    p.add_argument("-o", "--out", required=True, help="output JPEG path")
    p.add_argument("--mark", default="assets/brand/mag-logo-mono.svg", help="mono logo SVG to tile")
    p.add_argument("--opacity", type=float, default=0.16)
    p.add_argument("--tiles-across", type=float, default=4.5)
    p.add_argument("--angle", type=float, default=30.0)
    p.add_argument("--max-width", type=int, default=1800)
    p.add_argument("--quality", type=int, default=72)
    args = p.parse_args()

    watermark(
        args.image,
        args.mark,
        args.out,
        opacity=args.opacity,
        tiles_across=args.tiles_across,
        angle=args.angle,
        max_width=args.max_width,
        quality=args.quality,
    )
    print(f"wrote {args.out}")


if __name__ == "__main__":
    main()
