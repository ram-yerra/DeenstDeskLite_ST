package com.ram.vmoksha.ddlst;

import org.apache.cordova.DroidGap;
import android.os.Bundle;

public class DeenstDeskLite_STActivity extends DroidGap {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.setIntegerProperty("splashscreen",R.drawable.splash);
        super.loadUrl("file:///android_asset/www/index.html");
    }
}
