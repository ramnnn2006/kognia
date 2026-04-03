"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ShieldAlert, Fingerprint, Lock, Globe, ArrowRight, Activity, Command } from "lucide-react";

export default function CounsellorLogin() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 selection:bg-tertiary">
      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-tertiary/10 rounded-full blur-[120px] animate-pulse" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-12 rounded-[2.5rem] w-full max-w-md border-tertiary/20 relative shadow-2xl bg-tertiary/[0.02]"
      >
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-tertiary/50 to-transparent" />
        
        <div className="mb-12 text-center relative">
            <div className="w-16 h-16 bg-tertiary/10 border border-tertiary/20 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-[0_0_30px_rgba(var(--tertiary-rgb),0.2)]">
               <ShieldAlert className="w-8 h-8 text-tertiary-light" />
            </div>
            <h1 className="font-headline text-5xl italic tracking-tighter mb-4 text-tertiary-light">Counsellor Terminal</h1>
            <div className="flex items-center justify-center space-x-2 text-[9px] uppercase tracking-[0.4em] font-bold opacity-40">
               <Activity className="w-3 h-3" />
               <span>Physchiatric Intervention Hub</span>
            </div>
        </div>

        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); router.push('/dashboard/warden'); }}>
          <div className="space-y-2 group">
            <div className="flex justify-between items-center px-1">
                <label className="text-[10px] uppercase tracking-widest opacity-30 font-bold group-focus-within:opacity-100 transition-opacity">Liaison ID</label>
                <Command className="w-3 h-3 opacity-20 group-focus-within:opacity-100 transition-opacity text-tertiary" />
            </div>
            <input 
              type="text" 
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-tertiary/40 focus:bg-white/[0.05] transition-all font-body uppercase text-sm tracking-widest"
              placeholder="L-9923"
              required
            />
          </div>

          <div className="space-y-2 group">
            <div className="flex justify-between items-center px-1">
                <label className="text-[10px] uppercase tracking-widest opacity-30 font-bold group-focus-within:opacity-100 transition-opacity">Verification-Key</label>
                <Lock className="w-3 h-3 opacity-20 group-focus-within:opacity-100 transition-opacity text-tertiary" />
            </div>
            <input 
              type="password" 
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-tertiary/40 focus:bg-white/[0.05] transition-all font-body text-sm tracking-widest"
              placeholder="••••••••••••"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-tertiary/80 hover:bg-tertiary text-on-surface font-bold py-6 rounded-[1.25rem] tracking-[0.3em] transition-all duration-500 relative overflow-hidden group shadow-lg shadow-tertiary/10"
          >
            <span className="relative z-10 uppercase text-xs">Sync Clinical Data Nodes</span>
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
        </form>

        <button 
            onClick={() => router.push("/login")}
            className="mt-12 w-full text-center text-[10px] uppercase tracking-widest opacity-20 hover:opacity-100 transition-opacity font-bold italic"
        >
            Switch Identity Node
        </button>
      </motion.div>
    </div>
  );
}
