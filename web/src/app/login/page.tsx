"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { CheckCircle2, User, Mail, Home, GraduationCap, ArrowRight } from "lucide-react";

export default function VtopLoginPage() {
  const router = useRouter();
  const [uname, setUname] = useState("");
  const [passwd, setPasswd] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaImg, setCaptchaImg] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  const [cookies, setCookies] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [session, setSession] = useState<any>(null);

  const fetchCaptcha = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/v1/auth/vtop/captcha");
      const data = await res.json();
      setCaptchaImg(data.captcha);
      setCsrfToken(data.csrf_token);
      setCookies(data.cookies);
    } catch (err) {
      setError("Failed to reach VTOP Server. Is it down?");
    }
  };

  useEffect(() => {
    fetchCaptcha();
    const stored = localStorage.getItem("vtop_session");
    if (stored) setSession(JSON.parse(stored));
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
          captcha: captchaInput,
          csrf_token: csrfToken,
          cookies,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("vtop_session", JSON.stringify(data));
        setSession(data);
      } else {
        setError(data.detail || "Login Failed");
        fetchCaptcha();
      }
    } catch (err) {
      setError("Network error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {!session ? (
          <motion.div 
            key="login"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="glass-card p-12 rounded-3xl w-full max-w-md border-white/5 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            
            <div className="mb-10 text-center">
                <h1 className="font-headline text-4xl italic mb-2">Cognia Auth</h1>
                <p className="text-[10px] uppercase tracking-[0.4em] opacity-40">VIT Chennai VTOP Handshake</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest opacity-40 font-bold">Registration Number</label>
                <input 
                  type="text" 
                  value={uname}
                  onChange={(e) => setUname(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-primary/50 transition-all font-body uppercase"
                  placeholder="24BAI1261"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest opacity-40 font-bold">VTOP Password</label>
                <input 
                  type="password" 
                  value={passwd}
                  onChange={(e) => setPasswd(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-primary/50 transition-all font-body"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4 items-end">
                <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest opacity-40 font-bold">Verification</label>
                    <input 
                        type="text" 
                        value={captchaInput}
                        onChange={(e) => setCaptchaInput(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-primary/50 transition-all text-center tracking-[0.5em] font-bold"
                        placeholder="CAPTCHA"
                        required
                    />
                </div>
                <div 
                    className="h-[60px] bg-white rounded-xl overflow-hidden cursor-pointer flex items-center justify-center p-2"
                    onClick={fetchCaptcha}
                    title="Click to Refresh"
                >
                    {captchaImg ? (
                        <img src={`data:image/png;base64,${captchaImg}`} className="h-full object-contain filter invert" alt="VTOP Captcha" />
                    ) : (
                        <div className="w-full h-full animate-pulse bg-gray-200" />
                    )}
                </div>
              </div>

              {error && <p className="text-error text-[10px] uppercase tracking-widest font-bold text-center mt-4">! {error}</p>}

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/80 text-white font-bold py-5 rounded-2xl tracking-[0.2em] transition-all disabled:opacity-50"
              >
                {loading ? "AUTHENTICATING..." : "INITIATE LOGIN"}
              </button>
            </form>

            <p className="mt-12 text-[9px] uppercase tracking-[0.3em] opacity-30 text-center leading-loose">
              Secure Handshake Enabled. <br />
              We do not store your VTOP password.
            </p>
          </motion.div>
        ) : (
          <motion.div 
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-10 rounded-3xl w-full max-w-xl border-primary/20 bg-primary/5"
          >
            <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                    <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="font-headline text-2xl italic">Handshake Successful</h2>
                    <p className="text-[10px] uppercase tracking-widest opacity-50 text-green-400">Identity Nodes Verified</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center font-headline italic text-2xl">
                            {session.student_name?.[0]}
                        </div>
                        <div>
                            <h3 className="font-headline text-xl italic">{session.student_name}</h3>
                            <p className="text-[10px] opacity-40 uppercase tracking-widest">{session.reg_no}</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center space-x-3 text-[11px]">
                            <Mail className="w-4 h-4 opacity-30" />
                            <span className="opacity-70">{session.vit_email}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-[11px]">
                            <Home className="w-4 h-4 opacity-30" />
                            <span className="opacity-70">{session.hostel_block} (Room {session.room_no})</span>
                        </div>
                        <div className="flex items-center space-x-3 text-[11px]">
                            <GraduationCap className="w-4 h-4 opacity-30" />
                            <span className="opacity-70">{session.school}</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 pt-4 md:pt-0">
                    <h4 className="text-[9px] uppercase tracking-widest opacity-30 border-l border-primary pl-2">Kinship & Profile</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <span className="text-[8px] uppercase opacity-40 block">Father</span>
                            <span className="text-[10px] font-bold">{session.father_name || 'N/A'}</span>
                        </div>
                        <div>
                            <span className="text-[8px] uppercase opacity-40 block">Mother</span>
                            <span className="text-[10px] font-bold">{session.mother_name || 'N/A'}</span>
                        </div>
                        <div>
                            <span className="text-[8px] uppercase opacity-40 block">Blood Group</span>
                            <span className="text-[10px] font-bold text-primary">{session.blood_group}</span>
                        </div>
                        <div>
                            <span className="text-[8px] uppercase opacity-40 block">DOB Node</span>
                            <span className="text-[10px] font-bold">{session.dob}</span>
                        </div>
                    </div>

                    <div className="mt-4 p-3 bg-white/5 rounded-xl border border-white/5">
                        <span className="text-[8px] uppercase opacity-40 block mb-1">Proctor Liaison</span>
                        <span className="text-[10px] font-bold block">{session.proctor_name}</span>
                        <span className="text-[9px] opacity-30 italic">{session.proctor_designation}</span>
                    </div>
                </div>
            </div>

            <div className="mt-10 flex space-x-4">
                <button 
                    onClick={() => router.push("/")}
                    className="flex-1 bg-primary text-white font-bold py-4 rounded-2xl flex items-center justify-center space-x-3 hover:bg-primary/90 transition-all uppercase tracking-widest text-xs"
                >
                    <span>Enter Sanctuary Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                    onClick={() => setSession(null)}
                    className="px-6 py-4 border border-white/5 rounded-2xl opacity-40 hover:opacity-100 transition-all text-xs uppercase tracking-widest font-bold"
                >
                    Switch
                </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
