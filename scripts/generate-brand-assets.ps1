# Genera los iconos de la app a partir del logo oficial (assets/brand/logo-original.png).
# Fuente del logo: https://ateliereclosionbijoux.com (header de la tienda).
# Uso: powershell -ExecutionPolicy Bypass -File scripts/generate-brand-assets.ps1

Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$assets = Join-Path $root 'assets'
$logo = [System.Drawing.Image]::FromFile((Join-Path $assets 'brand/logo-original.png'))
$ivoire = [System.Drawing.ColorTranslator]::FromHtml('#FAF6F0')

function New-Canvas([int]$size, $background) {
    $bmp = New-Object System.Drawing.Bitmap $size, $size, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    if ($null -ne $background) { $g.Clear($background) } else { $g.Clear([System.Drawing.Color]::Transparent) }
    return @{ Bitmap = $bmp; Graphics = $g }
}

# Dibuja el logo centrado ocupando como máximo `fraction` del lienzo, sin deformarlo.
function Draw-Logo($canvas, [int]$size, [double]$fraction, $attributes = $null) {
    $box = $size * $fraction
    $scale = [Math]::Min($box / $logo.Width, $box / $logo.Height)
    $w = [int]($logo.Width * $scale)
    $h = [int]($logo.Height * $scale)
    $rect = New-Object System.Drawing.Rectangle ([int](($size - $w) / 2)), ([int](($size - $h) / 2)), $w, $h
    if ($null -eq $attributes) {
        $canvas.Graphics.DrawImage($logo, $rect)
    } else {
        $canvas.Graphics.DrawImage($logo, $rect, 0, 0, $logo.Width, $logo.Height, [System.Drawing.GraphicsUnit]::Pixel, $attributes)
    }
}

function Save($canvas, [string]$name) {
    $canvas.Graphics.Dispose()
    $canvas.Bitmap.Save((Join-Path $assets $name), [System.Drawing.Imaging.ImageFormat]::Png)
    $canvas.Bitmap.Dispose()
    Write-Output "  $name"
}

# Icono general (iOS / tiendas): fondo marfil, logo al 76 %.
$c = New-Canvas 1024 $ivoire; Draw-Logo $c 1024 0.76; Save $c 'icon.png'

# Android adaptive icon: el sistema recorta con máscara; la zona segura es el 66 % central.
$c = New-Canvas 512 $ivoire; Save $c 'android-icon-background.png'
$c = New-Canvas 512 $null; Draw-Logo $c 512 0.60; Save $c 'android-icon-foreground.png'

# Monocromo (Android 13+, iconos temáticos): solo importa la silueta, se pinta en blanco.
$white = New-Object System.Drawing.Imaging.ColorMatrix
$white.Matrix00 = 0; $white.Matrix11 = 0; $white.Matrix22 = 0
$white.Matrix40 = 1; $white.Matrix41 = 1; $white.Matrix42 = 1
$attrs = New-Object System.Drawing.Imaging.ImageAttributes
$attrs.SetColorMatrix($white)
$c = New-Canvas 432 $null; Draw-Logo $c 432 0.60 $attrs; Save $c 'android-icon-monochrome.png'

# Splash: logo transparente sobre el fondo marfil configurado en app.json.
$c = New-Canvas 1024 $null; Draw-Logo $c 1024 1.0; Save $c 'splash-icon.png'

# Favicon (web).
$c = New-Canvas 48 $ivoire; Draw-Logo $c 48 0.86; Save $c 'favicon.png'

# Versión liviana para usar dentro de la app (header, pantalla La marca).
$w = 720; $h = [int]($logo.Height * $w / $logo.Width)
$bmp = New-Object System.Drawing.Bitmap $w, $h, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.DrawImage($logo, 0, 0, $w, $h)
$g.Dispose()
$bmp.Save((Join-Path $assets 'brand/logo.png'), [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
Write-Output "  brand/logo.png ($w x $h)"

$logo.Dispose()
