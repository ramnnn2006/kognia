package com.cognia.app.ui

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.cognia.app.data.collector.HealthCollector
import com.cognia.app.data.collector.NetworkCollector
import com.cognia.app.data.collector.UsageCollector
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

data class AppState(
    val stressScore: Int = 0,
    val screenTimeMins: Long = 0,
    val socialMins: Long = 0,
    val ssid: String = "Connecting...",
    val room: Int = 204,
    val steps: Long = 0,
    val sleepHours: Double = 0.0
)

@HiltViewModel
class MainViewModel @Inject constructor(
    private val usageCollector: UsageCollector,
    private val networkCollector: NetworkCollector,
    private val healthCollector: HealthCollector
) : ViewModel() {

    private val _uiState = MutableStateFlow(AppState())
    val uiState: StateFlow<AppState> = _uiState

    init {
        startDataPolling()
    }

    private fun startDataPolling() {
        viewModelScope.launch {
            while (true) {
                val usage = usageCollector.getDailyStats()
                val network = networkCollector.getCurrentStatus()
                val steps = healthCollector.getDailySteps()
                val sleep = healthCollector.getSleepDurationHours()
                
                // Calculate real stress for the UI (Algorithm refined with Google Fit data)
                var stress = 30 + (usage.socialMinutes * 0.4).toInt()
                if (usage.midnightUsage) stress += 30
                if (steps < 2000) stress += 10 // Sedentary behavior adjustment
                if (sleep < 5.0) stress += 20 // Sleep deprivation adjustment
                
                stress = stress.coerceAtMost(100)

                _uiState.value = AppState(
                    stressScore = stress,
                    screenTimeMins = usage.totalOnTimeMinutes,
                    socialMins = usage.socialMinutes,
                    ssid = network.ssid,
                    steps = steps,
                    sleepHours = sleep
                )
                
                delay(30000) // Update UI every 30 seconds
            }
        }
    }
}
