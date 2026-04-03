import React from "react";
import Link from "next/link";
import { 
  Activity, 
  ShieldAlert, 
  TrendingUp, 
  History, 
  Fingerprint, 
  Calendar, 
  UserCircle 
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Dashboard Sidebar - Administrative Oversight Node */}
      <aside className="w-72 border-r border-white/5 flex flex-col p-8 fixed h-screen z-10 bg-[#050505]/80 backdrop-blur-3xl">
        <div className="mb-16">
          <Link href="/" className="text-xl font-bold tracking-widest text-[#CCC3D8] uppercase font-headline">COGNIA</Link>
          <div className="text-[8px] font-bold tracking-[0.4em] opacity-30 mt-2">INSTITUTIONAL HUB</div>
        </div>
        
        <nav className="flex-1 space-y-12">
          {/* Section: Welfare Monitoring */}
          <div className="space-y-6">
            <span className="text-[10px] tracking-[0.2em] font-bold text-white/30 uppercase block mb-4">Welfare Monitoring</span>
            <ul className="space-y-3">
              <li>
                <Link href="/dashboard/warden" className="flex items-center space-x-3 text-[11px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 hover:text-primary transition-all group">
                   <Activity className="w-4 h-4 group-hover:scale-110 transition-transform" />
                   <span>Campus Heatmap</span>
                </Link>
              </li>
              <li>
                <Link href="/triage" className="flex items-center space-x-3 text-[11px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 hover:text-error transition-all group">
                   <ShieldAlert className="w-4 h-4 group-hover:scale-110 transition-transform" />
                   <span>High-Risk Triage</span>
                </Link>
              </li>
              <li>
                <Link href="/stats" className="flex items-center space-x-3 text-[11px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 hover:text-secondary transition-all group">
                   <TrendingUp className="w-4 h-4 group-hover:scale-110 transition-transform" />
                   <span>Institutional Stats</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Section: Interventions */}
          <div className="space-y-6">
            <span className="text-[10px] tracking-[0.2em] font-bold text-white/30 uppercase block mb-4">Interventions</span>
            <ul className="space-y-3">
              <li>
                <Link href="/booking" className="flex items-center space-x-3 text-[11px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 hover:text-tertiary transition-all group">
                   <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
                   <span>Session Booking</span>
                </Link>
              </li>
              <li>
                <div className="flex items-center space-x-3 text-[11px] font-bold uppercase tracking-widest opacity-20 cursor-not-allowed">
                   <History className="w-4 h-4" />
                   <span>Sanctuary Alerts</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Section: Transparency */}
          <div className="space-y-6">
            <span className="text-[10px] tracking-[0.2em] font-bold text-white/30 uppercase block mb-4">Transparency</span>
            <ul className="space-y-3">
              <li>
                <Link href="/audit" className="flex items-center space-x-3 text-[11px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-all group">
                   <Fingerprint className="w-4 h-4 group-hover:scale-110 transition-transform" />
                   <span>Privacy Audit Log</span>
                </Link>
              </li>
              <li>
                <Link href="/login" className="flex items-center space-x-3 text-[11px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-all group">
                   <UserCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                   <span>Identity Hub</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Warden Profile Footer */}
        <div className="mt-auto pt-8 border-t border-white/5 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-surface-container-high border border-white/10 flex items-center justify-center font-headline italic">
              JW
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-widest leading-tight">James Warden</span>
              <span className="text-[9px] text-on-surface-variant/40 uppercase tracking-tighter">Senior Counsellor</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Dashboard Content Area */}
      <main className="ml-72 flex-1 relative min-h-screen bg-background">
        {children}
      </main>
    </div>
  );
}
