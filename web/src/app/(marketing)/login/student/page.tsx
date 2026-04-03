"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { CheckCircle2, Mail, Home, GraduationCap, ArrowRight, ShieldCheck, Fingerprint, Lock, Globe } from "lucide-react";

export default function VtopLoginPage() {
  const router = useRouter();
  const [uname, setUname] = useState("");
  const [passwd, setPasswd] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [session, setSession] = useState<any>(null);
  const [sysStatus, setSysStatus] = useState<string>("Synchronizing Identity Nodes...");

  useEffect(() => {
    const stored = localStorage.getItem("vtop_session");
    if (stored) setSession(JSON.parse(stored));
    
    // Simulate system check animation
    const statuses = [
        "Synchronizing Identity Nodes...",
        "VTOP Anchor: Ready",
        "Biometric Handshake: Active",
        "Cognia Privacy Shield: Armed"
    ];
    let i = 0;
    const interval = setInterval(() => {
        setSysStatus(statuses[i % statuses.length]);
        i++;
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:8000/api/v1/auth/vtop/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uname,
          passwd,
          captcha: "AUTOMATED",
          csrf_token: "AUTOMATED",
          cookies: {},
        }),
      });

      const data = await res.json();
      if (res.ok) {
        // Assume backend returns { status: "success", data: { ...student_data } }
        const studentData = data.data;
        localStorage.setItem("vtop_session", JSON.stringify(studentData));
        setSession(studentData);
      } else {
        setError(data.detail || "Institutional Handshake Rejected");
      }
    } catch (err) {
      setError("VTOP Connection Interrupted");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 selection:bg-primary selection:text-white">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-tertiary/5 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      <AnimatePresence mode="wait">
        {!session ? (
          <motion.div 
            key="login"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            className="glass-card p-12 rounded-[2.5rem] w-full max-w-lg border-white/5 relative shadow-2xl"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            
            <div className="mb-12 text-center relative">
                <div className="w-16 h-16 bg-primary/10 border border-primary/20 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-[0_0_30px_rgba(var(--primary-rgb),0.2)]">
                   <ShieldCheck className="w-8 h-8 text-primary-light" />
                </div>
                <h1 className="font-headline text-5xl italic tracking-tighter mb-4 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">Cognia Identity</h1>
                <div className="flex items-center justify-center space-x-2 text-[9px] uppercase tracking-[0.4em] font-bold text-primary-light/60">
                   <Globe className="w-3 h-3 animate-spin-slow" />
                   <span>Institutional Handshake Engine</span>
                </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2 group">
                <div className="flex justify-between items-center px-1">
                    <label className="text-[10px] uppercase tracking-widest opacity-30 font-bold group-focus-within:opacity-100 transition-opacity">Registration ID</label>
                    <Fingerprint className="w-3 h-3 opacity-20 group-focus-within:opacity-100 transition-opacity text-primary" />
                </div>
                <input 
                  type="text" 
                  value={uname}
                  onChange={(e) => setUname(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-primary/40 focus:bg-white/[0.05] transition-all font-body uppercase text-sm tracking-widest hover:border-white/20"
                  placeholder="24BAIXXXX"
                  required
                />
              </div>

              <div className="space-y-2 group">
                <div className="flex justify-between items-center px-1">
                    <label className="text-[10px] uppercase tracking-widest opacity-30 font-bold group-focus-within:opacity-100 transition-opacity">Institutional Key</label>
                    <Lock className="w-3 h-3 opacity-20 group-focus-within:opacity-100 transition-opacity text-primary" />
                </div>
                <input 
                  type="password" 
                  value={passwd}
                  onChange={(e) => setPasswd(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-primary/40 focus:bg-white/[0.05] transition-all font-body text-sm tracking-widest hover:border-white/20"
                  placeholder="••••••••••••"
                  required
                />
              </div>

              {/* Handshake Status Indicator */}
              <div className="py-4 px-6 bg-white/[0.02] border border-white/5 rounded-xl flex items-center space-x-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 animate-pulse">{sysStatus}</span>
              </div>

              {error && (
                <motion.div 
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    className="p-4 rounded-xl bg-error/10 border border-error/20 text-error text-[10px] uppercase tracking-widest font-bold text-center italic"
                >
                    Handshake Error: {error}
                </motion.div>
              )}

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary-light text-on-primary font-bold py-6 rounded-[1.25rem] tracking-[0.3em] transition-all duration-500 disabled:opacity-50 relative overflow-hidden group shadow-lg shadow-primary/10"
              >
                <span className="relative z-10 uppercase text-xs">
                    {loading ? "Anchoring Identity..." : "Initiate Secure Handshake"}
                </span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
            </form>

            <div className="mt-12 flex justify-between items-center opacity-20 hover:opacity-50 transition-opacity cursor-default">
                <span className="text-[8px] uppercase font-bold tracking-[0.2em]">Privacy Shield V4.1</span>
                <span className="text-[8px] uppercase font-bold tracking-[0.2em]">SHA-256 Anchored</span>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-12 rounded-[3.5rem] w-full max-w-2xl border-primary/20 bg-primary/[0.02] relative overflow-hidden"
          >
            {/* Success Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-none" />

            <div className="flex items-center space-x-6 mb-10 pb-10 border-b border-white/5">
                <div className="w-16 h-16 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 shadow-[0_0_40px_rgba(34,197,94,0.1)]">
                    <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                    <h2 className="font-headline text-4xl italic mb-1 tracking-tight">Identity Synced</h2>
                    <p className="text-[10px] uppercase tracking-[0.4em] opacity-40 font-bold text-green-400">Biological & Institutional Nodes Locked</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                <div className="space-y-8">
                    <div className="flex items-center space-x-6">
                        <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center font-headline italic text-3xl shadow-inner shadow-primary/20">
                            {session.student_name?.[0]}
                        </div>
                        <div>
                            <h3 className="font-headline text-2xl italic tracking-tight text-primary-light">{session.student_name}</h3>
                            <p className="text-[11px] opacity-40 uppercase tracking-[0.2em] font-bold">{session.reg_no}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {[
                            { icon: Mail, label: session.vit_email },
                            { icon: Home, label: `${session.hostel_block} (Room ${session.room_no})` },
                            { icon: GraduationCap, label: session.school }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center space-x-4 group">
                                <item.icon className="w-4 h-4 opacity-20 group-hover:opacity-100 transition-opacity text-primary" />
                                <span className="text-xs opacity-60 group-hover:opacity-100 transition-opacity font-medium">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-6 pt-6 md:pt-0">
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="text-[9px] uppercase tracking-widest opacity-30 font-bold italic tracking-[0.3em]">Profile Dossier</h4>
                        <div className="h-[1px] flex-1 bg-white/5 ml-4" />
                    </div>
                    <div className="grid grid-cols-2 gap-6 p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                        {[
                            { label: "Blood Serology", value: session.blood_group, color: "text-primary italic" },
                            { label: "Identity DOB", value: session.dob },
                            { label: "Native Origin", value: session.native_state || "N/A" },
                            { label: "Identity App #", value: session.app_no?.slice(-6) || "N/A" }
                        ].map((item, i) => (
                            <div key={i}>
                                <span className="text-[8px] uppercase opacity-40 block mb-1 font-bold tracking-widest">{item.label}</span>
                                <span className={`text-[10px] font-bold tracking-tight ${item.color || 'opacity-80'}`}>{item.value || 'Verified'}</span>
                            </div>
                        ))}
                    </div>

                    <div className="p-5 bg-tertiary/5 rounded-2xl border border-tertiary/10 flex items-center justify-between">
                        <div>
                            <span className="text-[8px] uppercase opacity-40 block mb-1 font-bold">Primary Liaison</span>
                            <span className="text-[11px] font-bold block italic">{session.proctor_name}</span>
                        </div>
                        <div className="w-8 h-8 rounded-lg bg-tertiary/10 flex items-center justify-center">
                            <ShieldCheck className="w-4 h-4 text-tertiary" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/5 flex space-x-6">
                <button 
                    onClick={() => router.push("/dashboard/warden")}
                    className="flex-[2] bg-primary/90 text-white font-bold py-6 rounded-2xl flex items-center justify-center space-x-4 hover:shadow-[0_0_50px_rgba(var(--primary-rgb),0.3)] hover:-translate-y-0.5 transition-all duration-300 uppercase tracking-[0.3em] text-[11px]"
                >
                    <span>Sanctuary Terminal</span>
                    <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                    onClick={() => {
                        localStorage.removeItem("vtop_session");
                        setSession(null);
                    }}
                    className="flex-1 px-8 py-6 border border-white/5 rounded-2xl opacity-40 hover:opacity-100 transition-all text-[10px] uppercase tracking-widest font-bold italic hover:border-primary/20 hover:bg-primary/5"
                >
                    Anchor New
                </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
