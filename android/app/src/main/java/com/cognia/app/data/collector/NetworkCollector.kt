package com.cognia.app.data.collector

import android.content.Context
import android.net.wifi.WifiManager
import android.os.Build

/**
 * Extracts current network environment to determine location (Building/Room level).
 */
class NetworkCollector(private val context: Context) {

    data class NetworkStatus(
        val ssid: String,
        val rssi: Int
    )

    fun getCurrentStatus(): NetworkStatus {
        val wifiManager = context.applicationContext.getSystemService(Context.WIFI_SERVICE) as WifiManager
        val info = wifiManager.connectionInfo
        
        // In Android 10+, SSID might be "<unknown ssid>" without Fine Location permission
        val currentSsid = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            info.ssid.removeSurrounding("\"")
        } else {
            info.ssid ?: "Unknown"
        }

        return NetworkStatus(currentSsid, info.rssi)
    }
}
