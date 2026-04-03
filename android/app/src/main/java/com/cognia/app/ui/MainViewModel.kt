package com.cognia.app.ui

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
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
    val room: Int = 204
)

@HiltViewModel
class MainViewModel @Inject constructor(
    private val usageCollector: UsageCollector,
    private val networkCollector: NetworkCollector
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
                
                // Calculate real stress for the UI
                var stress = 30 + (usage.socialMinutes * 0.4).toInt()
                if (usage.midnightUsage) stress += 30
                stress = stress.coerceAtMost(100)

                _uiState.value = AppState(
                    stressScore = stress,
                    screenTimeMins = usage.totalOnTimeMinutes,
                    socialMins = usage.socialMinutes,
                    ssid = network.ssid
                )
                
                delay(30000) // Update UI every 30 seconds
            }
        }
    }
}
