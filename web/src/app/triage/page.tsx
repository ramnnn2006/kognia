"use client";

import { motion } from "framer-motion";
import { ShieldAlert, Users, Clock, Filter, CheckCircle2, ChevronRight } from "lucide-react";

export default function TriagePage() {
  const alerts = [
    { room: "B-3-12", score: 92, status: "Critical", time: "4 mins ago", reason: "Sleep Deprivation Cluster", trend: "Increasing" },
    { room: "B-3-37", score: 88, status: "Urgent", time: "12 mins ago", reason: "Sudden Social Withdrawal", trend: "Stable" },
    { room: "A-2-15", score: 85, status: "Active", time: "22 mins ago", reason: "Prolonged Screen Spikes", trend: "Decreasing" },
    { room: "D-1-04", score: 82, status: "Active", time: "1 hour ago", reason: "Midnight Social Surge", trend: "Increasing" },
    { room: "C-4-21", score: 79, status: "Resolved", time: "2 hours ago", reason: "Low Movement Signal", trend: "Stable" }
  ];

  return (
    <div className="p-12 space-y-12 max-w-[1400px] mx-auto min-h-screen">
      <header className="flex justify-between items-center">
        <div className="space-y-2">
            <h1 className="font-headline text-5xl italic">Current Triage</h1>
            <p className="text-[10px] uppercase tracking-[0.4em] opacity-30">Behavioral Alert Management Hub</p>
        </div>
        <div className="flex space-x-4">
            <button className="px-6 py-3 glass-card rounded-full flex items-center space-x-3 text-[10px] font-bold uppercase tracking-widest text-primary">
                <Filter className="w-3 h-3" />
                <span>Filter Alerts</span>
            </button>
        </div>
      </header>

      {/* Triage Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
              { label: "Active Critical", value: "02", color: "text-error" },
              { label: "Pending Review", value: "05", color: "text-primary" },
              { label: "Avg Resolution", value: "48m", color: "text-tertiary" }
          ].map((stat, i) => (
              <div key={i} className="glass-card p-8 rounded-2xl flex flex-col justify-between h-40">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">{stat.label}</span>
                  <span className={`font-headline text-5xl italic ${stat.color}`}>{stat.value}</span>
              </div>
          ))}
      </section>

      {/* Main Alert Table */}
      <section className="space-y-6">
          <div className="flex items-center space-x-3 mb-6">
              <ShieldAlert className="w-5 h-5 text-error" />
              <h2 className="text-[11px] font-bold uppercase tracking-widest">Active Institutional Flags</h2>
          </div>
          
          <div className="space-y-4">
              {alerts.map((alert, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className={`glass-card p-8 rounded-2xl flex items-center group cursor-pointer border border-white/0 hover:border-white/5 transition-all
                        ${alert.status === 'Resolved' ? 'opacity-40' : 'opacity-100'}`}
                  >
                        <div className="w-24">
                            <span className="text-[10px] font-bold uppercase tracking-widest block opacity-40 mb-1">Room</span>
                            <span className="font-headline text-2xl italic leading-none">{alert.room}</span>
                        </div>

                        <div className="flex-1 px-8">
                            <span className="text-[10px] font-bold uppercase tracking-widest block opacity-40 mb-2">Behavioral Context</span>
                            <p className="text-sm font-body font-medium">{alert.reason}</p>
                        </div>

                        <div className="w-32 px-8 border-x border-white/5">
                            <span className="text-[10px] font-bold uppercase tracking-widest block opacity-40 mb-1">Severity</span>
                            <span className={`text-[11px] font-bold uppercase tracking-widest 
                                ${alert.status === 'Critical' ? 'text-error' : 'text-primary'}`}>
                                {alert.status}
                            </span>
                        </div>

                        <div className="w-48 px-12 text-center">
                            <span className="text-[10px] font-bold uppercase tracking-widest block opacity-40 mb-1">Score Index</span>
                            <span className="font-headline text-3xl italic">{alert.score}</span>
                        </div>

                        <div className="flex items-center space-x-8 pl-12 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-3 bg-tertiary/10 rounded-full text-tertiary hover:bg-tertiary/20">
                                <CheckCircle2 className="w-5 h-5" />
                            </button>
                            <ChevronRight className="w-5 h-5 opacity-40" />
                        </div>
                  </motion.div>
              ))}
          </div>
      </section>

    </div>
  )
}
