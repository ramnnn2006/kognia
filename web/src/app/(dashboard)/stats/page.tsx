"use client";

import { motion } from "framer-motion";
import { TrendingUp, BarChart3, PieChart, Activity, Fingerprint, CalendarDays, ChevronRight, Users } from "lucide-react";

export default function StatsPage() {
    const stats = [
        { label: "Campus Compliance", value: "94%", color: "text-primary" },
        { label: "Avg Stress Score", value: "42", color: "text-white" },
        { label: "Active Nodes", value: "248", color: "text-tertiary" },
        { label: "Privacy Hashed", value: "100%", color: "text-secondary" }
    ];

    const trends = [
        { label: "Sleep Hours", value: "6.4", trend: "+0.8", color: "text-primary" },
        { label: "Social Ratio", value: "0.42", trend: "-0.1", color: "text-secondary" },
        { label: "Step Count Index", value: "84", trend: "+12", color: "text-tertiary" },
        { label: "Screen Time", value: "4.8h", trend: "-1.2h", color: "text-error" }
    ];

    return (
        <div className="p-12 space-y-12 max-w-[1400px] mx-auto min-h-screen">
            <header className="flex justify-between items-center">
                <div className="space-y-2 text-tertiary">
                    <h1 className="font-headline text-5xl italic tracking-tight font-light">Institutional Insights</h1>
                    <p className="text-[10px] uppercase tracking-[0.4em] opacity-30">Deep-Dive Behavioral Biomarker Intelligence</p>
                </div>
                <div className="flex space-x-6">
                    <button className="px-8 py-4 glass-card text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all flex items-center space-x-3">
                        <CalendarDays className="w-4 h-4 opacity-40" />
                        <span>Last 30 Days</span>
                    </button>
                    <button className="px-8 py-4 bg-tertiary text-white text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-tertiary/80 transition-all">
                        Export Cohort Data
                    </button>
                </div>
            </header>

            {/* Top-Level KPIs */}
            <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="glass-card p-10 rounded-2xl flex flex-col justify-between h-44">
                        <div className="flex items-center space-x-3 opacity-20 mb-4">
                            {i === 0 ? <Activity className="w-4 h-4" /> : i === 1 ? <BarChart3 className="w-4 h-4" /> : i === 2 ? <PieChart className="w-4 h-4" /> : <Fingerprint className="w-4 h-4" />}
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] font-medium">{stat.label}</span>
                        </div>
                        <span className={`font-headline text-5xl italic ${stat.color}`}>{stat.value}</span>
                    </div>
                ))}
            </section>

            {/* Biomarker Comparisons */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex items-center space-x-4 pb-4 border-b border-white/5">
                        <TrendingUp className="w-4 h-4 opacity-40 text-primary" />
                        <h2 className="text-[11px] font-bold uppercase tracking-widest leading-none">Cohort Behavioral Trends</h2>
                    </div>

                    <div className="glass-card rounded-3xl p-12 h-96 flex items-end justify-between space-x-6">
                        {[40, 65, 85, 60, 45, 95, 80, 55, 70, 40, 60, 90].map((h, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center group relative">
                                <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-white/5 px-3 py-1 rounded text-[10px] font-bold uppercase">
                                    {h}% Impact
                                </div>
                                <motion.div 
                                    initial={{ height: 0 }} 
                                    animate={{ height: `${h}%` }} 
                                    transition={{ duration: 1.5, delay: i * 0.05 }}
                                    className={`w-full rounded-t-lg transition-all duration-700 
                                        ${h > 80 ? 'bg-error/30' : h > 50 ? 'bg-primary/20' : 'bg-secondary/10'}`}
                                />
                                <span className="text-[9px] opacity-10 font-bold mt-6 uppercase tracking-tighter italic">Day {i + 1}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Vertical Trend Cards */}
                <div className="space-y-6">
                    <div className="flex items-center space-x-4 pb-4 border-b border-white/5">
                        <Activity className="w-4 h-4 opacity-40 text-secondary" />
                        <h2 className="text-[11px] font-bold uppercase tracking-widest leading-none">Biomarker Health</h2>
                    </div>
                    {trends.map((trend, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                            className="glass-card p-8 rounded-2xl flex items-center justify-between border border-white/0 hover:border-white/5 transition-all group cursor-pointer"
                        >
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-widest block opacity-30 mb-2">{trend.label}</span>
                                <span className={`font-headline text-3xl italic ${trend.color}`}>{trend.value}</span>
                            </div>
                            <div className="text-right">
                                <span className={`text-[11px] font-bold uppercase tracking-widest block mb-1 
                                    ${trend.trend.startsWith('+') ? 'text-tertiary' : 'text-error'}`}>
                                    {trend.trend}
                                </span>
                                <span className="text-[9px] opacity-20 uppercase font-bold tracking-widest italic">vs Last Week</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Bottom Row: Cohort Breakdown */}
            <section className="space-y-8 pb-24">
                <div className="flex items-center space-x-4 pb-4 border-b border-white/5">
                    <Users className="w-4 h-4 opacity-40 text-tertiary" />
                    <h2 className="text-[11px] font-bold uppercase tracking-widest leading-none">Detailed Cohort Segments</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { group: "B.Tech CSE", count: 1420, stress: 38, health: "Optimal" },
                        { group: "B.Tech ECE", count: 840, stress: 52, health: "Watching" },
                        { group: "MBA", count: 420, stress: 28, health: "Stable" },
                        { group: "Hostel Block B", count: 248, stress: 62, health: "High-Alert" }
                    ].map((cohort, i) => (
                        <div key={i} className="glass-card p-8 rounded-2xl space-y-6 group hover:bg-white/[0.04] transition-all cursor-pointer">
                            <div className="flex justify-between items-start">
                                <p className="font-headline text-xl italic leading-none">{cohort.group}</p>
                                <ChevronRight className="w-4 h-4 opacity-20 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="flex justify-between items-end">
                                <div className="space-y-1">
                                    <span className="text-[10px] font-bold uppercase tracking-widest block opacity-20 italic">Population</span>
                                    <span className="text-2xl font-bold font-body">{cohort.count}</span>
                                </div>
                                <div className="text-right space-y-1">
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest
                                        ${cohort.health === 'High-Alert' ? 'bg-error/10 text-error' : cohort.health === 'Watching' ? 'bg-primary/10 text-primary' : 'bg-tertiary/10 text-tertiary'}`}>
                                        {cohort.health}
                                    </span>
                                    <span className="text-[10px] opacity-40 block tracking-tighter italic uppercase">{cohort.stress} Avg Stress</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
