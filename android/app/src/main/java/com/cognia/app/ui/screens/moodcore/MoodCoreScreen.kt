package com.cognia.app.ui.screens.moodcore

import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
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
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.cognia.app.ui.components.CogniaBottomBar
import com.cognia.app.ui.screens.home.GlassCard
import com.cognia.app.ui.theme.*

private data class TrackItem(
    val title: String,
    val artist: String,
    val valence: Float,
    val accentColor: Color
)

private val mockTracks = listOf(
    TrackItem("Neural Drift",    "Etheric Pulse", 0.82f, Secondary),
    TrackItem("Subliminal Echo", "Mono-Flow",     0.45f, Primary),
    TrackItem("Kinetic Mind",    "Vortex Sound",  0.21f, Error),
)

@Composable
fun MoodCoreScreen(navController: NavController) {
    Scaffold(
        containerColor = Background,
        bottomBar = { CogniaBottomBar(navController) }
    ) { innerPadding ->
        Box(modifier = Modifier.fillMaxSize()) {
            Box(
                modifier = Modifier.size(400.dp).blur(100.dp)
                    .background(PrimaryContainer.copy(alpha = 0.07f), CircleShape)
            )

            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .verticalScroll(rememberScrollState())
                    .padding(innerPadding)
                    .padding(horizontal = 20.dp)
            ) {
                Spacer(modifier = Modifier.height(16.dp))

                // ── Top App Bar ──────────────────────────────────────────
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(16.dp)) {
                        IconButton(onClick = { navController.popBackStack() }) {
                            Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back", tint = OnSurface)
                        }
                        Text(
                            "Mood-Core",
                            style = MaterialTheme.typography.titleLarge.copy(fontWeight = FontWeight.Black),
                            color = Primary
                        )
                    }
                    Surface(
                        shape = CircleShape,
                        color = Color(0xFF22C55E).copy(alpha = 0.1f),
                        border = BorderStroke(1.dp, Color(0xFF22C55E).copy(alpha = 0.2f))
                    ) {
                        Row(
                            modifier = Modifier.padding(horizontal = 12.dp, vertical = 4.dp),
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.spacedBy(6.dp)
                        ) {
                            Box(modifier = Modifier.size(6.dp).background(Color(0xFF22C55E), CircleShape))
                            Text("CONNECTED", style = MaterialTheme.typography.labelSmall, color = Color(0xFF4ADE80))
                        }
                    }
                }

                Spacer(modifier = Modifier.height(20.dp))

                // ── Hero: Valence Flow Card ──────────────────────────────
                GlassCard(modifier = Modifier.fillMaxWidth()) {
                    Column(modifier = Modifier.padding(24.dp)) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.Top
                        ) {
                            Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                                Text(
                                    "EMOTIONAL TRAJECTORY",
                                    style = MaterialTheme.typography.labelSmall,
                                    color = Color(0xFF71717A)
                                )
                                Text(
                                    "Valence Flow",
                                    style = MaterialTheme.typography.headlineMedium.copy(fontWeight = FontWeight.Bold),
                                    color = OnSurface
                                )
                            }
                            Box(
                                modifier = Modifier
                                    .size(40.dp)
                                    .clip(RoundedCornerShape(12.dp))
                                    .background(PrimaryContainer.copy(alpha = 0.1f)),
                                contentAlignment = Alignment.Center
                            ) {
                                Icon(Icons.Default.Insights, contentDescription = null, tint = Primary, modifier = Modifier.size(20.dp))
                            }
                        }

                        Spacer(modifier = Modifier.height(20.dp))

                        // Valence chart (Canvas)
                        ValenceChart(modifier = Modifier.fillMaxWidth().height(120.dp))

                        Spacer(modifier = Modifier.height(8.dp))
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            listOf("30D AGO", "15D AGO", "TODAY").forEach { label ->
                                Text(label, style = MaterialTheme.typography.labelSmall, color = Color(0xFF52525B))
                            }
                        }

                        Spacer(modifier = Modifier.height(20.dp))

                        // Metric chips
                        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            MetricChip(label = "AVG VALENCE", value = "0.68", valueColor = Primary)
                            MetricChip(label = "AVG ENERGY", value = "0.74", valueColor = Secondary)
                            Surface(
                                shape = RoundedCornerShape(8.dp),
                                color = PrimaryContainer.copy(alpha = 0.1f),
                                border = BorderStroke(1.dp, PrimaryContainer.copy(alpha = 0.2f))
                            ) {
                                Row(
                                    modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp),
                                    verticalAlignment = Alignment.CenterVertically,
                                    horizontalArrangement = Arrangement.spacedBy(6.dp)
                                ) {
                                    Box(modifier = Modifier.size(6.dp).background(Primary, CircleShape))
                                    Text("Positive", style = MaterialTheme.typography.labelSmall, color = Primary)
                                }
                            }
                        }
                    }
                }

                Spacer(modifier = Modifier.height(20.dp))

                // ── Recent Listening Sessions ────────────────────────────
                Text(
                    "RECENT LISTENING SESSIONS",
                    style = MaterialTheme.typography.labelSmall,
                    color = Color(0xFF71717A),
                    modifier = Modifier.padding(start = 4.dp)
                )

                Spacer(modifier = Modifier.height(12.dp))

                mockTracks.forEach { track ->
                    TrackRow(track = track)
                    Spacer(modifier = Modifier.height(8.dp))
                }

                Spacer(modifier = Modifier.height(8.dp))

                // ── AI Insight Card ──────────────────────────────────────
                GlassCard(modifier = Modifier.fillMaxWidth()) {
                    Row(
                        modifier = Modifier.padding(24.dp),
                        horizontalArrangement = Arrangement.spacedBy(16.dp)
                    ) {
                        Box(
                            modifier = Modifier
                                .size(40.dp)
                                .clip(RoundedCornerShape(12.dp))
                                .background(
                                    Brush.linearGradient(listOf(Primary, PrimaryContainer))
                                ),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(Icons.Default.AutoAwesome, contentDescription = null,
                                tint = Color.White, modifier = Modifier.size(20.dp))
                        }

                        Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                            Text(
                                "AI INSIGHT",
                                style = MaterialTheme.typography.labelSmall,
                                color = Primary
                            )
                            Text(
                                "Your listening shifted toward high-energy tracks after 10pm this week — a pattern linked to disrupted sleep. Consider a wind-down playlist.",
                                style = MaterialTheme.typography.bodySmall.copy(lineHeight = 20.sp),
                                color = Color(0xFFE4E4E7)
                            )
                            TextButton(
                                onClick = {},
                                contentPadding = PaddingValues(0.dp)
                            ) {
                                Row(
                                    verticalAlignment = Alignment.CenterVertically,
                                    horizontalArrangement = Arrangement.spacedBy(6.dp)
                                ) {
                                    Text(
                                        "Regenerate insight",
                                        style = MaterialTheme.typography.labelMedium.copy(letterSpacing = 0.sp),
                                        color = Secondary
                                    )
                                    Icon(Icons.Default.Refresh, contentDescription = null,
                                        tint = Secondary, modifier = Modifier.size(14.dp))
                                }
                            }
                        }
                    }
                }

                Spacer(modifier = Modifier.height(16.dp))
            }
        }
    }
}

