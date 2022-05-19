node node_modules/vite/bin/vite.js build --mode android
rm -rf ./android
npx cap add android
npx cap copy android
rm -rf ../dist
cd android
ANDROID_SDK_ROOT=/opt/android-sdk ./gradlew assembleDebug
