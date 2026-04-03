"use client";

import React, { useState, useEffect } from "react";
import HeatmapGrid from "../components/HeatmapGrid";
import { motion } from "framer-motion";
import { Activity, ShieldAlert, Fingerprint, TrendingUp, Users, Clock } from "lucide-react";

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="p-12 space-y-12 max-w-[1600px] mx-auto min-h-screen">
      
      {/* Header Section */}
      <header className="flex justify-between items-end">
        <div className="space-y-2">
          <h1 className="font-headline text-5xl italic tracking-tight">Executive Summary</h1>
          <p className="text-[10px] uppercase tracking-[0.4em] opacity-30">Real-time Institutional Behavioral Metrics</p>
        </div>
        <div className="flex space-x-4">
           <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
              <span className="text-[9px] font-bold uppercase tracking-widest opacity-60">System Synchronized</span>
           </div>
        </div>
      </header>

      {/* Main Stats Row */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card p-10 rounded-2xl flex flex-col justify-between h-48">
          <div className="flex justify-between h-full flex-col">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">Campus Stress Avg</span>
            <span className="font-headline text-5xl italic">42<span className="text-xl opacity-30 ml-2">/100</span></span>
          </div>
        </div>
        <div className="glass-card p-10 rounded-2xl flex flex-col justify-between h-48">
          <div className="flex justify-between h-full flex-col">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">Sleep Quality Avg</span>
            <span className="font-headline text-5xl italic">6.4<span className="text-xl opacity-30 ml-2">HOURS</span></span>
          </div>
        </div>
        <div className="glass-card p-10 rounded-2xl flex flex-col justify-between h-48 border-tertiary/10">
          <div className="flex justify-between h-full flex-col">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-tertiary/60">Activity Index</span>
            <span className="font-headline text-5xl italic text-tertiary">84<span className="text-xl opacity-30 ml-2">STEPS %</span></span>
          </div>
        </div>
        <div className="glass-card p-10 rounded-2xl border-error/10 flex flex-col justify-between h-48">
          <div className="flex justify-between h-full flex-col text-error">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-60">High-Risk Signals</span>
            <span className="font-headline text-5xl italic">03<span className="text-xl opacity-30 ml-2 text-error/30">ROOMS</span></span>
          </div>
        </div>
      </section>

      {/* Heatmap & Triage Row */}
      <section className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center space-x-3 mb-2">
             <Activity className="w-4 h-4 text-primary" />
             <h2 className="text-[11px] font-bold uppercase tracking-widest">Active Welfare Heatmap</h2>
          </div>
          <HeatmapGrid />
        </div>
        
        {/* Module: High-Risk Triage */}
        <div className="space-y-6">
           <div className="flex items-center space-x-3 mb-2 text-error">
             <ShieldAlert className="w-4 h-4" />
             <h2 className="text-[11px] font-bold uppercase tracking-widest">Urgent Triage</h2>
          </div>
          <div className="glass-card rounded-2xl p-6 min-h-[400px] space-y-6">
             <div className="space-y-4">
               {[
                 { room: "B-3-12", score: 92, time: "4 mins ago", reason: "Sleep Deprivation Cluster" },
                 { room: "B-3-37", score: 88, time: "12 mins ago", reason: "Sudden Social Withdrawal" },
                 { room: "A-2-15", score: 85, time: "22 mins ago", reason: "Prolonged Screen Spikes" }
               ].map((alert, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                   className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 hover:border-error/20 transition-all cursor-pointer group"
                 >
                   <div className="flex justify-between items-center">
                     <span className="text-[10px] font-bold tracking-widest">ROOM {alert.room}</span>
                     <span className="text-[9px] font-bold text-error bg-error/10 px-2 py-0.5 rounded uppercase">{alert.score} Score</span>
                   </div>
                   <p className="text-[11px] opacity-40 font-medium leading-relaxed">{alert.reason}</p>
                   <div className="flex items-center space-x-2 pt-1">
                      <Clock className="w-3 h-3 opacity-20" />
                      <span className="text-[9px] opacity-20 uppercase font-bold tracking-tighter">{alert.time}</span>
                   </div>
                 </motion.div>
               ))}
             </div>
             <button className="w-full py-4 text-[9px] font-bold uppercase tracking-[0.3em] border border-white/5 rounded-xl opacity-30 hover:opacity-100 transition-all">View All Triage</button>
          </div>
        </div>
      </section>

      {/* Trend & Logs Row */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-24">
        {/* Module: Institutional Trends */}
        <div className="space-y-6">
           <div className="flex items-center space-x-3 mb-2 text-tertiary">
             <TrendingUp className="w-4 h-4" />
             <h2 className="text-[11px] font-bold uppercase tracking-widest">Campus Behavioral Trend</h2>
          </div>
          <div className="glass-card rounded-2xl p-10 h-64 flex items-end justify-between space-x-4">
             {/* Simple Peak Chart representation using CSS bars */}
             {[40, 60, 45, 90, 65, 80, 55, 40, 70, 85].map((h, i) => (
               <div key={i} className="flex-1 flex flex-col items-center group">
                 <motion.div 
                   initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ duration: 1, delay: i * 0.1 }}
                   className={`w-full rounded-t-sm transition-all duration-500 group-hover:opacity-100 ${h > 70 ? 'bg-error/40' : 'bg-primary/20 opacity-40'}`}
                 />
                 <span className="text-[8px] opacity-20 font-bold mt-4 uppercase tracking-tighter group-hover:opacity-100 italic transition-opacity">{10 + i}:00</span>
               </div>
             ))}
          </div>
        </div>

        {/* Module: Identity Audit Log */}
        <div className="space-y-6">
           <div className="flex items-center space-x-3 mb-2 text-on-surface-variant">
             <Fingerprint className="w-4 h-4" />
             <h2 className="text-[11px] font-bold uppercase tracking-widest">Hash Sync Audit Log</h2>
          </div>
          <div className="glass-card rounded-2xl p-8 h-64 overflow-hidden relative">
             <div className="space-y-3 opacity-30">
               {[
                 "SHA256: 7f83...2a8b synced stress_index: 42 to ROOM B-3-10",
                 "SHA256: e81c...91f0 synced stress_index: 88 to ROOM B-3-37 [High Risk]",
                 "SHA256: 4a2d...bb12 synced social_ratio: 0.2 to ROOM A-1-08",
                 "SHA256: 99f1...cc34 synced sleep_latency: 240m to ROOM B-2-19",
                 "SHA256: 12ab...ffee synced physical_activity: 0.1 to ROOM C-4-02"
               ].map((log, i) => (
                 <div key={i} className="text-[10px] font-mono tracking-tight font-medium border-b border-white/5 pb-2 truncate">
                   <span className="text-secondary/60">[{mounted ? new Date().toLocaleTimeString() : 'SYNC'}]</span> {log}
                 </div>
               ))}
             </div>
             {/* Fade gradient for logs */}
             <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
          </div>
        </div>
      </section>

    </div>
  );
}
