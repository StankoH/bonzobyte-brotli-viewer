# 1. Release patch version
Write-Host "🔧 Releasing patch version..."
npm run release:patch

# 2. Push tag to GitHub
Write-Host "🚀 Pushing tags to GitHub..."
git push --follow-tags origin master

# 3. Build library
Write-Host "🏗️  Building Angular library..."
ng build brotli-viewer

# 4. Publish to NPM
Write-Host "📦 Publishing to NPM..."
cd dist/brotli-viewer
npm publish --access public
cd ../..
