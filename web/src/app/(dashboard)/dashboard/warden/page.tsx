"use client";

import React, { useState, useEffect } from "react";
import HeatmapGrid from "../../../components/HeatmapGrid";
import { motion } from "framer-motion";
import { Activity, ShieldAlert, Fingerprint, TrendingUp, Users, Clock } from "lucide-react";

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("vtop_session");
    if (stored) setSession(JSON.parse(stored));
  }, []);

  return (
    <div className="p-12 space-y-12 max-w-[1600px] mx-auto min-h-screen">
      
      {/* Session Profile Banner (If logged in) */}
      {session && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 rounded-2xl flex items-center justify-between border-primary/20">
            <div className="flex items-center space-x-6">
                <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center font-headline italic text-2xl shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]">
                    {session.student_name?.[0]}
                </div>
                <div>
                    <h3 className="font-headline text-2xl italic text-primary-light">{session.student_name || 'Sanctuary Student'}</h3>
                    <p className="text-[10px] uppercase tracking-[0.2em] opacity-50">Identity Verified · {session.reg_no} · {session.school || 'Academic Node'}</p>
                </div>
            </div>
            
            <div className="grid grid-cols-3 gap-x-12 gap-y-4 text-right">
                <div>
                    <span className="text-[9px] uppercase tracking-widest opacity-40 block mb-1">Hostel Node</span>
                    <span className="text-xs font-bold">{session.hostel_block || 'Residential Node'} (Room {session.room_no || 'N/A'})</span>
                </div>
                <div>
                    <span className="text-[9px] uppercase tracking-widest opacity-40 block mb-1">Institutional Liaison</span>
                    <span className="text-xs font-bold">{session.proctor_name || 'Proctor Pending'}</span>
                </div>
                <div>
                    <span className="text-[9px] uppercase tracking-widest opacity-40 block mb-1">Programme resonance</span>
                    <span className="text-xs font-bold text-primary">{session.programme || 'Degree Node'}</span>
                </div>
                <div>
                    <span className="text-[9px] uppercase tracking-widest opacity-40 block mb-1">Nutrition Node</span>
                    <span className="text-xs font-bold opacity-80">{session.mess_info || 'Mess Node'}</span>
                </div>
                <div>
                    <span className="text-[9px] uppercase tracking-widest opacity-40 block mb-1">Security Status</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] bg-green-500/10 text-green-400 border border-green-500/20">Active Node</span>
                </div>
            </div>
        </motion.div>
      )}

      {/* Header Section */}
      <header className="flex justify-between items-end">
        <div className="space-y-2">
          <h1 className="font-headline text-5xl italic tracking-tight text-on-surface">Executive Summary</h1>
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
            <span className="font-headline text-5xl italic">6.4<span className="text-xl opacity-30 ml-2 text-on-surface/40 uppercase">HOURS</span></span>
          </div>
        </div>
        <div className="glass-card p-10 rounded-2xl flex flex-col justify-between h-48 border-tertiary/10">
          <div className="flex justify-between h-full flex-col">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-tertiary/60">Activity Index</span>
            <span className="font-headline text-5xl italic text-tertiary">84<span className="text-xl opacity-30 ml-2 uppercase text-tertiary/40">STEPS %</span></span>
          </div>
        </div>
        <div className="glass-card p-10 rounded-2xl border-error/10 flex flex-col justify-between h-48">
          <div className="flex justify-between h-full flex-col text-error">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-60">High-Risk Signals</span>
            <span className="font-headline text-5xl italic">03<span className="text-xl opacity-30 ml-2 text-error/30 uppercase">ROOMS</span></span>
          </div>
        </div>
      </section>

      {/* Heatmap & Triage Row */}
      <section className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center space-x-3 mb-2">
             <Activity className="w-4 h-4 text-primary" />
             <h2 className="text-[11px] font-bold uppercase tracking-widest text-on-surface/80">Active Welfare Heatmap</h2>
          </div>
          
          {/* Identity Grid: Behavioral vs. Biological */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <HeatmapGrid />
            </div>

            <div className="space-y-6">
              {/* Biological Metadata Card */}
              {session && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card p-6 rounded-2xl border-primary/20 bg-primary/5 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5">
                   <Users className="w-20 h-20" />
                </div>

                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <h4 className="font-headline italic text-sm tracking-widest uppercase opacity-70">Identity Dossier</h4>
                </div>
                
                <div className="space-y-4">
                  {[
                    { label: "Application Ref", value: session.app_no },
                    { label: "Date of Birth", value: session.dob },
                    { label: "Blood Serology", value: session.blood_group, highlight: true },
                    { label: "Personal Email", value: session.email_personal },
                    { label: "Contact Channel", value: session.mobile }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0">
                      <span className="text-[10px] uppercase opacity-40 font-bold">{item.label}</span>
                      <span className={`text-[11px] font-mono ${item.highlight ? 'text-primary' : 'opacity-80'}`}>
                        {item.value || 'N/A'}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Dossier Deep-Sync Sections */}
                <div className="mt-6 pt-6 border-t border-white/10 space-y-6">
                   <div>
                      <h5 className="text-[9px] uppercase tracking-widest opacity-30 mb-3 border-l border-primary pl-2 italic">Kinship Nodes</h5>
                      <div className="grid grid-cols-2 gap-4">
                         <div className="bg-white/5 p-2 rounded-lg">
                            <span className="text-[8px] uppercase opacity-40 block mb-1">Father</span>
                            <span className="text-[10px] font-bold truncate block">{session.father_name || 'N/A'}</span>
                         </div>
                         <div className="bg-white/5 p-2 rounded-lg">
                            <span className="text-[8px] uppercase opacity-40 block mb-1">Mother</span>
                            <span className="text-[10px] font-bold truncate block">{session.mother_name || 'N/A'}</span>
                         </div>
                      </div>
                   </div>

                   <div>
                      <h5 className="text-[9px] uppercase tracking-widest opacity-30 mb-3 border-l border-tertiary pl-2 italic">Institutional Geo</h5>
                      <div className="grid grid-cols-2 gap-4">
                         <div>
                            <span className="text-[8px] uppercase opacity-40 block mb-1">Native State</span>
                            <span className="text-[10px] opacity-80">{session.native_state || 'N/A'}</span>
                         </div>
                         <div>
                            <span className="text-[8px] uppercase opacity-40 block mb-1">Bed Node</span>
                            <span className="text-[10px] opacity-80">{session.bed_type || 'N/A'}</span>
                         </div>
                      </div>
                   </div>

                   {/* Liaison Contact */}
                   <div>
                        <h5 className="text-[9px] uppercase tracking-widest opacity-30 mb-3 border-l border-secondary pl-2 italic">Liaison Contact</h5>
                        <div className="p-2 bg-secondary/5 rounded border border-secondary/10">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-bold text-secondary">{session.proctor_name}</span>
                                <span className="text-[8px] opacity-40 uppercase">Proctor</span>
                            </div>
                            <span className="text-[9px] opacity-60 block mt-1">{session.proctor_email}</span>
                            <span className="text-[8px] opacity-30 block mt-0.5">{session.proctor_designation}</span>
                        </div>
                   </div>
                </div>
              </motion.div>
              )}
            </div>
          </div>
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

    </div>
  );
}
