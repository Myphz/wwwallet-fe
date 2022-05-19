node node_modules/vite/bin/vite.js build --mode android
rm -rf ./apk
mkdir apk
npx cap add android
npx cap copy android
rm -rf ../dist
cordova-res android --skip-config --copy
cd android
# To enable persistent cookies
echo "package com.wwwallet.app;
import android.webkit.CookieManager;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  @Override
  public void onPause() {
    super.onPause();

    CookieManager.getInstance().flush();
  }
}" > ./app/src/main/java/com/wwwallet/app/MainActivity.java

ANDROID_SDK_ROOT=/opt/android-sdk ./gradlew assembleRelease
# Sign the apk
cd app/build/outputs/apk/release
/opt/android-sdk/build-tools/30.0.2/zipalign -v -p 4 app-release-unsigned.apk aligned.apk
/opt/android-sdk/build-tools/30.0.2/apksigner sign --ks ~/keys/1.0.jks --out ../../../../../../apk/wwwallet.apk aligned.apk
cd ../../../../../../
rm -rf ./android
