node node_modules/vite/bin/vite.js build --mode android
rm -rf ./android
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

ANDROID_SDK_ROOT=/opt/android-sdk ./gradlew assembleDebug
