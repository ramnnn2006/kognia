package com.cognia.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import com.cognia.app.ui.navigation.CogniaNavGraph
import com.cognia.app.ui.theme.CogniaTheme
import dagger.hilt.android.AndroidEntryPoint

import android.content.Context
import android.content.Intent
import android.provider.Settings
import android.app.AppOpsManager
import android.os.Process
import androidx.work.*
import com.cognia.app.data.collector.BehavioralSyncWorker
import com.cognia.app.data.prefs.PrefsManager
import java.util.concurrent.TimeUnit

@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        installSplashScreen()
        super.onCreate(savedInstanceState)

        // ── Step 1: Ensure Prefs are seeded (For Demo) ─────────────
        val prefs = PrefsManager(this)
        prefs.saveIdentity("RA2111003010123", "B", 204)

        // ── Step 2: Request Usage Stats Permission ───────────────
        if (!hasUsageStatsPermission()) {
            startActivity(Intent(Settings.ACTION_USAGE_ACCESS_SETTINGS))
        }

        // ── Step 3: Enqueue Periodic Sync ────────────────────────
        val syncWorkRequest = PeriodicWorkRequestBuilder<BehavioralSyncWorker>(
            15, TimeUnit.MINUTES
        ).setConstraints(
            Constraints.Builder().setRequiredNetworkType(NetworkType.CONNECTED).build()
        ).build()

        WorkManager.getInstance(this).enqueueUniquePeriodicWork(
            "cognia_sync",
            ExistingPeriodicWorkPolicy.KEEP,
            syncWorkRequest
        )

        enableEdgeToEdge()
        setContent {
            CogniaTheme {
                Surface(modifier = Modifier.fillMaxSize()) {
                    CogniaNavGraph()
                }
            }
        }
    }

    private fun hasUsageStatsPermission(): Boolean {
        val appOps = getSystemService(Context.APP_OPS_SERVICE) as AppOpsManager
        val mode = if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.Q) {
            appOps.unsafeCheckOpNoThrow(AppOpsManager.OPSTR_GET_USAGE_STATS, Process.myUid(), packageName)
        } else {
            appOps.checkOpNoThrow(AppOpsManager.OPSTR_GET_USAGE_STATS, Process.myUid(), packageName)
        }
        return mode == AppOpsManager.MODE_ALLOWED
    }
}
