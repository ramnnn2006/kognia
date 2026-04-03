package com.cognia.app.data.collector

import android.app.usage.UsageStatsManager
import android.content.Context
import java.util.Calendar

/**
 * Extracts student's digital hygiene metrics (Screen time, Social vs Study).
 */
class UsageCollector(private val context: Context) {

    data class ScreenTimeStats(
        val totalOnTimeMinutes: Long,
        val socialMinutes: Long,
        val midnightUsage: Boolean
    )

    fun getDailyStats(): ScreenTimeStats {
        val usageStatsManager = context.getSystemService(Context.USAGE_STATS_SERVICE) as UsageStatsManager
        val calendar = Calendar.getInstance()
        val endTime = calendar.timeInMillis
        calendar.set(Calendar.HOUR_OF_DAY, 0)
        calendar.set(Calendar.MINUTE, 0)
        val startTime = calendar.timeInMillis

        // Social apps (Common package names for hackathon demo)
        val socialApps = listOf("com.instagram.android", "com.whatsapp", "com.facebook.orca", "com.twitter.android")
        var totalMinutes = 0L
        var socialMinutes = 0L
        var midnightDisruption = false

        val stats = usageStatsManager.queryAndAggregateUsageStats(startTime, endTime)

        stats.forEach { (pkg, stat) ->
            val minutes = stat.totalTimeInForeground / (1000 * 60)
            totalMinutes += minutes
            if (pkg in socialApps) {
                socialMinutes += minutes
            }
        }

        // Check for 2 AM - 5 AM usage (Simplified for demo)
        val hour = Calendar.getInstance().get(Calendar.HOUR_OF_DAY)
        if (hour in 2..5) midnightDisruption = true

        return ScreenTimeStats(totalMinutes, socialMinutes, midnightDisruption)
    }
}
