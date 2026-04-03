package com.cognia.app.ui.screens.home

import androidx.compose.animation.core.*
import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowForward
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.blur
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.*
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import com.cognia.app.ui.MainViewModel
import com.cognia.app.ui.components.CogniaBottomBar
import com.cognia.app.ui.navigation.Screen
import com.cognia.app.ui.theme.*

@Composable
fun HomeScreen(navController: NavController, viewModel: MainViewModel = hiltViewModel()) {
    val uiState by viewModel.uiState.collectAsState()
    val stressScore = uiState.stressScore.toFloat()

    Scaffold(
        containerColor = Background,
        bottomBar = { CogniaBottomBar(navController) }
    ) { innerPadding ->
        Box(modifier = Modifier.fillMaxSize().padding(innerPadding)) {
            // Ambient orbs
            Box(
                modifier = Modifier.size(400.dp).offset((-100).dp, (-100).dp).blur(110.dp)
                    .background(PrimaryContainer.copy(alpha = 0.08f), CircleShape)
            )
            Box(
                modifier = Modifier.size(400.dp).align(Alignment.BottomEnd).offset(100.dp, 100.dp).blur(110.dp)
                    .background(Secondary.copy(alpha = 0.08f), CircleShape)
            )

            Column(
                modifier = Modifier.fillMaxSize().verticalScroll(rememberScrollState()).padding(horizontal = 24.dp)
            ) {
                Spacer(modifier = Modifier.height(16.dp))

                // ── Top Bar ─────────────────────────────────────────────
                Row(
                    modifier = Modifier.fillMaxWidth().padding(vertical = 16.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Text("WELCOME BACK,", style = MaterialTheme.typography.labelSmall, color = OnSurface.copy(alpha = 0.5f))
                        Text("Yeswanth", style = MaterialTheme.typography.headlineLarge, color = OnSurface)
                    }
                    Box(
                        modifier = Modifier
                            .size(48.dp)
                            .clip(CircleShape)
                            .background(SurfaceContainerHigh)
                            .border(1.dp, Primary.copy(alpha = 0.3f), CircleShape),
                        contentAlignment = Alignment.Center
                    ) {
                        Text("YW", style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold), color = Primary)
                    }
                }

                Spacer(modifier = Modifier.height(24.dp))

                // ── Stress Score Card ─────────────────────────────────────
                GlassCard(modifier = Modifier.fillMaxWidth()) {
                    Column(
                        modifier = Modifier.fillMaxWidth().padding(24.dp),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        StressGauge(score = stressScore, modifier = Modifier.size(180.dp))
                        Spacer(modifier = Modifier.height(16.dp))
                        Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                            Text("Real-time Signal", style = MaterialTheme.typography.bodyMedium, color = Tertiary)
                            Icon(Icons.Default.Waves, null, tint = Tertiary, modifier = Modifier.size(16.dp))
                        }
                    }
                }

                Spacer(modifier = Modifier.height(16.dp))

                // ── Bento Grid ────────────────────────────────────────────
                // Spotify
                GlassCard(modifier = Modifier.fillMaxWidth()) {
                    Column(modifier = Modifier.padding(20.dp)) {
                        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                            Column {
                                Icon(Icons.Default.Waves, null, tint = Secondary, modifier = Modifier.size(20.dp))
                                Text("SPOTIFY VALENCE", style = MaterialTheme.typography.labelSmall, color = OnSurface.copy(alpha = 0.5f))
                                Text("0.72", style = MaterialTheme.typography.headlineSmall, color = OnSurface)
                            }
                            Surface(shape = RoundedCornerShape(8.dp), color = Secondary.copy(alpha = 0.1f)) {
                                Text("Positive", color = Secondary, modifier = Modifier.padding(horizontal = 8.dp, vertical = 2.dp), style = MaterialTheme.typography.labelSmall)
                            }
                        }
                    }
                }

                Spacer(modifier = Modifier.height(12.dp))

                // Stats Row
                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                    GlassCard(modifier = Modifier.weight(1f)) {
                        Column(modifier = Modifier.padding(20.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                            Icon(Icons.Default.DirectionsWalk, null, tint = Primary, modifier = Modifier.size(20.dp))
                            Text("STEPS", style = MaterialTheme.typography.labelSmall, color = OnSurface.copy(alpha = 0.5f))
                            Text("4,821", style = MaterialTheme.typography.headlineSmall, color = OnSurface)
                        }
                    }
                    GlassCard(modifier = Modifier.weight(1f)) {
                        Column(modifier = Modifier.padding(20.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                            Icon(Icons.Default.DarkMode, null, tint = Secondary, modifier = Modifier.size(20.dp))
                            Text("SLEEP", style = MaterialTheme.typography.labelSmall, color = OnSurface.copy(alpha = 0.5f))
                            Text("6h 12m", style = MaterialTheme.typography.headlineSmall, color = OnSurface)
                        }
                    }
                }

                Spacer(modifier = Modifier.height(12.dp))

                // Screen Time
                GlassCard(modifier = Modifier.fillMaxWidth()) {
                    Column(modifier = Modifier.padding(20.dp)) {
                        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                            Column {
                                Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                                    Icon(Icons.Default.Smartphone, null, tint = Tertiary, modifier = Modifier.size(20.dp))
                                    Text("SCREEN TIME", style = MaterialTheme.typography.labelSmall, color = OnSurface.copy(alpha = 0.5f))
                                }
                                Text("${uiState.screenTimeMins / 60}h ${uiState.screenTimeMins % 60}m", style = MaterialTheme.typography.headlineMedium, color = OnSurface)
                            }
                        }
                        Spacer(modifier = Modifier.height(16.dp))
                        // Progress bar
                        Row(modifier = Modifier.fillMaxWidth().height(8.dp).clip(CircleShape).background(OnSurface.copy(alpha = 0.05f))) {
                            Box(modifier = Modifier.weight(0.6f).fillMaxHeight().background(PrimaryContainer))
                            Box(modifier = Modifier.weight(0.4f).fillMaxHeight().background(Secondary))
                        }
                    }
                }

                Spacer(modifier = Modifier.height(12.dp))

                // Location / Network
                GlassCard(modifier = Modifier.fillMaxWidth()) {
                    Row(modifier = Modifier.fillMaxWidth().padding(24.dp), verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(16.dp)) {
                        Box(modifier = Modifier.size(48.dp).clip(RoundedCornerShape(12.dp)).background(Tertiary.copy(alpha = 0.1f)), contentAlignment = Alignment.Center) {
                            Icon(Icons.Default.LocationOn, null, tint = Tertiary)
                        }
                        Column {
                            Text(uiState.ssid, style = MaterialTheme.typography.titleMedium, color = OnSurface)
                            Text("BLOCK B · ROOM 204", style = MaterialTheme.typography.labelSmall, color = OnSurface.copy(alpha = 0.4f))
                        }
                    }
                }

                Spacer(modifier = Modifier.height(32.dp))
            }
        }
    }
}

