"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { GraduationCap, Users, ShieldAlert, ArrowRight, Fingerprint, Lock, Globe } from "lucide-react";

export default function LoginHub() {
  const router = useRouter();

  const portals = [
    {
      role: "Student",
      title: "Sanctuary Dashboard",
      description: "Access your behavioral wellness metrics and sync institutional identity through the VTOP Handshake.",
      icon: GraduationCap,
      href: "/login/student",
      color: "from-primary/20",
      border: "border-primary/30",
      accent: "text-primary-light"
    },
    {
      role: "Parent",
      title: "Observation Node",
      description: "Secure, high-level summary of residential well-being without compromising student privacy layers.",
      icon: Users,
      href: "/login/parent",
      color: "from-tertiary/20",
      border: "border-tertiary/30",
      accent: "text-tertiary-light"
    },
    {
      role: "Counsellor",
      title: "Clinical Terminal",
      description: "Manage high-risk triage alerts and triage institutional health trends with executive oversight.",
      icon: ShieldAlert,
      href: "/login/counsellor",
      color: "from-error/20",
      border: "border-error/30",
      accent: "text-error-light"
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 selection:bg-primary">
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[140px] animate-pulse" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-tertiary/5 rounded-full blur-[140px] animate-pulse delay-1000" />
      </div>

      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-20 text-center relative z-10"
      >
        <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="h-[1px] w-12 bg-white/10" />
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-40">Cognia Integrated Portals</span>
            <div className="h-[1px] w-12 bg-white/10" />
        </div>
        <h1 className="font-headline text-6xl italic italic tracking-tighter bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">Login Sanctuary</h1>
      </motion.header>

      {/* Portal Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl relative z-10">
        {portals.map((portal, i) => (
          <motion.div
            key={portal.role}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            onClick={() => router.push(portal.href)}
            className={`group cursor-pointer glass-card p-10 rounded-[2.5rem] border ${portal.border} bg-gradient-to-br ${portal.color} to-transparent hover:to-white/5 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2`}
          >
            <div className="relative mb-12">
                <div className={`w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:border-primary/20`}>
                   <portal.icon className={`w-8 h-8 ${portal.accent} opacity-60 group-hover:opacity-100 transition-opacity`} />
                </div>
                <div className="absolute top-0 right-0">
                    <span className="text-[9px] uppercase tracking-widest font-bold opacity-30 mt-2 block">{portal.role} Portal</span>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="font-headline text-3xl italic tracking-tight">{portal.title}</h2>
                <p className="text-xs leading-relaxed opacity-40 group-hover:opacity-70 transition-opacity font-medium line-clamp-3">
                  {portal.description}
                </p>
            </div>

            <div className="mt-12 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[9px] font-bold uppercase tracking-widest opacity-30">Active Node</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary transition-all duration-500 group-hover:translate-x-2">
                    <ArrowRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:text-white" />
                </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Security Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-24 flex flex-col items-center space-y-6 opacity-30 relative z-10"
      >
        <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
                <ShieldCheck className="w-3 h-3" />
                <span className="text-[9px] font-bold uppercase tracking-widest">End-to-End Encryption</span>
            </div>
            <div className="flex items-center space-x-2">
                <Fingerprint className="w-3 h-3" />
                <span className="text-[9px] font-bold uppercase tracking-widest">Biometric Anchoring</span>
            </div>
        </div>
        <p className="text-[8px] uppercase tracking-widest text-center italic max-w-md">Institutional data handling is governed by the Cognia Privacy Protocol V4. Identity nodes are hashed on-device.</p>
      </motion.footer>
    </div>
  );
}

// Minimal missing component for the layout
function ShieldCheck(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
