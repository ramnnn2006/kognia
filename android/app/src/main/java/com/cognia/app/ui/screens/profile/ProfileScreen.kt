package com.cognia.app.ui.screens.profile

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
fun ProfileScreen(navController: NavController) {
    Scaffold(
        containerColor = Background,
        bottomBar = { CogniaBottomBar(navController) }
    ) { innerPadding ->
        Box(modifier = Modifier.fillMaxSize()) {
            Box(
                modifier = Modifier.size(500.dp).offset((-100).dp, (-100).dp).blur(120.dp)
                    .background(Primary.copy(alpha = 0.08f), CircleShape)
            )

            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .verticalScroll(rememberScrollState())
                    .padding(innerPadding)
                    .padding(horizontal = 24.dp)
            ) {
                Spacer(modifier = Modifier.height(16.dp))

                // ── Top Navigation ──────────────────────────────────────
                Row(
                    modifier = Modifier.fillMaxWidth().padding(vertical = 16.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                        Box(
                            modifier = Modifier.size(32.dp).clip(CircleShape).background(Brush.linearGradient(listOf(Primary, PrimaryContainer))),
                            contentAlignment = Alignment.Center
                        ) {
                            Text("YV", style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold), color = OnPrimary)
                        }
                        Text("COGNIA", style = MaterialTheme.typography.titleLarge.copy(fontWeight = FontWeight.Black), color = Primary)
                    }
                    Icon(Icons.Default.Notifications, null, tint = Primary)
                }

                // ── Profile Header ──────────────────────────────────────
                Row(
                    modifier = Modifier.fillMaxWidth().padding(vertical = 16.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Row(horizontalArrangement = Arrangement.spacedBy(20.dp), verticalAlignment = Alignment.CenterVertically) {
                        Box(
                            modifier = Modifier.size(64.dp).clip(CircleShape).background(Brush.linearGradient(listOf(Primary, PrimaryContainer))),
                            contentAlignment = Alignment.Center
                        ) {
                            Text("YV", style = MaterialTheme.typography.headlineMedium.copy(fontWeight = FontWeight.Bold), color = OnPrimary)
                        }
                        Column {
                            Text("Yeswanth", style = MaterialTheme.typography.headlineLarge, color = OnSurface)
                            Text("ROOM 204 · BLOCK B", style = MaterialTheme.typography.labelSmall, color = Color(0xFF71717A))
                        }
                    }
                    Box(
                        modifier = Modifier.size(40.dp).clip(RoundedCornerShape(12.dp)).background(SurfaceContainerHigh),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(Icons.Default.Settings, null, tint = Color(0xFF71717A))
                    }
                }

                Spacer(modifier = Modifier.height(24.dp))

                // ── Privacy Status Card ─────────────────────────────────
                GlassCard(modifier = Modifier.fillMaxWidth()) {
                    Column(modifier = Modifier.padding(24.dp)) {
                        Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                            Box(
                                modifier = Modifier.size(40.dp).clip(RoundedCornerShape(12.dp)).background(Secondary.copy(alpha = 0.1f)),
                                contentAlignment = Alignment.Center
                            ) {
                                Icon(Icons.Default.VerifiedUser, null, tint = Secondary)
                            }
                            Text("Your Data, Your Device", style = MaterialTheme.typography.titleMedium, color = OnSurface)
                        }

                        Spacer(modifier = Modifier.height(24.dp))

                        PrivacyBulletPoint("On-device ML processing", true)
                        PrivacyBulletPoint("Journal end-to-end encrypted", true)
                        PrivacyBulletPoint("Anonymized stress telemetry sync", true)

                        Spacer(modifier = Modifier.height(24.dp))
                        Divider(color = Color.White.copy(alpha = 0.05f))
                        Spacer(modifier = Modifier.height(24.dp))

                        Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            Box(modifier = Modifier.size(6.dp).background(Secondary, CircleShape))
                            Text("0 bytes of personal data on our servers", style = MaterialTheme.typography.labelSmall, color = Secondary)
                        }
                    }
                }

                Spacer(modifier = Modifier.height(24.dp))

                // ── Settings Grid ────────────────────────────────────────
                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(16.dp)) {
                    SettingTile(icon = Icons.Default.NotificationsActive, label = "NOTIFICATIONS", modifier = Modifier.weight(1f), iconColor = Primary)
                    SettingTile(icon = Icons.Default.Waves, label = "SPOTIFY", modifier = Modifier.weight(1f), iconColor = Secondary, isConnected = true)
                }

                Spacer(modifier = Modifier.height(16.dp))

                // Threshold Card
                Surface(modifier = Modifier.fillMaxWidth(), shape = RoundedCornerShape(12.dp), color = SurfaceContainerLow) {
                    Column(modifier = Modifier.padding(20.dp)) {
                        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
                            Text("STRESS THRESHOLD", style = MaterialTheme.typography.labelSmall, color = Color(0xFF71717A))
                            Text("70/100", style = MaterialTheme.typography.titleMedium, color = Primary)
                        }
                        Spacer(modifier = Modifier.height(16.dp))
                        LinearProgressIndicator(
                            progress = { 0.7f },
                            modifier = Modifier.fillMaxWidth().height(6.dp).clip(RoundedCornerShape(50)),
                            color = Primary,
                            trackColor = Color.White.copy(alpha = 0.05f)
                        )
                    }
                }

                Spacer(modifier = Modifier.height(16.dp))

                // Anonymous Mode
                Surface(modifier = Modifier.fillMaxWidth(), shape = RoundedCornerShape(12.dp), color = SurfaceContainerLow) {
                    Row(modifier = Modifier.padding(20.dp), verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(16.dp)) {
                        Icon(Icons.Default.VisibilityOff, null, tint = OnSurfaceVariant)
                        Column(modifier = Modifier.weight(1f)) {
                            Text("ANONYMOUS MODE", style = MaterialTheme.typography.labelSmall, color = Color(0xFF71717A))
                            Text("Hide profile from public", style = MaterialTheme.typography.bodySmall, color = Color(0xFF71717A))
                        }
                        Switch(checked = true, onCheckedChange = {}, colors = SwitchDefaults.colors(checkedThumbColor = Color.White, checkedTrackColor = Primary))
                    }
                }

                Spacer(modifier = Modifier.height(24.dp))

                // ── Danger Zone ──────────────────────────────────────────
                OutlinedButton(
                    onClick = {},
                    modifier = Modifier.fillMaxWidth().height(56.dp),
                    shape = RoundedCornerShape(12.dp),
                    border = BorderStroke(1.dp, Error.copy(alpha = 0.3f)),
                    colors = ButtonDefaults.outlinedButtonColors(contentColor = Error)
                ) {
                    Icon(Icons.Default.DeleteForever, null, modifier = Modifier.size(18.dp))
                    Spacer(modifier = Modifier.width(8.dp))
                    Text("DELETE ALL LOCAL DATA", style = MaterialTheme.typography.labelLarge)
                }

                Spacer(modifier = Modifier.height(12.dp))
                Text(
                    "Performing this action will permanently remove all biometric history from this device. This cannot be undone.",
                    style = MaterialTheme.typography.labelSmall, color = Color(0xFF52525B), textAlign = androidx.compose.ui.text.style.TextAlign.Center,
                    modifier = Modifier.padding(horizontal = 24.dp)
                )

                Spacer(modifier = Modifier.height(32.dp))
            }
        }
    }
}

@Composable
private fun PrivacyBulletPoint(label: String, isProtected: Boolean) {
    Row(modifier = Modifier.fillMaxWidth().padding(bottom = 12.dp), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
        Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            Icon(Icons.Default.CheckCircle, null, tint = Secondary, modifier = Modifier.size(20.dp))
            Text(label, style = MaterialTheme.typography.bodyMedium, color = OnSurfaceVariant)
        }
        if (isProtected) {
            Text("SECURE", style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold), color = Secondary)
        }
    }
}

@Composable
private fun SettingTile(icon: androidx.compose.ui.graphics.vector.ImageVector, label: String, modifier: Modifier = Modifier, iconColor: Color, isConnected: Boolean = false) {
    Surface(modifier = modifier, shape = RoundedCornerShape(12.dp), color = SurfaceContainerLow) {
        Column(modifier = Modifier.padding(20.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                Icon(icon, null, tint = iconColor)
                if (isConnected) {
                    Text("CONNECTED", style = MaterialTheme.typography.labelSmall.copy(fontSize = 9.sp), color = Secondary)
                }
            }
            Text(label, style = MaterialTheme.typography.labelSmall, color = Color(0xFF71717A))
        }
    }
}
