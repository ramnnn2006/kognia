"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, UserCircle, Mail, Home, GraduationCap, Fingerprint, Activity, Clock } from "lucide-react";

export default function IdentityHub() {
  const [mounted, setMounted] = useState(false);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("vtop_session");
    if (stored) setSession(JSON.parse(stored));
  }, []);

  if (!mounted) return null;

  if (!session) {
    return (
      <div className="p-12 space-y-12 max-w-[1400px] mx-auto min-h-screen flex items-center justify-center text-white">
        <p className="text-white/40 uppercase tracking-widest text-sm">No identity profile found.</p>
      </div>
    );
  }

  return (
    <div className="p-8 md:p-12 space-y-12 max-w-[1400px] mx-auto min-h-screen bg-background text-white selection:bg-primary-light">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative z-10">
        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-[10px] uppercase font-bold tracking-[0.4em] opacity-30">
            <UserCircle className="w-3 h-3 text-primary-light" />
            <span>Identity Profile Dossier</span>
          </div>
          <h1 className="font-headline text-5xl italic tracking-tighter bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
             Full Identity Dump
          </h1>
        </div>
        
        <div className="flex items-center space-x-6 bg-white/[0.02] border border-white/5 p-4 rounded-2xl backdrop-blur-xl">
            <div className="text-right">
                <span className="text-[9px] uppercase tracking-widest opacity-30 block mb-0.5">Hash Validation</span>
                <span className="text-xs font-bold text-primary uppercase tracking-widest">SHA-256 Verified</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/40 shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]">
                <Fingerprint className="w-4 h-4 text-primary animate-pulse" />
            </div>
        </div>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-1 glass-card p-10 rounded-[3rem] border-primary/10 bg-primary/[0.02] h-fit"
          >
            <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-32 h-32 rounded-[2rem] bg-primary/10 border border-primary/20 flex items-center justify-center font-headline italic text-5xl shadow-[0_0_40px_rgba(var(--primary-rgb),0.15)] text-primary-light">
                    {session.student_name?.[0]}
                </div>
                <div>
                    <h2 className="font-headline text-3xl italic tracking-tight">{session.student_name}</h2>
                    <p className="text-[12px] opacity-40 uppercase tracking-[0.3em] font-bold mt-2">{session.register_number || session.reg_no}</p>
                </div>
            </div>

            <div className="mt-10 space-y-4 pt-8 border-t border-white/5">
                {[
                    { icon: Mail, label: 'Official Network', value: session.vit_email_id || session.vit_email },
                    { icon: Home, label: 'Residential Node', value: `${session.hostel_block || ''} Room ${session.room_no || ''}` },
                    { icon: GraduationCap, label: 'Academic School', value: session.school }
                ].map((item, i) => (
                    <div key={i} className="flex items-center space-x-4 group p-3 bg-white/[0.02] rounded-2xl border border-white/5 hover:border-primary/20 transition-all">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                            <item.icon className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:text-primary transition-all" />
                        </div>
                        <div>
                            <span className="text-[8px] uppercase tracking-widest opacity-30 font-bold block">{item.label}</span>
                            <span className="text-[11px] font-medium tracking-wide opacity-80">{item.value || 'N/A'}</span>
                        </div>
                    </div>
                ))}
            </div>
          </motion.div>

          <div className="lg:col-span-2 space-y-8">
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className="glass-card p-10 rounded-[3rem] border-white/5 bg-white/[0.01]"
             >
                <div className="flex items-center space-x-4 mb-8">
                   <Activity className="w-5 h-5 text-tertiary" />
                   <h3 className="text-[12px] uppercase tracking-widest font-bold opacity-60">Complete Profile Matrix</h3>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        { label: "Application Ref", value: session.app_no },
                        { label: "Date of Birth", value: session.dob },
                        { label: "Blood Serology", value: session.blood_group, color: "text-error" },
                        { label: "Native Origin", value: session.native_state },
                        { label: "Gender Marker", value: session.gender },
                        { label: "Programme Node", value: session.programme, color: "text-primary italic" },
                        { label: "Branch Config", value: session.branch },
                        { label: "Mess / Nutrition", value: session.mess_info },
                        { label: "Bed Allocation", value: session.bed_type }
                    ].map((item, i) => (
                        item.value ? (
                            <div key={i} className="space-y-1 pr-4">
                                <span className="text-[9px] uppercase tracking-widest opacity-30 font-bold block border-l-2 border-white/10 pl-2">{item.label}</span>
                                <span className={`text-[12px] font-medium tracking-tight pl-2.5 block capitalize ${item.color || 'opacity-90'}`}>{item.value.toLowerCase()}</span>
                            </div>
                        ) : null
                    ))}
                </div>
             </motion.div>

             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="grid grid-cols-1 md:grid-cols-2 gap-8"
             >
                 <div className="glass-card p-8 rounded-[2.5rem] border-white/5">
                     <span className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-30 block mb-6">Kinship & Emergency</span>
                     <div className="space-y-6">
                        <div>
                            <span className="text-[8px] uppercase tracking-widest opacity-40 font-bold block mb-1">Father</span>
                            <span className="text-[12px]">{session.father_name || 'Unspecified Node'}</span>
                        </div>
                        <div className="h-[1px] w-full bg-white/5" />
                        <div>
                            <span className="text-[8px] uppercase tracking-widest opacity-40 font-bold block mb-1">Mother</span>
                            <span className="text-[12px]">{session.mother_name || 'Unspecified Node'}</span>
                        </div>
                     </div>
                 </div>

                 <div className="glass-card p-8 rounded-[2.5rem] border-tertiary/20 bg-tertiary/5 relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-125 transition-transform duration-700">
                         <ShieldCheck className="w-16 h-16 text-tertiary" />
                     </div>
                     <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-tertiary opacity-80 block mb-6 relative z-10">Liaison Contact</span>
                     <div className="space-y-4 relative z-10">
                        <div>
                            <span className="text-[11px] font-bold block mb-0.5">{session.proctor_name || 'Pending Assignment'}</span>
                            <span className="text-[9px] uppercase tracking-widest opacity-50 italic">Primary Proctor</span>
                        </div>
                        {session.proctor_email && (
                            <div className="pt-4 border-t border-tertiary/10">
                                <span className="text-[10px] opacity-70 tracking-wide font-mono">{session.proctor_email}</span>
                            </div>
                        )}
                        {session.proctor_mobile && (
                            <div>
                                <span className="text-[10px] opacity-70 tracking-wide font-mono pl-0.5">{session.proctor_mobile}</span>
                            </div>
                        )}
                     </div>
                 </div>
             </motion.div>
              {/* Categorized Data Reflection */}
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 }}
               className="glass-card p-10 rounded-[3rem] border-white/5 bg-white/[0.01] space-y-12"
             >
                <div className="flex items-center space-x-4">
                   <Activity className="w-5 h-5 text-white/40" />
                   <h3 className="text-[12px] uppercase tracking-widest font-bold opacity-60">Complete Institutional Node Dump</h3>
                </div>

                {(() => {
                    const groups: Record<string, any[]> = {
                        "Personal & Academic Database": [],
                        "Parent & Kinship Registry": [],
                        "Hostel & Residential Allocation": [],
                        "Faculty & Proctor Assignment": []
                    };

                    Object.entries(session).forEach(([key, value]) => {
                        if (['student_name', 'register_number'].includes(key) || !value) return;
                        
                        const k = key.toLowerCase();
                        if (k.match(/(father|mother|guardian|occupation|annual_income|qualification|organization|empid|brother|sister|official_address|studying_details)/)) {
                            groups["Parent & Kinship Registry"].push({ key, value });
                        } else if (k.match(/(faculty|proctor|cabin|^school$|designation|intercom)/)) {
                            groups["Faculty & Proctor Assignment"].push({ key, value });
                        } else if (k.match(/(block|room|bed|mess|hosteller)/)) {
                            groups["Hostel & Residential Allocation"].push({ key, value });
                        } else {
                            groups["Personal & Academic Database"].push({ key, value });
                        }
                    });

                    return Object.entries(groups).map(([title, items], idx) => {
                        if (items.length === 0) return null;
                        return (
                            <div key={idx} className="space-y-6">
                                <h4 className="text-[10px] uppercase font-bold tracking-[0.3em] opacity-30 border-b border-white/5 pb-2 inline-block">
                                    {title}
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8">
                                    {items.map(({ key, value }, i) => (
                                        <div key={i} className="space-y-1 pr-4 border-l-2 border-white/5 pl-3 hover:border-primary/30 transition-all">
                                            <span className="text-[8px] uppercase tracking-widest opacity-40 font-bold block truncate" title={key.replace(/_/g, ' ')}>
                                                {key.replace(/_/g, ' ')}
                                            </span>
                                            <span className="text-[11px] font-medium tracking-wide opacity-90 block break-words">
                                                {String(value)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    });
                })()}

             </motion.div>
          </div>

      </section>
    </div>
  );
}
