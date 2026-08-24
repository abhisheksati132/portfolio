# Regenerates the PNG icons from the site's favicon design.
# Usage:  powershell -ExecutionPolicy Bypass -File tools/generate-icons.ps1
# Run from the repo root.

Add-Type -AssemblyName System.Drawing

function New-Icon([int]$size, [string]$path) {
  $bmp = New-Object System.Drawing.Bitmap($size, $size)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
  $g.Clear([System.Drawing.Color]::Transparent)

  # Design tokens (must match styles.css :root)
  $bg = [System.Drawing.Color]::FromArgb(0xFA, 0xF9, 0xF5)      # --bg
  $accent = [System.Drawing.Color]::FromArgb(0xD9, 0x77, 0x57)  # --accent

  $bgBrush = New-Object System.Drawing.SolidBrush($bg)
  $g.FillRectangle($bgBrush, 0, 0, $size, $size)

  $font = New-Object System.Drawing.Font('Consolas', ($size * 0.42), [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
  $tb = New-Object System.Drawing.SolidBrush($accent)
  $sf = New-Object System.Drawing.StringFormat
  $sf.Alignment = [System.Drawing.StringAlignment]::Center
  $sf.LineAlignment = [System.Drawing.StringAlignment]::Center
  $textRect = New-Object System.Drawing.RectangleF(0, (-$size * 0.03), $size, $size)
  $g.DrawString('</>', $font, $tb, $textRect, $sf)

  $g.Dispose()
  $bmp.Save("$pwd\$path", [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
  Write-Host "Wrote $path ($size px)"
}

New-Icon 180 'assets\apple-touch-icon.png'
New-Icon 192 'assets\icon-192.png'
New-Icon 512 'assets\icon-512.png'
