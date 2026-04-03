package com.cognia.app.ui.navigation

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.EditNote
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Psychology
import androidx.compose.material.icons.filled.SupportAgent
import androidx.compose.ui.graphics.vector.ImageVector

sealed class Screen(val route: String, val label: String, val icon: ImageVector) {
    data object Splash     : Screen("splash",     "Splash",     Icons.Default.Home)
    data object Home       : Screen("home",       "Home",       Icons.Default.Home)
    data object Mood       : Screen("mood",       "Mood",       Icons.Default.Psychology)
    data object Journal    : Screen("journal",    "Journal",    Icons.Default.EditNote)
    data object Counsellor : Screen("counsellor", "Counsellor", Icons.Default.SupportAgent)
    data object Profile    : Screen("profile",    "Profile",    Icons.Default.Person)
}

val bottomNavScreens = listOf(
    Screen.Home,
    Screen.Mood,
    Screen.Journal,
    Screen.Counsellor,
    Screen.Profile,
)
