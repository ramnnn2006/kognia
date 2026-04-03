"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, ShieldCheck, Heart, Moon, Footprints, Clock, Zap, Brain, ChevronRight, Share2, Home } from "lucide-react";
import { useRouter } from "next/navigation";

export default function StudentDashboard() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("vtop_session");
    if (stored) setSession(JSON.parse(stored));
  }, []);

  if (!mounted) return null;

  const wellnessStats = [
    { label: "Stress Resonance", value: "Low", score: "24", icon: Brain, color: "text-primary" },
    { label: "Sleep Cycles", value: "Restful", score: "7.2h", icon: Moon, color: "text-tertiary" },
    { label: "Circadian Rhythm", value: "Aligned", score: "0.85", icon: Zap, color: "text-green-400" },
    { label: "Biological Sync", value: "High", score: "92%", icon: Heart, color: "text-error" }
  ];

  return (
    <div className="p-8 md:p-12 space-y-12 max-w-[1400px] mx-auto min-h-screen bg-[#050505] text-white selection:bg-primary-light">
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[140px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-tertiary/5 rounded-full blur-[140px] animate-pulse delay-1000" />
      </div>

      {/* Header: Private Sanctuary */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative z-10">
        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-[10px] uppercase font-bold tracking-[0.4em] opacity-30">
            <ShieldCheck className="w-3 h-3 text-primary-light" />
            <span>Private Sanctuary Terminal</span>
          </div>
          <h1 className="font-headline text-6xl italic tracking-tighter bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
             Hi, {session?.student_name?.split(' ')[0] || 'Sanctuary Node'}
          </h1>
        </div>
        
        <div className="flex items-center space-x-6 bg-white/[0.02] border border-white/5 p-4 rounded-2xl backdrop-blur-xl">
            <div className="text-right">
                <span className="text-[9px] uppercase tracking-widest opacity-30 block mb-0.5">Biometric Status</span>
                <span className="text-xs font-bold text-green-400 uppercase tracking-widest">Anchored Live</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
        </div>
      </header>

      {/* Wellness Core Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {wellnessStats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-8 rounded-[2.5rem] flex flex-col justify-between h-56 border-white/5 hover:border-primary/20 transition-all group overflow-hidden"
          >
            <div className="flex justify-between items-start">
               <div className={`w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:border-primary/20 shadow-inner`}>
                  <stat.icon className={`w-6 h-6 ${stat.color} opacity-60 group-hover:opacity-100 transition-opacity`} />
               </div>
               <div className="h-6 w-12 bg-white/5 rounded-full flex items-center justify-center overflow-hidden">
                   <div className="w-full h-full bg-primary/20 translate-x-[-10%] group-hover:translate-x-0 transition-transform duration-1000" />
               </div>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 mb-2 block">{stat.label}</span>
              <div className="flex items-baseline space-x-2">
                 <span className="font-headline text-4xl italic group-hover:text-primary-light transition-colors">{stat.score}</span>
                 <span className="text-[10px] font-bold uppercase opacity-30 tracking-widest">{stat.value}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Detailed Insights & Activity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
          {/* Activity Trend Graph Mirror */}
          <div className="lg:col-span-2 glass-card p-10 rounded-[3rem] border-white/5 relative overflow-hidden group">
             <div className="flex justify-between items-center mb-10">
                <div className="space-y-1">
                   <h3 className="font-headline text-2xl italic">Behavioral Mirror</h3>
                   <p className="text-[9px] uppercase tracking-widest opacity-30">7-Day Interaction Geometry</p>
                </div>
                <div className="flex space-x-2">
                   {['W', 'T', 'F', 'S', 'S', 'M', 'T'].map((day, i) => (
                      <div key={i} className="flex flex-col items-center space-y-2">
                         <div className="w-4 bg-primary/20 rounded-t-sm group-hover:bg-primary/40 transition-all" style={{ height: Math.random() * 60 + 20 }} />
                         <span className="text-[8px] opacity-30 font-bold">{day}</span>
                      </div>
                   ))}
                </div>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] space-y-4">
                   <div className="flex items-center space-x-3">
                      <Footprints className="w-4 h-4 text-tertiary" />
                      <span className="text-[10px] uppercase font-bold tracking-widest opacity-40">Residential Mobility</span>
                   </div>
                   <div className="space-y-2">
                      <div className="flex justify-between items-baseline">
                         <span className="font-headline text-3xl italic">3,420</span>
                         <span className="text-[9px] opacity-30 font-bold">STEPS / Block B</span>
                      </div>
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                         <div className="w-[60%] h-full bg-tertiary rounded-full" />
                      </div>
                   </div>
                </div>

                <div className="p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] space-y-4">
                   <div className="flex items-center space-x-3">
                      <Activity className="w-4 h-4 text-error" />
                      <span className="text-[10px] uppercase font-bold tracking-widest opacity-40">Interaction Velocity</span>
                   </div>
                   <div className="space-y-2">
                      <div className="flex justify-between items-baseline">
                         <span className="font-headline text-3xl italic">Normal</span>
                         <span className="text-[9px] opacity-30 font-bold">STABLE DEVIATION</span>
                      </div>
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                         <div className="w-[85%] h-full bg-error rounded-full" />
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Identity Dossier Summary */}
          <div className="glass-card p-10 rounded-[3rem] border-primary/10 bg-primary/[0.01] flex flex-col justify-between">
              <div className="space-y-8">
                 <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center font-headline italic text-2xl">
                        {session?.student_name?.[0]}
                    </div>
                    <div>
                        <h4 className="font-headline text-xl italic tracking-tight">{session?.student_name || 'Verified Node'}</h4>
                        <p className="text-[9px] opacity-40 uppercase tracking-widest font-bold">{session?.register_number || session?.reg_no}</p>
                    </div>
                 </div>

                 <div className="space-y-4">
                    {[
                        { icon: Home, label: `${session?.hostel_block || 'Residential Block'} Room ${session?.room_no || 'Node'}` },
                        { icon: ShieldCheck, label: `Proctor: ${session?.proctor_name || 'Liaison Node'}` },
                        { icon: Clock, label: `Handshake active for 14 mins` }
                    ].map((item, i) => (
                        <div key={i} className="flex items-center space-x-4 opacity-50 text-[11px] font-medium tracking-tight">
                           <item.icon className="w-4 h-4 text-primary" />
                           <span>{item.label}</span>
                        </div>
                    ))}
                 </div>
              </div>

              <button 
                onClick={() => router.push("/booking")}
                className="w-full mt-12 bg-white text-black font-bold py-5 rounded-2xl flex items-center justify-center space-x-3 hover:bg-white/90 transition-all uppercase tracking-widest text-[10px] shadow-lg shadow-white/5"
              >
                  <span>Book Counseling Session</span>
                  <ChevronRight className="w-4 h-4" />
              </button>
          </div>
      </div>

      {/* Privacy Guarantee Footer */}
      <footer className="pt-12 border-t border-white/5 text-center space-y-6 opacity-30">
          <div className="flex items-center justify-center space-x-8 text-[9px] font-bold uppercase tracking-[0.2em]">
             <span className="flex items-center space-x-2"><ShieldCheck className="w-3 h-3"/> <span>100% On-Device Sensing</span></span>
             <span className="flex items-center space-x-2"><Share2 className="w-3 h-3"/> <span>Anonymized Triage Relay</span></span>
          </div>
          <p className="max-w-xl mx-auto text-[9px] font-headline italic leading-relaxed">
             "Patterns, Not People." Your institutional dashboard is yours and yours alone. Only behavioral scores are shared with authorized counsellors when triage signals are triggered.
          </p>
      </footer>
    </div>
  );
}
