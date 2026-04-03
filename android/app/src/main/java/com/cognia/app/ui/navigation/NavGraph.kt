package com.cognia.app.ui.navigation

import androidx.compose.animation.core.tween
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.cognia.app.ui.screens.counsellor.CounsellorScreen
import com.cognia.app.ui.screens.home.HomeScreen
import com.cognia.app.ui.screens.journal.JournalScreen
import com.cognia.app.ui.screens.moodcore.MoodCoreScreen
import com.cognia.app.ui.screens.profile.ProfileScreen
import com.cognia.app.ui.screens.splash.SplashScreen

@Composable
fun CogniaNavGraph(
    navController: NavHostController = rememberNavController()
) {
    NavHost(
        navController    = navController,
        startDestination = Screen.Splash.route,
        enterTransition  = { fadeIn(animationSpec = tween(300)) },
        exitTransition   = { fadeOut(animationSpec = tween(200)) }
    ) {
        composable(Screen.Splash.route) {
            SplashScreen(onGetStarted = {
                navController.navigate(Screen.Home.route) {
                    popUpTo(Screen.Splash.route) { inclusive = true }
                }
            })
        }
        composable(Screen.Home.route) {
            HomeScreen(navController = navController)
        }
        composable(Screen.Mood.route) {
            MoodCoreScreen(navController = navController)
        }
        composable(Screen.Journal.route) {
            JournalScreen(navController = navController)
        }
        composable(Screen.Counsellor.route) {
            CounsellorScreen(navController = navController)
        }
        composable(Screen.Profile.route) {
            ProfileScreen(navController = navController)
        }
    }
}
