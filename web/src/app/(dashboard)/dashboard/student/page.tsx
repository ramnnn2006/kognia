"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, ShieldCheck, Heart, Moon, Footprints, Clock, Zap, Brain, ChevronRight, Share2, Home } from "lucide-react";
import { useRouter } from "next/navigation";

export default function StudentDashboard() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [fitData, setFitData] = useState<any>(null);
  const [calendarEvents, setCalendarEvents] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("vtop_session");
    if (stored) setSession(JSON.parse(stored));
    
    const storedFit = localStorage.getItem("google_fit_data");
    if (storedFit) setFitData(JSON.parse(storedFit));

    const storedEvents = localStorage.getItem("google_calendar_data");
    if (storedEvents) setCalendarEvents(JSON.parse(storedEvents));
  }, []);

  if (!mounted) return null;

  const steps = fitData?.steps ? fitData.steps.toLocaleString() : "---";
  const sleepHrs = fitData?.sleep_hours ? `${fitData.sleep_hours}h` : "---";
  const calories = fitData?.calories ? fitData.calories.toLocaleString() : "---";
  const syncRate = fitData ? "98%" : "Pending";

  const wellnessStats = [
    { label: "Stress Resonance", value: fitData ? "Awaiting Pipeline" : "Offline", score: "---", icon: Brain, color: fitData ? "text-primary" : "text-primary/30" },
    { label: "Sleep Cycles", value: fitData ? "Tracked" : "Unlinked", score: sleepHrs, icon: Moon, color: fitData ? "text-tertiary" : "text-tertiary/30" },
    { label: "Active Calories", value: fitData ? "Expended" : "Unlinked", score: calories, icon: Zap, color: fitData ? "text-green-400" : "text-green-400/30" },
    { label: "Google Fit Sync", value: fitData ? "Anchored" : "Offline", score: syncRate, icon: Heart, color: fitData ? "text-error" : "text-error/30" }
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
                <span className="text-[9px] uppercase tracking-widest opacity-30 block mb-0.5">Google Data Stream</span>
                <span className={`text-xs font-bold uppercase tracking-widest ${fitData ? 'text-green-400' : 'text-white/40'}`}>
                    {fitData ? "Synchronized Live" : "Authorization Required"}
                </span>
            </div>
            <div className={`w-1.5 h-1.5 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)] ${fitData ? 'bg-green-500 animate-pulse' : 'bg-white/20'}`} />
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
            className={`glass-card p-8 rounded-[2.5rem] flex flex-col justify-between h-56 border-white/5 transition-all group overflow-hidden ${stat.score !== '---' ? 'hover:border-primary/20 cursor-pointer' : ''}`}
          >
            <div className="flex justify-between items-start">
               <div className={`w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-inner ${stat.score !== '---' ? 'group-hover:border-primary/20' : ''}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color} opacity-60 ${stat.score !== '---' ? 'group-hover:opacity-100' : ''} transition-opacity`} />
               </div>
               {stat.score !== '---' && (
                 <div className="h-6 w-12 bg-white/5 rounded-full flex items-center justify-center overflow-hidden">
                     <div className="w-full h-full bg-primary/20 translate-x-[-10%] group-hover:translate-x-0 transition-transform duration-1000" />
                 </div>
               )}
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 mb-2 block">{stat.label}</span>
              <div className="flex items-baseline space-x-2">
                 <span className={`font-headline text-4xl italic transition-colors ${stat.score === '---' ? 'opacity-20' : 'group-hover:text-primary-light'}`}>{stat.score}</span>
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
                         <div className="w-4 bg-white/5 rounded-t-sm transition-all" style={{ height: 10 }} />
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
                         <span className={`font-headline text-3xl italic ${!fitData ? 'opacity-20' : ''}`}>{steps}</span>
                         <span className="text-[9px] opacity-30 font-bold">{fitData ? "STEPS TODAY" : "AWAITING AUTH"}</span>
                      </div>
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                         <div className={`h-full bg-tertiary rounded-full transition-all duration-1000 ${fitData ? 'w-[75%]' : 'w-[0%]'}`} />
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
                         <span className="font-headline text-3xl italic opacity-20">---</span>
                         <span className="text-[9px] opacity-30 font-bold">AWAITING ENGINE</span>
                      </div>
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                         <div className="w-[0%] h-full bg-error rounded-full" />
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

      {/* Temporal Timeline (Google Calendar) */}
      <section className="relative z-10 glass-card p-10 rounded-[3rem] border-white/5 space-y-8">
          <div className="flex items-center space-x-4">
              <Clock className="w-5 h-5 text-primary" />
              <h3 className="font-headline text-2xl italic tracking-tight">Temporal Timeline</h3>
              <div className="w-px h-6 bg-white/10 mx-4" />
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-40">
                  {calendarEvents.length > 0 ? "Upcoming Impending Bounds" : "No Chronological Data Found"}
              </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {calendarEvents.slice(0, 3).map((event, i) => {
                  const startTime = event.start?.dateTime || event.start?.date;
                  const dateObj = new Date(startTime);
                  const formattedTime = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                  const formattedDate = dateObj.toLocaleDateString([], { month: 'short', day: 'numeric' });
                  
                  return (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.15 }}
                        className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-all group"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-primary-light">
                                {formattedDate}
                            </span>
                            <span className="text-xs font-bold uppercase tracking-widest opacity-30 group-hover:opacity-100 transition-opacity">
                                {formattedTime !== "Invalid Date" ? formattedTime : "All Day"}
                            </span>
                        </div>
                        <h4 className="font-headline text-xl italic leading-tight text-white/90 group-hover:text-white transition-colors truncate">
                            {event.summary || "Encrypted Event"}
                        </h4>
                    </motion.div>
                  )
              })}
              
              {calendarEvents.length === 0 && (
                  <div className="col-span-full p-8 rounded-[2.5rem] border border-dashed border-white/10 flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                      <Clock className="w-8 h-8 opacity-40" />
                      <div>
                          <p className="font-headline text-xl italic">Awaiting Protocol</p>
                          <p className="text-[10px] font-bold uppercase tracking-widest mt-2">{fitData ? "No upcoming events scheduled" : "Anchor Google for Timeline Synchronization"}</p>
                      </div>
                  </div>
              )}
          </div>
      </section>

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
