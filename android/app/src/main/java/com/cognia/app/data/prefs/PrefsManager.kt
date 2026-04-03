package com.cognia.app.data.prefs

import android.content.Context
import android.content.SharedPreferences
import java.security.MessageDigest

/**
 * Manages the student's identity and metadata locally.
 */
class PrefsManager(context: Context) {
    private val prefs: SharedPreferences = context.getSharedPreferences("cognia_prefs", Context.MODE_PRIVATE)

    fun saveIdentity(regNo: String, block: String, room: Int) {
        prefs.edit().apply {
            putString("reg_no", regNo)
            putString("block", block)
            putInt("room", room)
            apply()
        }
    }

    fun getStudentHash(salt: String): String {
        val regNo = prefs.getString("reg_no", "") ?: ""
        return hashString(regNo + salt)
    }

    fun getBlock(): String = prefs.getString("block", "B") ?: "B"
    fun getRoom(): Int = prefs.getInt("room", 204)

    private fun hashString(input: String): String {
        return MessageDigest.getInstance("SHA-256")
            .digest(input.toByteArray())
            .joinToString("") { "%02x".format(it) }
    }
}
