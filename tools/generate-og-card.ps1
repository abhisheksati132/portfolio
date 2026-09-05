# Regenerates assets/og-card.png (1200x630) in the site's design system.
# Usage:  powershell -ExecutionPolicy Bypass -File tools/generate-og-card.ps1
# Run from the repo root. Requires Georgia + Consolas (stock Windows fonts).

Add-Type -AssemblyName System.Drawing

$bmp = New-Object System.Drawing.Bitmap(1200, 630)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

# Design tokens (must match styles.css :root)
$bg     = [System.Drawing.Color]::FromArgb(0xFA, 0xF9, 0xF5)  # --bg
$ink    = [System.Drawing.Color]::FromArgb(0x1F, 0x1E, 0x1D)  # --text
$muted  = [System.Drawing.Color]::FromArgb(0x6B, 0x68, 0x62)  # --text-muted
$accent = [System.Drawing.Color]::FromArgb(0xD9, 0x77, 0x57)  # --accent
$line   = [System.Drawing.Color]::FromArgb(0xE5, 0xE3, 0xDE)  # --border

$g.Clear($bg)
$pen = New-Object System.Drawing.Pen($line, 2)
$g.DrawRectangle($pen, 1, 1, 1198, 628)

$mono  = New-Object System.Drawing.Font('Consolas', 34, [System.Drawing.FontStyle]::Bold)
$serif = New-Object System.Drawing.Font('Georgia', 118, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$sub   = New-Object System.Drawing.Font('Georgia', 44, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$tags  = New-Object System.Drawing.Font('Consolas', 30, [System.Drawing.FontStyle]::Regular)

$tb = New-Object System.Drawing.SolidBrush($accent)
$ib = New-Object System.Drawing.SolidBrush($ink)
$mb = New-Object System.Drawing.SolidBrush($muted)

$spaced = { param($s) ($s.ToCharArray() -join ' ') }

$g.DrawString((& $spaced 'PORTFOLIO'), $mono, $tb, 90, 92)
$g.DrawString('Abhishek Sati', $serif, $ib, 82, 150)
# NOTE: single '&' is correct — DrawString with default flags renders it literally.
$g.DrawString('Real-time data systems & secure software.', $sub, $mb, 88, 330)
$g.FillRectangle($tb, 92, 420, 200, 8)
$g.DrawString('NewsAtlas  -  Klipport  -  Whispr', $tags, $mb, 88, 470)

$g.Dispose()
$bmp.Save("$pwd\assets\og-card.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
Write-Host "Wrote assets/og-card.png"
