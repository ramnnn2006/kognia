package com.cognia.app.ui.screens.journal

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
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.cognia.app.ui.components.CogniaBottomBar
import com.cognia.app.ui.screens.home.GlassCard
import com.cognia.app.ui.theme.*

@Composable
fun JournalScreen(navController: NavController) {
    var journalText by remember { mutableStateOf("") }

    Scaffold(
        containerColor = Background,
        bottomBar = { CogniaBottomBar(navController) }
    ) { innerPadding ->
        Box(modifier = Modifier.fillMaxSize()) {
            Box(
                modifier = Modifier.size(400.dp).offset((-100).dp, (-100).dp).blur(120.dp)
                    .background(Primary.copy(alpha = 0.08f), CircleShape)
            )

            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .verticalScroll(rememberScrollState())
                    .padding(innerPadding)
                    .padding(horizontal = 20.dp)
            ) {
                Spacer(modifier = Modifier.height(16.dp))

                // ── Top Navigation ──────────────────────────────────────
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
                            "SANCTUARY",
                            style = MaterialTheme.typography.titleLarge.copy(fontWeight = FontWeight.Black),
                            color = Primary
                        )
                    }
                    Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
                        Icon(Icons.Default.Lock, contentDescription = null, tint = Color(0xFF71717A), modifier = Modifier.size(20.dp))
                        Icon(Icons.Default.Search, contentDescription = null, tint = Color(0xFF71717A), modifier = Modifier.size(20.dp))
                    }
                }

                Spacer(modifier = Modifier.height(20.dp))

                // ── Date Strip (Horizontal) ─────────────────────────────
                Row(
                    modifier = Modifier.fillMaxWidth().horizontalScroll(rememberScrollState()),
                    horizontalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    repeat(7) { index ->
                        val isToday = index == 3
                        DateItem(day = (31 + index).toString(), name = listOf("Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun")[index], isToday = isToday)
                    }
                }

                Spacer(modifier = Modifier.height(24.dp))

                // ── Journal Entry Card ──────────────────────────────────
                GlassCard(modifier = Modifier.fillMaxWidth()) {
                    Column(modifier = Modifier.padding(24.dp)) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.Top
                        ) {
                            Column {
                                Text("ENTERING FLOW", style = MaterialTheme.typography.labelSmall, color = Primary)
                                Text("Thursday, 3 Apr", style = MaterialTheme.typography.headlineMedium.copy(fontWeight = FontWeight.Bold), color = OnSurface)
                            }
                            Box(
                                modifier = Modifier.size(40.dp).clip(CircleShape).background(SurfaceContainerHighest),
                                contentAlignment = Alignment.Center
                            ) {
                                Icon(Icons.Default.SentimentNeutral, contentDescription = null, tint = Color(0xFFA1A1AA))
                            }
                        }

                        Spacer(modifier = Modifier.height(24.dp))

                        // Large Text Area
                        TextField(
                            value = journalText,
                            onValueChange = { journalText = it },
                            placeholder = { Text("How are you feeling right now? Your words stay local. Always.", style = MaterialTheme.typography.bodyLarge.copy(fontStyle = androidx.compose.ui.text.font.FontStyle.Italic), color = Color(0xFF52525B)) },
                            modifier = Modifier.fillMaxWidth().heightIn(min = 280.dp),
                            colors = TextFieldDefaults.colors(
                                focusedContainerColor = Color.Transparent,
                                unfocusedContainerColor = Color.Transparent,
                                focusedIndicatorColor = Color.Transparent,
                                unfocusedIndicatorColor = Color.Transparent,
                                cursorColor = Primary
                            ),
                            textStyle = MaterialTheme.typography.bodyLarge.copy(lineHeight = 28.sp, color = OnSurface)
                        )

                        Spacer(modifier = Modifier.height(24.dp))

                        // Sentiment Chips
                        Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                            Row(modifier = Modifier.fillMaxWidth().horizontalScroll(rememberScrollState()), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                                SentimentChip(label = "Anxious (0.6)", color = Error)
                                SentimentChip(label = "Academic stress", color = Tertiary)
                                SentimentChip(label = "Social isolation", color = Secondary)
                            }
                            Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                                Icon(Icons.Default.Security, contentDescription = null, tint = Primary.copy(alpha = 0.4f), modifier = Modifier.size(12.dp))
                                Text("Analyzed on-device · Never transmitted", style = MaterialTheme.typography.labelSmall, color = Primary.copy(alpha = 0.4f))
                            }
                        }

                        Spacer(modifier = Modifier.height(24.dp))

                        // Action Bar
                        Divider(color = Color.White.copy(alpha = 0.05f))
                        Row(
                            modifier = Modifier.fillMaxWidth().padding(top = 16.dp),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
                                Icon(Icons.Default.Mic, null, tint = Color(0xFF71717A))
                                Icon(Icons.Default.FormatBold, null, tint = Color(0xFF71717A))
                                Icon(Icons.Default.Sell, null, tint = Color(0xFF71717A))
                            }
                            Button(
                                onClick = {},
                                colors = ButtonDefaults.buttonColors(containerColor = Color.Transparent),
                                shape = RoundedCornerShape(20.dp),
                                contentPadding = PaddingValues(0.dp)
                            ) {
                                Box(
                                    modifier = Modifier
                                        .background(Brush.linearGradient(listOf(Primary, PrimaryContainer)), RoundedCornerShape(20.dp))
                                        .padding(horizontal = 24.dp, vertical = 10.dp),
                                    contentAlignment = Alignment.Center
                                ) {
                                    Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                                        Text("SAVE", style = MaterialTheme.typography.labelLarge, color = OnPrimaryContainer)
                                        Icon(Icons.Default.Check, null, tint = OnPrimaryContainer, modifier = Modifier.size(16.dp))
                                    }
                                }
                            }
                        }
                    }
                }

                Spacer(modifier = Modifier.height(24.dp))

                // ── Past Entries Timeline ───────────────────────────────
                Text("TIMELINE", style = MaterialTheme.typography.labelSmall, color = Color(0xFF71717A), modifier = Modifier.padding(start = 4.dp))
                Spacer(modifier = Modifier.height(16.dp))
                TimelineItem(date = "2 Apr", time = "Midday", content = "Studying for the exams feels overwhelming...", color = Secondary)
                TimelineItem(date = "1 Apr", time = "Late Night", content = "Finally talked to the student advisor about...", color = Primary)

                Spacer(modifier = Modifier.height(16.dp))
            }
        }
    }
}

