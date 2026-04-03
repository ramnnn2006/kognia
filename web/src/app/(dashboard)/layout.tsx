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
  const [fitSynced, setFitSynced] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);


  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("vtop_session");
    if (stored) setSession(JSON.parse(stored));
    if (localStorage.getItem("google_fit_data")) setFitSynced(true);
  }, []);

  const handleGoogleFitAuth = () => {
    if (isSyncing) return;
    setIsSyncing(true);

    const GOOGLE_CLIENT_ID = "287307705302-m745jbcug76mb7l52hdkke2ieqcpkdil.apps.googleusercontent.com";
    const REDIRECT_URI = "http://localhost:3000/api/auth/callback/google";
    const SCOPES = "https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.sleep.read https://www.googleapis.com/auth/calendar.readonly openid email profile";

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=token&scope=${encodeURIComponent(SCOPES)}&include_granted_scopes=true`;
    
    // Redirect cleanly to Google
    window.location.href = authUrl;
  };

  const handleLogout = () => {
    localStorage.removeItem("vtop_session");
    localStorage.removeItem("google_fit_data");
    setSession(null);
    setFitSynced(false);
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
              <div className="flex items-center space-x-1">
                <button 
                  onClick={handleGoogleFitAuth}
                  disabled={isSyncing || fitSynced}
                  className={`p-2 hover:bg-white/5 rounded-lg transition-colors ${fitSynced ? 'text-green-400 opacity-100' : 'text-white/40 hover:text-white'} ${isSyncing ? 'animate-pulse opacity-50' : ''}`}
                  title={fitSynced ? "Google Fit Synced" : "Synchronize Google Fit"}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={`w-4 h-4 transition-all duration-300 ${fitSynced ? 'grayscale-0 drop-shadow-[0_0_10px_rgba(52,168,83,0.5)]' : 'grayscale hover:grayscale-0'} ${isSyncing ? 'animate-spin' : ''}`}>
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                </button>

                <button 
                  onClick={handleLogout}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/20 hover:text-error"
                  title="Disconnect Sanctuary"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
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
