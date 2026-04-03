package com.cognia.app.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

private val CogniaDarkColorScheme = darkColorScheme(
    primary          = Primary,
    onPrimary        = OnPrimary,
    primaryContainer = PrimaryContainer,
    onPrimaryContainer = OnPrimaryContainer,
    secondary        = Secondary,
    onSecondary      = OnSecondary,
    secondaryContainer = SecondaryContainer,
    onSecondaryContainer = OnSecondaryContainer,
    tertiary         = Tertiary,
    onTertiary       = OnTertiary,
    tertiaryContainer = TertiaryContainer,
    onTertiaryContainer = OnTertiaryContainer,
    error            = Error,
    onError          = OnError,
    errorContainer   = ErrorContainer,
    onErrorContainer = OnErrorContainer,
    background       = Background,
    onBackground     = OnBackground,
    surface          = Surface,
    onSurface        = OnSurface,
    onSurfaceVariant = OnSurfaceVariant,
    outline          = Outline,
    outlineVariant   = OutlineVariant,
    surfaceVariant   = SurfaceContainerHighest,
    inverseSurface   = Color(0xFFE5E2E1),
    inverseOnSurface = Color(0xFF313030),
    inversePrimary   = Color(0xFF732EE4),
)

@Composable
fun CogniaTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = CogniaDarkColorScheme,
        typography  = CogniaTypography,
        content     = content
    )
}
