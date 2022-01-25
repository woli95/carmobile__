package com.carmobile__

import android.widget.Toast
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod

class RNCToastMessage(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext)  {
    override fun getName(): String {
        return "RNCToastMessage"
    }

    override fun getConstants(): Map<String, Any> {
        val constants = HashMap<String, Any>()
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT)
        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG)
        return constants
    }

    @ReactMethod
    fun showToast(message: String, duration: Int) {
        Toast.makeText(reactApplicationContext, message, duration).show()
    }

    companion object {
        private const val DURATION_SHORT_KEY = "SHORT"
        private const val DURATION_LONG_KEY = "LONG"
    }
}