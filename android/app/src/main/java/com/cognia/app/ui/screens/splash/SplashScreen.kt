package com.cognia.app.ui.screens.splash

import androidx.compose.animation.core.*
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowForward
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.blur
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.cognia.app.ui.theme.*

@Composable
fun SplashScreen(onGetStarted: () -> Unit) {
    // Staggered neural ring animations
    val infiniteTransition = rememberInfiniteTransition(label = "neural")
    val ring1Scale by infiniteTransition.animateFloat(
        initialValue = 0.8f, targetValue = 1.4f,
        animationSpec = infiniteRepeatable(
            animation = tween(4000, easing = CubicBezierEasing(0.4f, 0f, 0.2f, 1f)),
            repeatMode = RepeatMode.Restart
        ), label = "ring1"
    )
    val ring1Alpha by infiniteTransition.animateFloat(
        initialValue = 0f, targetValue = 0f,
        animationSpec = infiniteRepeatable(
            animation = keyframes {
                durationMillis = 4000
                0f at 0; 0.5f at 2000; 0f at 4000
            }, repeatMode = RepeatMode.Restart
        ), label = "ring1a"
    )
    val ring2Scale by infiniteTransition.animateFloat(
        initialValue = 0.8f, targetValue = 1.4f,
        animationSpec = infiniteRepeatable(
            animation = tween(4000, delayMillis = 1333, easing = CubicBezierEasing(0.4f, 0f, 0.2f, 1f)),
            repeatMode = RepeatMode.Restart
        ), label = "ring2"
    )
    val ring2Alpha by infiniteTransition.animateFloat(
        initialValue = 0f, targetValue = 0f,
        animationSpec = infiniteRepeatable(
            animation = keyframes {
                durationMillis = 4000; durationMillis = 5333
                0f at 0; 0f at 1333; 0.4f at 3333; 0f at 5333
            }, repeatMode = RepeatMode.Restart
        ), label = "ring2a"
    )
    val ring3Scale by infiniteTransition.animateFloat(
        initialValue = 0.8f, targetValue = 1.4f,
        animationSpec = infiniteRepeatable(
            animation = tween(4000, delayMillis = 2666, easing = CubicBezierEasing(0.4f, 0f, 0.2f, 1f)),
            repeatMode = RepeatMode.Restart
        ), label = "ring3"
    )

    // Ambient appear animation
    var appeared by remember { mutableStateOf(false) }
    val contentAlpha by animateFloatAsState(
        targetValue = if (appeared) 1f else 0f,
        animationSpec = tween(1200, easing = FastOutSlowInEasing),
        label = "contentAlpha"
    )
    LaunchedEffect(Unit) { appeared = true }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Background),
        contentAlignment = Alignment.Center
    ) {
        // Ambient orbs
        Box(
            modifier = Modifier
                .size(400.dp)
                .offset(x = (-100).dp, y = (-100).dp)
                .blur(120.dp)
                .background(PrimaryContainer.copy(alpha = 0.08f), CircleShape)
                .alpha(contentAlpha)
        )
        Box(
            modifier = Modifier
                .size(400.dp)
                .align(Alignment.BottomEnd)
                .offset(x = 100.dp, y = 100.dp)
                .blur(120.dp)
                .background(Secondary.copy(alpha = 0.08f), CircleShape)
                .alpha(contentAlpha)
        )

        Column(
            modifier = Modifier
                .fillMaxSize()
                .alpha(contentAlpha)
                .padding(horizontal = 32.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.SpaceBetween
        ) {
            Spacer(modifier = Modifier.weight(1f))

            // Wordmark
            Text(
                text = "COGNIA",
                style = MaterialTheme.typography.displayMedium.copy(
                    fontWeight = FontWeight.Light,
                    letterSpacing = 12.sp
                ),
                color = OnSurface
            )

            Spacer(modifier = Modifier.height(64.dp))

            // Neural ring visualization
            Box(
                modifier = Modifier.size(240.dp),
                contentAlignment = Alignment.Center
            ) {
                // Ring 3 — outer white
                Box(
                    modifier = Modifier
                        .fillMaxSize()
                        .scale(ring3Scale)
                        .alpha(0.15f)
                        .background(Color.Transparent)
                ) {
                    Surface(
                        modifier = Modifier.fillMaxSize(),
                        shape = CircleShape,
                        color = Color.Transparent,
                        border = BorderStroke(1.dp, OnSurface.copy(alpha = 0.6f))
                    ) {}
                }
                // Ring 2 — middle cyan
                Box(
                    modifier = Modifier
                        .fillMaxSize(0.75f)
                        .scale(ring2Scale)
                        .alpha(0.25f)
                ) {
                    Surface(
                        modifier = Modifier.fillMaxSize(),
                        shape = CircleShape,
                        color = Color.Transparent,
                        border = BorderStroke(1.dp, Secondary.copy(alpha = 0.6f))
                    ) {}
                }
                // Ring 1 — inner violet
                Box(
                    modifier = Modifier
                        .fillMaxSize(0.5f)
                        .scale(ring1Scale)
                        .alpha(0.15f)
                ) {
                    Surface(
                        modifier = Modifier.fillMaxSize(),
                        shape = CircleShape,
                        color = Color.Transparent,
                        border = BorderStroke(1.dp, Primary.copy(alpha = 0.4f))
                    ) {}
                }
                // Neural core dot
                Box(
                    modifier = Modifier
                        .size(8.dp)
                        .background(OnSurface, CircleShape)
                )
            }

            Spacer(modifier = Modifier.height(48.dp))

            // Tagline
            Text(
                text = "Your mind has a pattern.",
                style = MaterialTheme.typography.bodyMedium,
                color = OnSurfaceVariant.copy(alpha = 0.8f),
                textAlign = TextAlign.Center,
                letterSpacing = 0.5.sp
            )

            Spacer(modifier = Modifier.weight(1f))

            // CTA button
            OutlinedButton(
                onClick = onGetStarted,
                modifier = Modifier
                    .fillMaxWidth()
                    .height(64.dp),
                shape = RoundedCornerShape(20.dp),
                border = BorderStroke(1.dp, OutlineVariant),
                colors = ButtonDefaults.outlinedButtonColors(
                    contentColor = OnSurface
                )
            ) {
                Text(
                    text = "Get Started",
                    style = MaterialTheme.typography.titleMedium,
                    letterSpacing = 0.5.sp
                )
                Spacer(modifier = Modifier.width(12.dp))
                Icon(
                    imageVector = Icons.AutoMirrored.Filled.ArrowForward,
                    contentDescription = null,
                    tint = Primary,
                    modifier = Modifier.size(18.dp)
                )
            }

            Spacer(modifier = Modifier.height(32.dp))

            // Step dots
            Row(
                horizontalArrangement = Arrangement.spacedBy(6.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Box(modifier = Modifier.size(6.dp).background(Primary, CircleShape))
                Box(modifier = Modifier.size(6.dp).background(SurfaceContainerHighest, CircleShape))
                Box(modifier = Modifier.size(6.dp).background(SurfaceContainerHighest, CircleShape))
            }

            Spacer(modifier = Modifier.height(48.dp))
        }
    }
}
