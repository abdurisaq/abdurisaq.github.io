@echo off
setlocal
cd /d "%~dp0"
if not exist assets mkdir assets
pdflatex -interaction=nonstopmode -halt-on-error -output-directory=assets resume.tex
if errorlevel 1 exit /b 1
pdflatex -interaction=nonstopmode -halt-on-error -output-directory=assets resume.tex
if errorlevel 1 exit /b 1
pdftocairo -png -singlefile -r 240 assets\resume.pdf assets\resume-preview
if errorlevel 1 exit /b 1
del /q assets\resume.aux assets\resume.log assets\resume.out 2>nul
echo Built assets\resume.pdf and assets\resume-preview.png
