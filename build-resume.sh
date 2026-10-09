#!/usr/bin/env sh
# Build the downloadable PDF and the in-page raster preview from resume.tex.
set -eu
cd "$(dirname "$0")"
mkdir -p assets
pdflatex -interaction=nonstopmode -halt-on-error -output-directory=assets resume.tex >/dev/null
pdflatex -interaction=nonstopmode -halt-on-error -output-directory=assets resume.tex >/dev/null
pdftocairo -png -singlefile -r 240 assets/resume.pdf assets/resume-preview
rm -f assets/resume.aux assets/resume.log assets/resume.out
printf '%s\n' 'Built assets/resume.pdf and assets/resume-preview.png'
