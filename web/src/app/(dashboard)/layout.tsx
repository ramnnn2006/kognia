"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Activity, 
  ShieldAlert, 
  TrendingUp, 
  History, 
  Fingerprint, 
  Calendar, 
  UserCircle,
  LayoutDashboard,
  ShieldCheck,
  LogOut,
  Zap
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("vtop_session");
    if (stored) setSession(JSON.parse(stored));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("vtop_session");
    setSession(null);
    router.push("/login");
  };

  if (!mounted) return null;

  const isStudent = !!session;

  return (
    <div className="flex min-h-screen bg-[#050505] text-white">
      {/* Dashboard Sidebar */}
      <aside className="w-72 border-r border-white/5 flex flex-col p-8 fixed h-screen z-10 bg-[#050505]/80 backdrop-blur-3xl">
        <div className="mb-16">
          <Link href="/" className="text-xl font-bold tracking-widest text-[#CCC3D8] uppercase font-headline">COGNIA</Link>
          <div className="text-[8px] font-bold tracking-[0.4em] opacity-30 mt-2">
            {isStudent ? "STUDENT SANCTUARY" : "INSTITUTIONAL HUB"}
          </div>
        </div>
        
        <nav className="flex-1 space-y-12">
          {/* Section: Core Access */}
          <div className="space-y-6">
            <span className="text-[10px] tracking-[0.2em] font-bold text-white/30 uppercase block mb-4">Navigation</span>
            <ul className="space-y-3">
              {isStudent ? (
                <li>
                  <Link href="/dashboard/student" className={`flex items-center space-x-3 text-[11px] font-bold uppercase tracking-widest transition-all group ${pathname === '/dashboard/student' ? 'text-primary opacity-100' : 'opacity-40 hover:opacity-100 hover:text-primary'}`}>
                    <LayoutDashboard className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>Personal Sanctuary</span>
                  </Link>
                </li>
              ) : (
                <li>
                  <Link href="/dashboard/warden" className={`flex items-center space-x-3 text-[11px] font-bold uppercase tracking-widest transition-all group ${pathname === '/dashboard/warden' ? 'text-primary opacity-100' : 'opacity-40 hover:opacity-100 hover:text-primary'}`}>
                    <Activity className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>Campus Heatmap</span>
                  </Link>
                </li>
              )}
              
              {!isStudent && (
                <li>
                  <Link href="/triage" className={`flex items-center space-x-3 text-[11px] font-bold uppercase tracking-widest transition-all group ${pathname === '/triage' ? 'text-error opacity-100' : 'opacity-40 hover:opacity-100 hover:text-error'}`}>
                    <ShieldAlert className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>High-Risk Triage</span>
                  </Link>
                </li>
              )}

              <li>
                <Link href="/stats" className={`flex items-center space-x-3 text-[11px] font-bold uppercase tracking-widest transition-all group ${pathname === '/stats' ? 'text-secondary opacity-100' : 'opacity-40 hover:opacity-100 hover:text-secondary'}`}>
                   <TrendingUp className="w-4 h-4 group-hover:scale-110 transition-transform" />
                   <span>{isStudent ? "Wellness Indices" : "Institutional Stats"}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Section: Support */}
          <div className="space-y-6">
            <span className="text-[10px] tracking-[0.2em] font-bold text-white/30 uppercase block mb-4">Interventions</span>
            <ul className="space-y-3">
              <li>
                <Link href="/booking" className={`flex items-center space-x-3 text-[11px] font-bold uppercase tracking-widest transition-all group ${pathname === '/booking' ? 'text-tertiary opacity-100' : 'opacity-40 hover:opacity-100 hover:text-tertiary'}`}>
                   <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
                   <span>Session Booking</span>
                </Link>
              </li>
              <li>
                <div className="flex items-center space-x-3 text-[11px] font-bold uppercase tracking-widest opacity-20 cursor-not-allowed">
                   <Zap className="w-4 h-4" />
                   <span>Crisis Channel</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Section: Trust Layer */}
          <div className="space-y-6">
            <span className="text-[10px] tracking-[0.2em] font-bold text-white/30 uppercase block mb-4">Transparency</span>
            <ul className="space-y-3">
              <li>
                <Link href="/audit" className={`flex items-center space-x-3 text-[11px] font-bold uppercase tracking-widest transition-all group ${pathname === '/audit' ? 'text-white opacity-100' : 'opacity-40 hover:opacity-100'}`}>
                   <Fingerprint className="w-4 h-4 group-hover:scale-110 transition-transform" />
                   <span>Privacy Audit</span>
                </Link>
              </li>
              <li>
                <Link href={isStudent ? "/identity" : "/login"} className={`flex items-center space-x-3 text-[11px] font-bold uppercase tracking-widest transition-all group ${pathname === '/identity' ? 'text-primary opacity-100' : 'opacity-40 hover:opacity-100 transition-all'}`}>
                   <UserCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                   <span>Identity Hub</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Profile Footer */}
        <div className="mt-auto pt-8 border-t border-white/5 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-headline italic text-primary">
                {isStudent ? (session.student_name?.[0] || 'S') : 'JW'}
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold uppercase tracking-widest leading-tight truncate max-w-[120px]">
                  {isStudent ? session.student_name : 'James Warden'}
                </span>
                <span className="text-[9px] text-white/30 uppercase tracking-tighter">
                  {isStudent ? session.reg_no : 'Senior Counsellor'}
                </span>
              </div>
            </div>
            {isStudent && (
              <button 
                onClick={handleLogout}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/20 hover:text-error"
                title="Disconnect Sanctuary"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
          
          {isStudent && (
              <div className="p-3 bg-primary/5 border border-primary/10 rounded-xl flex items-center space-x-3">
                  <ShieldCheck className="w-3 h-3 text-primary animate-pulse" />
                  <span className="text-[8px] font-bold uppercase tracking-widest opacity-60">Handshake Active</span>
              </div>
          )}
        </div>
      </aside>

      {/* Main Dashboard Content Area */}
      <main className="ml-72 flex-1 relative min-h-screen bg-background overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
