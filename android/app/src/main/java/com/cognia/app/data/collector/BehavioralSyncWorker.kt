package com.cognia.app.data.collector

import android.content.Context
import androidx.hilt.work.HiltWorker
import androidx.work.CoroutineWorker
import androidx.work.WorkerParameters
import com.cognia.app.data.api.CogniaApiService
import com.cognia.app.data.api.TelemetryPacket
import com.cognia.app.data.prefs.PrefsManager
import dagger.assisted.Assisted
import dagger.assisted.AssistedInject
import java.util.*

@HiltWorker
class BehavioralSyncWorker @AssistedInject constructor(
    @Assisted appContext: Context,
    @Assisted workerParams: WorkerParameters,
    private val apiService: CogniaApiService
) : CoroutineWorker(appContext, workerParams) {

    override suspend fun doWork(): Result {
        val usageCollector = UsageCollector(applicationContext)
        val networkCollector = NetworkCollector(applicationContext)
        val prefsManager = PrefsManager(applicationContext)

        val usage = usageCollector.getDailyStats()
        val network = networkCollector.getCurrentStatus()
        
        // ── Stress Index Alpha Algorithm ──────────────────────────────
        // Weights: Base (30) + Social (0.4/min) + Midnight (30)
        var stressIndex = 30 + (usage.socialMinutes * 0.4).toInt()
        if (usage.midnightUsage) stressIndex += 30
        
        // Cap at 100
        stressIndex = stressIndex.coerceAtMost(100)

        val packet = TelemetryPacket(
            student_hash = prefsManager.getStudentHash("cognia_demo_salt"),
            stress_score = stressIndex,
            room_no = prefsManager.getRoom(),
            block = prefsManager.getBlock(),
            wifi_ssid = network.ssid,
            screen_time_mins = usage.totalOnTimeMinutes,
            social_mins = usage.socialMinutes,
            sleep_disruption = usage.midnightUsage
        )

        return try {
            val response = apiService.syncTelemetry(packet)
            if (response.isSuccessful) Result.success() else Result.retry()
        } catch (e: Exception) {
            Result.retry()
        }
    }
}
