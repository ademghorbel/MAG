#!/usr/bin/env python3
"""Tkinter front-end for watermark.py — pick input/output/mark with file dialogs
instead of typing CLI flags."""

import os
import sys
import threading
import tkinter as tk
from tkinter import filedialog, messagebox, ttk

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import watermark as wm

TOOLS_DIR = os.path.dirname(os.path.abspath(__file__))
DEFAULT_MARK = os.path.join(TOOLS_DIR, "..", "assets", "brand", "mag-logo-mono.svg")


def default_output_for(image_path):
    root, _ext = os.path.splitext(image_path)
    return root + "-watermarked.jpg"


class WatermarkApp(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("MAG Watermark Tool")
        self.resizable(False, False)

        self.image_path = tk.StringVar()
        self.mark_path = tk.StringVar(value=os.path.normpath(DEFAULT_MARK))
        self.out_path = tk.StringVar()
        self.opacity = tk.DoubleVar(value=0.16)
        self.tiles_across = tk.DoubleVar(value=4.5)
        self.angle = tk.DoubleVar(value=30.0)
        self.max_width = tk.IntVar(value=1800)
        self.quality = tk.IntVar(value=72)
        self.status = tk.StringVar(value="Pick an image to get started.")

        pad = {"padx": 10, "pady": 6}
        row = 0

        self._path_row("Image to watermark", self.image_path, row, self._pick_image); row += 1
        self._path_row("Mono logo (mark)", self.mark_path, row, self._pick_mark); row += 1
        self._path_row("Save watermarked copy as", self.out_path, row, self._pick_output); row += 1

        opts = ttk.LabelFrame(self, text="Options")
        opts.grid(row=row, column=0, columnspan=3, sticky="ew", **pad)
        row += 1
        self._slider(opts, "Opacity", self.opacity, 0.02, 1.0, 0)
        self._slider(opts, "Tiles across", self.tiles_across, 1, 12, 1)
        self._slider(opts, "Angle (°)", self.angle, 0, 90, 2)
        self._slider(opts, "Max width (px)", self.max_width, 400, 4000, 3, is_int=True)
        self._slider(opts, "JPEG quality", self.quality, 30, 95, 4, is_int=True)

        self.run_btn = ttk.Button(self, text="Watermark it", command=self._run)
        self.run_btn.grid(row=row, column=0, columnspan=3, sticky="ew", **pad)
        row += 1

        ttk.Label(self, textvariable=self.status, foreground="#555", wraplength=460).grid(
            row=row, column=0, columnspan=3, sticky="w", padx=10, pady=(0, 10)
        )

    def _path_row(self, label, var, row, command):
        ttk.Label(self, text=label).grid(row=row, column=0, sticky="w", padx=10, pady=6)
        ttk.Entry(self, textvariable=var, width=48).grid(row=row, column=1, padx=(0, 6), pady=6)
        ttk.Button(self, text="Browse…", command=command).grid(row=row, column=2, padx=(0, 10), pady=6)

    def _slider(self, parent, label, var, lo, hi, row, is_int=False):
        ttk.Label(parent, text=label, width=14).grid(row=row, column=0, sticky="w", padx=8, pady=4)
        scale = ttk.Scale(parent, from_=lo, to=hi, variable=var, orient="horizontal", length=220)
        scale.grid(row=row, column=1, padx=4, pady=4)
        value_lbl = ttk.Label(parent, width=6)
        value_lbl.grid(row=row, column=2, padx=4, pady=4)

        def refresh(*_):
            v = var.get()
            value_lbl.config(text=str(int(v)) if is_int else f"{v:.2f}")

        var.trace_add("write", refresh)
        refresh()

    def _pick_image(self):
        path = filedialog.askopenfilename(
            title="Choose image to watermark",
            filetypes=[("Images", "*.png *.jpg *.jpeg *.webp *.bmp"), ("All files", "*.*")],
        )
        if path:
            self.image_path.set(path)
            if not self.out_path.get():
                self.out_path.set(default_output_for(path))

    def _pick_mark(self):
        path = filedialog.askopenfilename(
            title="Choose mono logo SVG",
            initialdir=os.path.join(TOOLS_DIR, "..", "assets", "brand"),
            filetypes=[("SVG", "*.svg"), ("All files", "*.*")],
        )
        if path:
            self.mark_path.set(path)

    def _pick_output(self):
        path = filedialog.asksaveasfilename(
            title="Save watermarked copy as",
            defaultextension=".jpg",
            filetypes=[("JPEG", "*.jpg")],
            initialfile=os.path.basename(self.out_path.get() or "watermarked.jpg"),
        )
        if path:
            self.out_path.set(path)

    def _run(self):
        image, mark, out = self.image_path.get(), self.mark_path.get(), self.out_path.get()
        if not image or not os.path.isfile(image):
            messagebox.showerror("Missing image", "Pick a valid image file first.")
            return
        if not mark or not os.path.isfile(mark):
            messagebox.showerror("Missing mark", "Pick a valid mono logo SVG first.")
            return
        if not out:
            messagebox.showerror("Missing output", "Choose where to save the watermarked copy.")
            return

        self.run_btn.config(state="disabled")
        self.status.set("Working…")

        def work():
            try:
                wm.watermark(
                    image, mark, out,
                    opacity=self.opacity.get(),
                    tiles_across=self.tiles_across.get(),
                    angle=self.angle.get(),
                    max_width=self.max_width.get(),
                    quality=self.quality.get(),
                )
                self.after(0, lambda: self._done(out))
            except Exception as e:
                self.after(0, lambda: self._failed(e))

        threading.Thread(target=work, daemon=True).start()

    def _done(self, out):
        self.run_btn.config(state="normal")
        self.status.set(f"Done — saved to {out}")
        messagebox.showinfo("Done", f"Watermarked image saved to:\n{out}")

    def _failed(self, err):
        self.run_btn.config(state="normal")
        self.status.set(f"Failed: {err}")
        messagebox.showerror("Failed", str(err))


if __name__ == "__main__":
    WatermarkApp().mainloop()