@Composable
private fun ValenceChart(modifier: Modifier = Modifier) {
    Canvas(modifier = modifier) {
        val w = size.width; val h = size.height
        // Control points mimicking the mockup bezier
        val points = listOf(
            Offset(0f, h * 0.8f),
            Offset(w * 0.25f, h * 0.2f),
            Offset(w * 0.5f, h * 0.9f),
            Offset(w * 0.75f, h * 0.75f),
            Offset(w, h * 0.2f)
        )
        // Area fill
        val path = Path().apply {
            moveTo(points[0].x, points[0].y)
            cubicTo(w * 0.12f, h * 0.7f, w * 0.18f, h * 0.15f, points[1].x, points[1].y)
            cubicTo(w * 0.32f, h * 0.25f, w * 0.42f, h * 0.95f, points[2].x, points[2].y)
            cubicTo(w * 0.58f, h * 0.85f, w * 0.68f, h * 0.55f, points[3].x, points[3].y)
            cubicTo(w * 0.82f, h * 0.55f, w * 0.92f, h * 0.15f, points[4].x, points[4].y)
            lineTo(w, h); lineTo(0f, h); close()
        }
        drawPath(path, brush = Brush.verticalGradient(
            listOf(Color(0xFF7C3AED).copy(alpha = 0.2f), Color(0xFF7C3AED).copy(alpha = 0f))
        ))
        // Line
        val linePath = Path().apply {
            moveTo(points[0].x, points[0].y)
            cubicTo(w * 0.12f, h * 0.7f, w * 0.18f, h * 0.15f, points[1].x, points[1].y)
            cubicTo(w * 0.32f, h * 0.25f, w * 0.42f, h * 0.95f, points[2].x, points[2].y)
            cubicTo(w * 0.58f, h * 0.85f, w * 0.68f, h * 0.55f, points[3].x, points[3].y)
            cubicTo(w * 0.82f, h * 0.55f, w * 0.92f, h * 0.15f, points[4].x, points[4].y)
        }
        drawPath(linePath, brush = Brush.linearGradient(
            listOf(Color(0xFF4CD7F6), Color(0xFFD2BBFF), Color(0xFF4CD7F6), Color(0xFFFFB4AB))
        ), style = Stroke(width = 3.dp.toPx(), cap = StrokeCap.Round, join = StrokeJoin.Round))
        // Current point glow
        drawCircle(color = Color.White, radius = 4.dp.toPx(), center = points[4])
        drawCircle(color = Color.White.copy(alpha = 0.2f), radius = 10.dp.toPx(), center = points[4])
    }
}

