# release-and-publish.ps1
# Pokreći iz root direktorija: bonzobyte-brotli-viewer\bonzobyte-brotli-viewer\

$ErrorActionPreference = "Stop"

# 1. Release (patch)
Write-Host "🚀 Releasing patch version..."
npm run release:patch

# 2. Push tag to GitHub
Write-Host "📡 Pushing tags to GitHub..."
git push --follow-tags origin master

# 3. Build Angular library
Write-Host "🔨 Building Angular library..."
ng build brotli-viewer

# 4. Publish to NPM
$distPath = Join-Path $PSScriptRoot "dist\brotli-viewer"
Write-Host "📦 Publishing to NPM from $distPath ..."
Set-Location $distPath
npm publish --access public

# 5. Return to root
Set-Location $PSScriptRoot
Write-Host "`n✅ DONE!"