@Composable
private fun DateItem(day: String, name: String, isToday: Boolean) {
    Surface(
        shape = RoundedCornerShape(25.dp),
        color = if (isToday) PrimaryContainer.copy(alpha = 0.2f) else Color.Transparent,
        border = if (isToday) BorderStroke(1.dp, Primary.copy(alpha = 0.2f)) else null
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            modifier = Modifier.padding(horizontal = 12.dp, vertical = 8.dp)
        ) {
            Text(name.uppercase(), style = MaterialTheme.typography.labelSmall, color = if (isToday) Primary else Color(0xFF71717A))
            Spacer(modifier = Modifier.height(4.dp))
            Text(day, style = MaterialTheme.typography.titleMedium.copy(fontWeight = if (isToday) FontWeight.ExtraBold else FontWeight.SemiBold), color = if (isToday) OnBackground else Color(0xFF71717A))
            Spacer(modifier = Modifier.height(4.dp))
            Box(modifier = Modifier.size(6.dp).background(if (isToday) Primary else Color(0xFF3F3F46), CircleShape))
        }
    }
}

@Composable
private fun SentimentChip(label: String, color: Color) {
    Surface(
        shape = RoundedCornerShape(16.dp),
        color = color.copy(alpha = 0.1f),
        border = BorderStroke(1.dp, color.copy(alpha = 0.2f))
    ) {
        Row(
            modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Box(modifier = Modifier.size(4.dp).background(color, CircleShape))
            Text(label.uppercase(), style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold), color = color)
        }
    }
}

@Composable
private fun TimelineItem(date: String, time: String, content: String, color: Color) {
    Box(
        modifier = Modifier.fillMaxWidth().padding(bottom = 12.dp).clip(RoundedCornerShape(12.dp))
            .background(SurfaceContainerLow).clickable { }
    ) {
        Row(modifier = Modifier.fillMaxWidth()) {
            Box(modifier = Modifier.fillMaxHeight().width(4.dp).background(color).align(Alignment.CenterVertically))
            Column(modifier = Modifier.padding(16.dp).weight(1f)) {
                Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    Text(date, style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold), color = Color(0xFF71717A))
                    Text("·", color = Color(0xFF3F3F46))
                    Text(time.uppercase(), style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold), color = Color(0xFFA1A1AA))
                }
                Spacer(modifier = Modifier.height(4.dp))
                Text(content, style = MaterialTheme.typography.bodySmall, color = Color(0xFFD4D4D8), maxLines = 1)
            }
            Icon(Icons.Default.SentimentSatisfied, null, tint = color, modifier = Modifier.padding(16.dp).align(Alignment.CenterVertically))
        }
    }
}