@Composable
private fun MetricChip(label: String, value: String, valueColor: Color) {
    Surface(
        shape = RoundedCornerShape(8.dp),
        color = SurfaceContainerHighest.copy(alpha = 0.5f),
        border = BorderStroke(1.dp, OnSurface.copy(alpha = 0.05f))
    ) {
        Row(
            modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Text(label, style = MaterialTheme.typography.labelSmall, color = Color(0xFF71717A))
            Text(value, style = MaterialTheme.typography.labelMedium.copy(fontFamily = androidx.compose.ui.text.font.FontFamily.Monospace), color = valueColor)
        }
    }
}

@Composable
private fun TrackRow(track: TrackItem) {
    Surface(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(16.dp),
        color = SurfaceContainerLow.copy(alpha = 0.4f)
    ) {
        Row(
            modifier = Modifier.padding(12.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Row(horizontalArrangement = Arrangement.spacedBy(16.dp), verticalAlignment = Alignment.CenterVertically) {
                // Album art placeholder
                Box(
                    modifier = Modifier
                        .size(40.dp)
                        .clip(RoundedCornerShape(8.dp))
                        .background(
                            Brush.linearGradient(
                                listOf(track.accentColor.copy(alpha = 0.3f), PrimaryContainer.copy(alpha = 0.2f))
                            )
                        ),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(Icons.Default.MusicNote, contentDescription = null, tint = track.accentColor, modifier = Modifier.size(18.dp))
                }
                Column(verticalArrangement = Arrangement.spacedBy(2.dp)) {
                    Text(track.title, style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.SemiBold), color = OnSurface)
                    Text(track.artist, style = MaterialTheme.typography.labelSmall.copy(letterSpacing = 0.sp), color = Color(0xFF71717A))
                }
            }
            Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                // Mini waveform
                Row(horizontalArrangement = Arrangement.spacedBy(2.dp), verticalAlignment = Alignment.CenterVertically, modifier = Modifier.height(12.dp)) {
                    listOf(0.6f, 1f, 0.4f, 0.8f).forEach { h ->
                        Box(modifier = Modifier.width(2.dp).fillMaxHeight(h).clip(RoundedCornerShape(1.dp)).background(track.accentColor.copy(alpha = h)))
                    }
                }
                Surface(
                    shape = RoundedCornerShape(6.dp),
                    color = track.accentColor.copy(alpha = 0.1f),
                    border = BorderStroke(1.dp, track.accentColor.copy(alpha = 0.2f))
                ) {
                    Text(
                        "%.2f".format(track.valence),
                        style = MaterialTheme.typography.labelSmall.copy(fontFamily = androidx.compose.ui.text.font.FontFamily.Monospace),
                        color = track.accentColor,
                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                    )
                }
            }
        }
    }
}