@Composable
fun StressGauge(score: Float, modifier: Modifier = Modifier) {
    val animatedScore by animateFloatAsState(
        targetValue = score,
        animationSpec = tween(1000, easing = FastOutSlowInEasing),
        label = "stress"
    )

    Box(modifier = modifier, contentAlignment = Alignment.Center) {
        Canvas(modifier = Modifier.fillMaxSize()) {
            val strokeWidth = 8.dp.toPx()
            drawArc(
                color = Color.White.copy(alpha = 0.05f),
                startAngle = -210f,
                sweepAngle = 240f,
                useCenter = false,
                style = Stroke(width = strokeWidth, cap = StrokeCap.Round)
            )
            drawArc(
                brush = Brush.linearGradient(listOf(Primary, Secondary)),
                startAngle = -210f,
                sweepAngle = 240f * (animatedScore / 100f),
                useCenter = false,
                style = Stroke(width = strokeWidth + 2.dp.toPx(), cap = StrokeCap.Round)
            )
        }
        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            Text(animatedScore.toInt().toString(), style = MaterialTheme.typography.headlineLarge.copy(fontSize = 48.sp, fontWeight = FontWeight.Black))
            Text("STRESS", style = MaterialTheme.typography.labelSmall, color = OnSurface.copy(alpha = 0.5f))
        }
    }
}

@Composable
fun GlassCard(modifier: Modifier = Modifier, content: @Composable () -> Unit) {
    Surface(
        modifier = modifier,
        shape = RoundedCornerShape(24.dp),
        color = OnSurface.copy(alpha = 0.04f),
        border = BorderStroke(1.dp, Color.White.copy(alpha = 0.08f))
    ) { content() }
}
