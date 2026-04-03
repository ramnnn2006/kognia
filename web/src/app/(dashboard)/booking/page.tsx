"use client";

import { motion } from "framer-motion";
import { Users, Calendar, Clock, MapPin, UserCheck, MessageSquare, ChevronRight } from "lucide-react";

export default function BookingPage() {
    const slots = [
        { time: "09:00 AM", student: "HASH_7F83", room: "B-212", type: "Urgent", status: "Confirmed", counsellor: "Dr. Sarah Miller" },
        { time: "10:30 AM", student: "HASH_E81C", room: "A-115", type: "Routine", status: "Checked In", counsellor: "Dr. sarah Miller" },
        { time: "11:45 AM", student: "HASH_4A2D", room: "D-004", type: "Urgent", status: "Available", counsellor: "Unassigned" },
        { time: "02:00 PM", student: "HASH_99F1", room: "B-337", type: "Crisis", status: "Triage Alert", counsellor: "Dr. sarah Miller" },
        { time: "04:30 PM", student: "HASH_12AB", room: "C-421", type: "Regular", status: "Available", counsellor: "Unassigned" }
    ];

    return (
        <div className="p-12 space-y-12 max-w-[1400px] mx-auto min-h-screen">
            <header className="flex justify-between items-center">
                <div className="space-y-2 text-primary">
                    <h1 className="font-headline text-5xl italic">Session Booking</h1>
                    <p className="text-[10px] uppercase tracking-[0.4em] opacity-30">Counsellor-to-Student Handshake Portal</p>
                </div>
                <div className="flex space-x-6">
                    <button className="px-8 py-4 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-primary/80 transition-all">
                        Create Sanctuary Slot
                    </button>
                </div>
            </header>

            {/* Daily Summary */}
            <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Daily Sessions", value: "14", color: "text-white" },
                    { label: "Available Slots", value: "05", color: "text-primary" },
                    { label: "Avg Duration", value: "45m", color: "text-tertiary" },
                    { label: "Crisis Responded", value: "100%", color: "text-secondary" }
                ].map((stat, i) => (
                    <div key={i} className="glass-card p-10 rounded-2xl flex flex-col justify-between h-44">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">{stat.label}</span>
                        <span className={`font-headline text-5xl italic ${stat.color}`}>{stat.value}</span>
                    </div>
                ))}
            </section>

            {/* Timeline View */}
            <section className="space-y-8">
                <div className="flex items-center space-x-4 pb-4 border-b border-white/5">
                    <Calendar className="w-4 h-4 opacity-40" />
                    <h2 className="text-[11px] font-bold uppercase tracking-widest">Today's Timeline · April 03</h2>
                </div>

                <div className="space-y-12 relative pt-8">
                    {/* Visual Vertical Line */}
                    <div className="absolute left-[125px] top-4 bottom-8 w-[1px] bg-white opacity-5" />

                    {slots.map((slot, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                            className="flex items-center group relative cursor-pointer"
                        >
                            <div className="w-[125px] flex flex-col justify-center items-end pr-8">
                                <span className="font-headline text-2xl italic tracking-tight">{slot.time}</span>
                                <span className="text-[9px] opacity-20 uppercase font-bold tracking-widest mt-1">45 MINS</span>
                            </div>

                            <div className="absolute left-[125px] -translate-x-1/2 w-4 h-4 rounded-full bg-background border-2 border-white/10 group-hover:border-primary transition-all z-10" />

                            <div className="flex-1 ml-12 glass-card p-8 rounded-3xl flex items-center hover:bg-white/[0.04] transition-all border border-white/0 hover:border-white/5">
                                <div className="w-24">
                                    <div className={`text-[10px] font-bold px-3 py-1 rounded w-fit border mb-2
                                        ${slot.type === 'Crisis' ? 'bg-error/10 border-error text-error' : 
                                          slot.type === 'Urgent' ? 'bg-primary/10 border-primary text-primary' : 'bg-white/5 border-white/10 opacity-60'}`}>
                                        {slot.type}
                                    </div>
                                    <span className="text-xl font-headline italic">{slot.student}</span>
                                </div>

                                <div className="flex-1 px-12 border-x border-white/5">
                                    <div className="flex items-center space-x-3 mb-2 opacity-30">
                                        <MapPin className="w-3 h-3" />
                                        <span className="text-[9px] font-bold uppercase tracking-widest leading-none">Room {slot.room}</span>
                                    </div>
                                    <div className="flex items-center space-x-3 mb-2 opacity-30">
                                        <UserCheck className="w-3 h-3" />
                                        <span className="text-[9px] font-bold uppercase tracking-widest leading-none">Assigned to: {slot.counsellor}</span>
                                    </div>
                                </div>

                                <div className="w-48 pl-12">
                                    <span className={`text-[10px] font-bold px-3 py-1 rounded w-fit uppercase tracking-widest
                                        ${slot.status === 'Confirmed' ? 'text-tertiary bg-tertiary/10' : 
                                          slot.status === 'Available' ? 'text-primary' : 'text-gray-500 bg-white/5 opacity-40'}`}>
                                        {slot.status}
                                    </span>
                                </div>

                                <div className="flex items-center space-x-4 pl-12 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-4 bg-white/5 rounded-full hover:bg-white/10">
                                        <MessageSquare className="w-5 h-5 opacity-40" />
                                    </button>
                                    <ChevronRight className="w-5 h-5 opacity-20" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    )
}
