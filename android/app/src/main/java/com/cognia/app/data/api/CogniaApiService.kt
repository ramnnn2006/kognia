package com.cognia.app.data.api

import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.POST

/**
 * Anonymized Telemetry Sync.
 */
data class TelemetryPacket(
    val student_hash: String,
    val stress_score: Int,
    val room_no: Int,
    val block: String,
    val wifi_ssid: String,
    val screen_time_mins: Long,
    val social_mins: Long,
    val sleep_disruption: Boolean
)

interface CogniaApiService {
    @POST("api/v1/telemetry/sync")
    suspend fun syncTelemetry(@Body packet: TelemetryPacket): Response<Unit>
}
