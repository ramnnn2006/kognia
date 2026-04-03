package com.cognia.app.ui.screens.login

import android.graphics.BitmapFactory
import android.util.Base64
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.asImageBitmap
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlinx.coroutines.launch
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import org.json.JSONObject

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun VtopLoginScreen(onLoginSuccess: (JSONObject) -> Unit) {
    var uname by remember { mutableStateOf("") }
    var passwd by remember { mutableStateOf("") }
    var captchaInput by remember { mutableStateOf("") }
    var captchaB64 by remember { mutableStateOf("") }
    var csrfToken by remember { mutableStateOf("") }
    var cookies by remember { mutableStateOf<JSONObject?>(null) }
    var loading by remember { mutableStateOf(false) }
    var error by remember { mutableStateOf("") }
    
    val scope = rememberCoroutineScope()
    val client = remember { OkHttpClient() }

    // Fetch Captcha on mount
    LaunchedEffect(Unit) {
        scope.launch {
            try {
                val request = Request.Builder().url("http://10.0.2.2:8000/api/v1/auth/vtop/captcha").build()
                val response = client.newCall(request).execute()
                val json = JSONObject(response.body!!.string())
                captchaB64 = json.getString("captcha")
                csrfToken = json.getString("csrf_token")
                cookies = json.getJSONObject("cookies")
            } catch (e: Exception) {
                error = "VTOP Offline"
            }
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFF050505))
            .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text("Cognia Auth", fontSize = 32.sp, fontWeight = FontWeight.Bold, color = Color.White)
        Text("VTOP SECURE HANDSHAKE", fontSize = 10.sp, letterSpacing = 4.sp, color = Color.White.copy(0.4f), modifier = Modifier.padding(bottom = 48.dp))

        OutlinedTextField(
            value = uname,
            onValueChange = { uname = it },
            label = { Text("REGISTRATION NUMBER") },
            placeholder = { Text("21BCEXXXX") },
            modifier = Modifier.fillMaxWidth().padding(bottom = 16.dp),
            shape = RoundedCornerShape(16.dp),
            colors = TextFieldDefaults.outlinedTextFieldColors(focusedTextColor = Color.White, unfocusedTextColor = Color.White, focusedBorderColor = Color(0xFF7C3AED))
        )

        OutlinedTextField(
            value = passwd,
            onValueChange = { passwd = it },
            label = { Text("PASSWORD") },
            visualTransformation = PasswordVisualTransformation(),
            modifier = Modifier.fillMaxWidth().padding(bottom = 16.dp),
            shape = RoundedCornerShape(16.dp),
            colors = TextFieldDefaults.outlinedTextFieldColors(focusedTextColor = Color.White, unfocusedTextColor = Color.White, focusedBorderColor = Color(0xFF7C3AED))
        )

        Row(modifier = Modifier.fillMaxWidth().padding(bottom = 24.dp), verticalAlignment = Alignment.CenterVertically) {
            OutlinedTextField(
                value = captchaInput,
                onValueChange = { captchaInput = it },
                label = { Text("CAPTCHA") },
                modifier = Modifier.weight(1f),
                shape = RoundedCornerShape(16.dp),
                colors = TextFieldDefaults.outlinedTextFieldColors(focusedTextColor = Color.White, unfocusedTextColor = Color.White)
            )
            
            Spacer(Modifier.width(16.dp))

            // Captcha Image Box
            Box(
                modifier = Modifier
                    .size(width = 120.dp, height = 56.dp)
                    .clip(RoundedCornerShape(12.dp))
                    .background(Color.White)
                    .clickable { 
                        // Refresh Logic here
                    }
            ) {
                if (captchaB64.isNotEmpty()) {
                    val bytes = Base64.decode(captchaB64, Base64.DEFAULT)
                    val bitmap = BitmapFactory.decodeByteArray(bytes, 0, bytes.size)
                    Image(
                        bitmap = bitmap.asImageBitmap(),
                        contentDescription = "Captcha",
                        modifier = Modifier.fillMaxSize().padding(4.dp),
                        contentScale = ContentScale.Fit
                    )
                } else {
                    CircularProgressIndicator(modifier = Modifier.size(24.dp).align(Alignment.Center), color = Color.Black)
                }
            }
        }

        if (error.isNotEmpty()) {
            Text(error, color = Color.Red, fontSize = 12.sp, modifier = Modifier.padding(bottom = 16.dp))
        }

        Button(
            onClick = {
                loading = true
                scope.launch {
                    try {
                        val body = JSONObject()
                        body.put("uname", uname)
                        body.put("passwd", passwd)
                        body.put("captcha", captchaInput)
                        body.put("csrf_token", csrfToken)
                        body.put("cookies", cookies)
                        
                        val request = Request.Builder()
                            .url("http://10.0.2.2:8000/api/v1/auth/vtop/login")
                            .post(body.toString().toRequestBody("application/json".toMediaType()))
                            .build()
                        
                        val response = client.newCall(request).execute()
                        if (response.isSuccessful) {
                            onLoginSuccess(JSONObject(response.body!!.string()))
                        } else {
                            error = "Invalid Auth"
                        }
                    } catch (e: Exception) {
                        error = "Login Failed"
                    } finally {
                        loading = false
                    }
                }
            },
            modifier = Modifier.fillMaxWidth().height(64.dp),
            shape = RoundedCornerShape(20.dp),
            colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF7C3AED))
        ) {
            if (loading) CircularProgressIndicator(color = Color.White) else Text("INITIATE LOGIN", fontWeight = FontWeight.Bold, letterSpacing = 2.sp)
        }
        
        Text(
            "Anonymized Session Cloning active. We do not store your credentials.",
            fontSize = 8.sp,
            color = Color.White.copy(0.3f),
            modifier = Modifier.padding(top = 24.dp)
        )
    }
}
