"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

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
        // Success! Save session and redirect to warden dashboard
        localStorage.setItem("vtop_session", JSON.stringify(data));
        router.push("/");
      } else {
        setError(data.detail || "Login Failed");
        fetchCaptcha(); // Refresh captcha on failure
      }
    } catch (err) {
      setError("Network error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-12 rounded-3xl w-full max-w-md border-white/5"
      >
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
              className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-primary/50 transition-all font-body"
              placeholder="21BCE0000"
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
          We do not store your VTOP password. <br />
          Anonymized Token Session Generated On-Device.
        </p>
      </motion.div>
    </div>
  );
}
