"use client";

import { motion } from "framer-motion";
import { Fingerprint, ShieldCheck, Lock, Search, Filter, History, ChevronRight } from "lucide-react";

export default function AuditPage() {
    const logs = [
        { hash: "7f83ad9e...2a8b", timestamp: "9:42:21 PM", action: "SYNC_STRESS", payload: "score: 42, sleep: 7.2h", node: "ROOM_B310", status: "VERIFIED" },
        { hash: "e81c1102...91f0", timestamp: "9:40:15 PM", action: "SYNC_ALERT", payload: "score: 88, social: 0.9", node: "ROOM_B337", status: "VERIFIED" },
        { hash: "4a2d980a...bb12", timestamp: "9:38:02 PM", action: "SYNC_STRESS", payload: "score: 15, steps: 12402", node: "ROOM_A115", status: "VERIFIED" },
        { hash: "99f1cc32...cc34", timestamp: "9:35:44 PM", action: "SYNC_STRESS", payload: "score: 55, ambient: 0.1", node: "ROOM_B219", status: "VERIFIED" },
        { hash: "12abef01...ffee", timestamp: "9:32:10 PM", action: "SYNC_STRESS", payload: "score: 62, reply_lat: 442s", node: "ROOM_C421", status: "VERIFIED" }
    ];

    return (
        <div className="p-12 space-y-12 max-w-[1400px] mx-auto min-h-screen">
            <header className="flex justify-between items-center">
                <div className="space-y-2 text-secondary">
                    <h1 className="font-headline text-5xl italic tracking-tight">Privacy Audit Log</h1>
                    <p className="text-[10px] uppercase tracking-[0.4em] opacity-30">Direct SHA-256 Immutable Sync Registry</p>
                </div>
                <div className="flex space-x-6">
                    <div className="px-6 py-3 glass-card rounded-xl flex items-center space-x-3 text-[10px] font-bold uppercase tracking-widest text-secondary border-secondary/20">
                        <Lock className="w-3 h-3" />
                        <span>E2E Encrypted Sync</span>
                    </div>
                </div>
            </header>

            {/* Audit Stats */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Total Sync Events", value: "1,248", color: "text-white" },
                    { label: "Identity Redaction", value: "100%", color: "text-secondary" },
                    { label: "Protocol Integrity", value: "SECURE", color: "text-tertiary" }
                ].map((stat, i) => (
                    <div key={i} className="glass-card p-8 rounded-2xl flex flex-col justify-between h-40">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">{stat.label}</span>
                        <span className={`font-headline text-5xl italic ${stat.color}`}>{stat.value}</span>
                    </div>
                ))}
            </section>

            {/* Terminal Log View */}
            <section className="space-y-8">
                <div className="flex items-center justify-between border-b border-white/5 pb-6">
                    <div className="flex items-center space-x-4">
                        <History className="w-4 h-4 opacity-40" />
                        <h2 className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant">Live Integrity Stream</h2>
                    </div>
                    <div className="relative">
                        <Search className="w-3 h-3 absolute left-4 top-1/2 -translate-y-1/2 opacity-20" />
                        <input 
                            type="text" 
                            placeholder="SEARCH HASH..." 
                            className="bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-[10px] uppercase tracking-widest outline-none focus:border-secondary/40 transition-all"
                        />
                    </div>
                </div>

                <div className="glass-card rounded-2xl overflow-hidden">
                    <div className="bg-white/[0.03] px-8 py-4 flex items-center text-[10px] font-bold uppercase tracking-widest opacity-40 border-b border-white/5">
                        <div className="w-64">Subscriber Hash</div>
                        <div className="w-48">Registry Node</div>
                        <div className="flex-1">Action Payload</div>
                        <div className="w-32 text-right">Verification</div>
                    </div>

                    <div className="divide-y divide-white/5">
                        {logs.map((log, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                                className="px-8 py-6 flex items-center group hover:bg-white/[0.01] transition-all"
                            >
                                <div className="w-64 font-mono text-[11px] text-secondary/60 tracking-tighter">
                                    {log.hash}
                                </div>
                                <div className="w-48">
                                    <span className="text-[11px] font-bold opacity-40 uppercase tracking-widest">{log.node}</span>
                                </div>
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-[10px] font-bold text-white/80">{log.action}</span>
                                        <span className="text-[9px] opacity-20 uppercase font-bold tracking-tighter italic">{log.timestamp}</span>
                                    </div>
                                    <p className="text-[10px] font-mono opacity-30 text-secondary italic">{log.payload}</p>
                                </div>
                                <div className="w-32 text-right">
                                    <div className="inline-flex items-center space-x-2 px-3 py-1 bg-tertiary/10 rounded-full">
                                        <ShieldCheck className="w-3 h-3 text-tertiary" />
                                        <span className="text-[9px] font-bold text-tertiary uppercase tracking-widest">{log.status}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
