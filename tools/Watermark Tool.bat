@echo off
cd /d "%~dp0"
python watermark_gui.py
if errorlevel 1 pause
