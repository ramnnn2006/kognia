"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ShieldCheck, Loader2 } from "lucide-react";

export default function GoogleAuthCallback() {
  const router = useRouter();
  const [status, setStatus] = useState("Parsing Google Keys...");

  useEffect(() => {
    // Implicit grant flow adds the access_token in the URL hash (not query parameters)
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token");

    if (!accessToken) {
        setStatus("Authorization Failed. Redirecting back...");
        setTimeout(() => router.push("/dashboard/student"), 3000);
        return;
    }

    setStatus("Exchanging tokens with Cognia Backend...");

    fetch("http://localhost:8000/api/v1/telemetry/sync/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id_token: "google_identity_" + Math.random().toString(36).substring(7),
            access_token: accessToken,
        })
    })
    .then(async (res) => {
        if (!res.ok) throw new Error(await res.text());
        const result = await res.json();
        
        setStatus("Handshake complete. Syncing Biometrics...");
        localStorage.setItem("google_fit_data", JSON.stringify(result.data));
        localStorage.setItem("google_calendar_data", JSON.stringify(result.events || []));
        
        setTimeout(() => {
            router.push("/dashboard/student");
        }, 1500);
    })
    .catch((e) => {
        console.error("Backend OAuth Error:", e);
        setStatus("Backend rejected the handshake. Returning to sanctuary...");
        setTimeout(() => router.push("/dashboard/student"), 3000);
    });
  }, [router]);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 selection:bg-primary">
       <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[140px] animate-pulse" />
          <div className="absolute bottom-[10%] right-[20%] w-[40%] h-[40%] bg-green-500/10 rounded-full blur-[140px] animate-pulse delay-500" />
       </div>

       <motion.div 
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         className="glass-card p-12 rounded-[3.5rem] w-full max-w-lg border-white/5 relative shadow-2xl flex flex-col items-center text-center space-y-8"
       >
          <div className="flex space-x-6 items-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <ShieldCheck className="w-8 h-8 text-primary-light" />
              </div>
              <div className="flex space-x-2">
                 {[1, 2, 3].map(i => (
                    <div key={i} className="w-2 h-2 rounded-full bg-white/20 animate-ping" style={{ animationDelay: `${i * 150}ms` }} />
                 ))}
              </div>
              <div className="w-16 h-16 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
              </div>
          </div>
          
          <div className="space-y-4">
             <h2 className="font-headline text-3xl italic tracking-tight">Securing Google Interface</h2>
             <div className="flex items-center justify-center space-x-3 text-white/40">
                <Loader2 className="w-4 h-4 animate-spin text-green-400" />
                <span className="text-[10px] uppercase font-bold tracking-[0.2em]">{status}</span>
             </div>
          </div>
       </motion.div>
    </div>
  );
}
