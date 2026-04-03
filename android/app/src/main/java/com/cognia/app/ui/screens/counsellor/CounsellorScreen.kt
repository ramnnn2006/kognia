package com.cognia.app.ui.screens.counsellor

import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.automirrored.filled.ArrowForward
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
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.withStyle
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.cognia.app.ui.components.CogniaBottomBar
import com.cognia.app.ui.navigation.Screen
import com.cognia.app.ui.screens.home.GlassCard
import com.cognia.app.ui.theme.*

@Composable
fun CounsellorScreen(navController: NavController) {
    Scaffold(
        containerColor = Background,
        bottomBar = { CogniaBottomBar(navController) }
    ) { innerPadding ->
        Box(modifier = Modifier.fillMaxSize()) {
            Box(
                modifier = Modifier.size(500.dp).offset((-100).dp, (-100).dp).blur(120.dp)
                    .background(Primary.copy(alpha = 0.1f), CircleShape)
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
                            "COGNIA",
                            style = MaterialTheme.typography.titleLarge.copy(fontWeight = FontWeight.Black),
                            color = Primary
                        )
                    }
                    Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
                        Surface(
                            shape = CircleShape,
                            color = Tertiary.copy(alpha = 0.1f),
                            border = BorderStroke(1.dp, Tertiary.copy(alpha = 0.2f))
                        ) {
                            Row(
                                modifier = Modifier.padding(horizontal = 12.dp, vertical = 4.dp),
                                verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.spacedBy(6.dp)
                            ) {
                                Box(modifier = Modifier.size(6.dp).background(Tertiary, CircleShape))
                                Text("MODERATE", style = MaterialTheme.typography.labelSmall, color = Tertiary)
                            }
                        }
                        Icon(Icons.Default.Notifications, null, tint = Primary)
                    }
                }

                Spacer(modifier = Modifier.height(24.dp))

                // ── Auto-Schedule Banner ────────────────────────────────
                GlassCard(modifier = Modifier.fillMaxWidth().border(1.dp, Tertiary.copy(alpha = 0.2f), RoundedCornerShape(20.dp))) {
                    Row(modifier = Modifier.padding(20.dp), horizontalArrangement = Arrangement.spacedBy(16.dp)) {
                        Box(
                            modifier = Modifier.size(40.dp).clip(RoundedCornerShape(12.dp)).background(Tertiary.copy(alpha = 0.2f)),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(imageVector = Icons.Default.EventNote, contentDescription = null, tint = Tertiary)
                        }
                        Column(modifier = Modifier.weight(1f)) {
                            Text(
                                "Your stress index is elevated. We've held a slot for you — confirm or dismiss.",
                                style = MaterialTheme.typography.bodySmall,
                                color = OnBackground
                            )
                            Spacer(modifier = Modifier.height(16.dp))
                            Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
                                Button(
                                    onClick = {},
                                    colors = ButtonDefaults.buttonColors(containerColor = Primary),
                                    shape = RoundedCornerShape(50),
                                    modifier = Modifier.height(32.dp),
                                    contentPadding = PaddingValues(horizontal = 24.dp)
                                ) {
                                    Text("CONFIRM", style = MaterialTheme.typography.labelSmall, color = OnPrimary)
                                }
                                TextButton(onClick = {}) {
                                    Text("DISMISS", style = MaterialTheme.typography.labelSmall, color = Color(0xFF71717A))
                                }
                            }
                        }
                    }
                }

                Spacer(modifier = Modifier.height(24.dp))

                // ── Page Header ──────────────────────────────────────────
                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
                    Text("Counselling", style = MaterialTheme.typography.headlineLarge, color = OnBackground)
                    Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                        Icon(Icons.Default.CalendarMonth, null, tint = Color(0xFF71717A), modifier = Modifier.size(16.dp))
                        Text("OCT 2023", style = MaterialTheme.typography.labelSmall, color = Color(0xFF71717A))
                    }
                }

                Spacer(modifier = Modifier.height(24.dp))

                // ── Week Calendar ───────────────────────────────────────
                Surface(
                    shape = RoundedCornerShape(20.dp),
                    color = SurfaceContainerLow,
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Row(modifier = Modifier.padding(8.dp).fillMaxWidth(), horizontalArrangement = Arrangement.SpaceAround) {
                        listOf("Mon" to 23, "Tue" to 24, "Wed" to 25, "Thu" to 26, "Fri" to 27).forEach { (day, date) ->
                            val isSelected = date == 25
                            Column(
                                horizontalAlignment = Alignment.CenterHorizontally,
                                modifier = Modifier
                                    .clip(RoundedCornerShape(12.dp))
                                    .background(if (isSelected) Primary.copy(alpha = 0.1f) else Color.Transparent)
                                    .border(1.dp, if (isSelected) Primary.copy(alpha = 0.3f) else Color.Transparent, RoundedCornerShape(12.dp))
                                    .padding(vertical = 12.dp, horizontal = 16.dp)
                            ) {
                                Text(day.uppercase(), style = MaterialTheme.typography.labelSmall, color = if (isSelected) Primary else Color(0xFF71717A))
                                Text(date.toString(), style = MaterialTheme.typography.titleLarge, color = if (isSelected) Primary else OnBackground)
                            }
                        }
                    }
                }

                Spacer(modifier = Modifier.height(24.dp))

                // ── Time Slots Grid ─────────────────────────────────────
                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                    TimeSlot(time = "09:00 AM", status = "Available", isSelected = false, color = Primary, modifier = Modifier.weight(1f))
                    TimeSlot(time = "10:30 AM", status = "Taken", isSelected = false, color = Error, modifier = Modifier.weight(1f), isEnabled = false)
                }
                Spacer(modifier = Modifier.height(12.dp))
                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                    TimeSlot(time = "02:00 PM", status = "Selected", isSelected = true, color = Primary, modifier = Modifier.weight(1f))
                    TimeSlot(time = "04:30 PM", status = "Available", isSelected = false, color = Primary, modifier = Modifier.weight(1f))
                }

                Spacer(modifier = Modifier.height(24.dp))

                // ── Selected Slot Card ──────────────────────────────────
                GlassCard(modifier = Modifier.fillMaxWidth()) {
                    Column(modifier = Modifier.padding(24.dp)) {
                        Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(16.dp)) {
                            Box(
                                modifier = Modifier.size(56.dp).clip(CircleShape).border(1.dp, Primary.copy(alpha = 0.4f), CircleShape)
                            ) {
                                Icon(Icons.Default.Person, null, modifier = Modifier.fillMaxSize(), tint = Primary)
                            }
                            Column {
                                Text("Dr. Priya R.", style = MaterialTheme.typography.titleLarge, color = OnBackground)
                                Text("CLINICAL PSYCHOLOGIST", style = MaterialTheme.typography.labelSmall, color = Color(0xFF71717A))
                            }
                            Spacer(modifier = Modifier.weight(1f))
                            Icon(Icons.Default.Verified, null, tint = Primary)
                        }

                        Spacer(modifier = Modifier.height(24.dp))

                        Text(
                            text = buildAnnotatedString {
                                append("WED, 25 OCT ")
                                withStyle(style = SpanStyle(color = Primary)) { append("02:00") }
                            },
                            style = MaterialTheme.typography.displayMedium,
                            color = OnBackground
                        )

                        Spacer(modifier = Modifier.height(24.dp))

                        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            Surface(shape = RoundedCornerShape(50), color = SurfaceContainerHighest, border = BorderStroke(1.dp, Primary.copy(alpha = 0.3f))) {
                                Row(modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp), verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                                    Icon(Icons.Default.Person, null, modifier = Modifier.size(16.dp), tint = Primary)
                                    Text("IN-PERSON", style = MaterialTheme.typography.labelSmall, color = OnBackground)
                                }
                            }
                            Surface(shape = RoundedCornerShape(50), color = SurfaceContainerHigh, modifier = Modifier.alpha(0.6f)) {
                                Row(modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp), verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                                    Icon(Icons.Default.Videocam, null, modifier = Modifier.size(16.dp), tint = Color(0xFF71717A))
                                    Text("ONLINE", style = MaterialTheme.typography.labelSmall, color = Color(0xFF71717A))
                                }
                            }
                        }

                        Spacer(modifier = Modifier.height(24.dp))

                        Text("ANONYMOUS NOTE (OPTIONAL)", style = MaterialTheme.typography.labelSmall, color = Color(0xFF71717A))
                        TextField(
                            value = "",
                            onValueChange = {},
                            placeholder = { Text("Tell us what's on your mind...", color = Color(0xFF3F3F46), style = MaterialTheme.typography.bodySmall) },
                            modifier = Modifier.fillMaxWidth(),
                            colors = TextFieldDefaults.colors(
                                focusedContainerColor = Color.Transparent,
                                unfocusedContainerColor = Color.Transparent,
                                focusedIndicatorColor = Primary,
                                unfocusedIndicatorColor = Color.White.copy(alpha = 0.1f)
                            )
                        )

                        Spacer(modifier = Modifier.height(32.dp))

                        Button(
                            onClick = {},
                            modifier = Modifier.fillMaxWidth().height(56.dp),
                            shape = RoundedCornerShape(20.dp),
                            colors = ButtonDefaults.buttonColors(containerColor = PrimaryContainer)
                        ) {
                            Text("CONFIRM BOOKING", style = MaterialTheme.typography.labelLarge, color = OnPrimaryContainer)
                            Spacer(modifier = Modifier.width(12.dp))
                            Icon(Icons.AutoMirrored.Filled.ArrowForward, null, modifier = Modifier.size(18.dp))
                        }
                    }
                }
                Spacer(modifier = Modifier.height(16.dp))
            }
        }
    }
}

@Composable
private fun TimeSlot(time: String, status: String, isSelected: Boolean, color: Color, modifier: Modifier = Modifier, isEnabled: Boolean = true) {
    Surface(
        modifier = modifier.alpha(if (isEnabled) 1f else 0.6f),
        shape = RoundedCornerShape(12.dp),
        color = if (isSelected) Primary else Color.Transparent,
        border = if (isSelected) null else BorderStroke(1.dp, color.copy(alpha = 0.3f))
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(time, style = MaterialTheme.typography.labelSmall, color = if (isSelected) OnPrimary.copy(alpha = 0.7f) else color)
            Text(status, style = MaterialTheme.typography.titleMedium, color = if (isSelected) OnPrimary else OnBackground)
        }
    }
}
