package com.cognia.app.data.collector

import android.content.Context
import androidx.health.connect.client.HealthConnectClient
import androidx.health.connect.client.permission.HealthPermission
import androidx.health.connect.client.records.SleepSessionRecord
import androidx.health.connect.client.records.StepsRecord
import androidx.health.connect.client.request.AggregateRequest
import androidx.health.connect.client.time.TimeRangeFilter
import java.time.Duration
import java.time.Instant
import java.time.temporal.ChronoUnit
import dagger.hilt.android.qualifiers.ApplicationContext
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class HealthCollector @Inject constructor(
    @ApplicationContext private val context: Context
) {

    private val healthConnectClient by lazy { HealthConnectClient.getOrCreate(context) }

    val permissions = setOf(
        HealthPermission.getReadPermission(StepsRecord::class),
        HealthPermission.getReadPermission(SleepSessionRecord::class)
    )

    suspend fun hasPermissions(): Boolean {
        val granted = healthConnectClient.permissionController.getGrantedPermissions()
        return granted.containsAll(permissions)
    }

    suspend fun getDailySteps(): Long {
        if (!hasPermissions()) return 0
        
        val startOfDay = Instant.now().truncatedTo(ChronoUnit.DAYS)
        val endOfDay = Instant.now()
        
        val response = healthConnectClient.aggregate(
            AggregateRequest(
                metrics = setOf(StepsRecord.COUNT_TOTAL),
                timeRangeFilter = TimeRangeFilter.between(startOfDay, endOfDay)
            )
        )
        return response[StepsRecord.COUNT_TOTAL] ?: 0
    }

    suspend fun getSleepDurationHours(): Double {
        if (!hasPermissions()) return 0.0
        
        val yesterday = Instant.now().minus(1, ChronoUnit.DAYS).truncatedTo(ChronoUnit.DAYS)
        val now = Instant.now()
        
        val response = healthConnectClient.aggregate(
            AggregateRequest(
                metrics = setOf(SleepSessionRecord.SLEEP_DURATION_TOTAL),
                timeRangeFilter = TimeRangeFilter.between(yesterday, now)
            )
        )
        val duration = response[SleepSessionRecord.SLEEP_DURATION_TOTAL] ?: return 0.0
        return duration.toMinutes() / 60.0
    }
}
