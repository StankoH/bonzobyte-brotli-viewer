@echo off
setlocal

:: Postavi radni direktorij na ovaj .bat datoteku
cd /d "%~dp0"

echo 🧠 Releasing patch version from projects/brotli-viewer...
cd projects\brotli-viewer
call npm run release:patch
IF ERRORLEVEL 1 (
    echo ❌ Failed during version release.
    exit /b 1
)
cd ../..

echo 🏗️ Building Angular library...
call ng build brotli-viewer
IF ERRORLEVEL 1 (
    echo ❌ Build failed.
    exit /b 1
)

echo 🚀 Pushing tags to GitHub...
call git push --follow-tags origin master
IF ERRORLEVEL 1 (
    echo ❌ Failed to push tags.
    exit /b 1
)

echo 🧳 Publishing to NPM...
cd dist\brotli-viewer
call npm publish --access public
IF ERRORLEVEL 1 (
    echo ❌ NPM publish failed.
    exit /b 1
)

echo ✅ Done! Package successfully released and published!
pause
