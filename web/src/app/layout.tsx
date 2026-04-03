import type { Metadata } from "next";
import { Inter, Newsreader, Manrope } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({ 
  subsets: ["latin"], 
  style: ["normal", "italic"],
  weight: ["200", "400", "800"],
  variable: "--font-newsreader" 
});

const manrope = Manrope({ 
  subsets: ["latin"],
  weight: ["200", "400", "800"],
  variable: "--font-manrope" 
});

export const metadata: Metadata = {
  title: "Cognia — Warden Dashboard",
  description: "Welfare and Safety Institutional Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${newsreader.variable} ${manrope.variable} font-body bg-background text-on-surface`} suppressHydrationWarning>
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="w-72 border-r border-white/5 flex flex-col p-8 fixed h-screen z-10 bg-background/80 backdrop-blur-3xl">
            <div className="text-xl font-bold tracking-widest text-on-surface-variant uppercase mb-16">COGNIA</div>
            
            <nav className="space-y-12">
              <div>
                <span className="text-[10px] tracking-[0.2em] font-bold text-white/30 uppercase block mb-4">Welfare Monitoring</span>
                <ul className="space-y-4">
                  <li><a href="/" className="nav-link text-primary border-b border-primary/20 pb-1">Campus Heatmap</a></li>
                  <li><a href="/triage" className="nav-link">High-Risk Triage</a></li>
                  <li><a href="/stats" className="nav-link">Institutional Stats</a></li>
                </ul>
              </div>

              <div>
                <span className="text-[10px] tracking-[0.2em] font-bold text-white/30 uppercase block mb-4">Interventions</span>
                <ul className="space-y-4">
                  <li><a href="/booking" className="nav-link">Session Booking</a></li>
                  <li><a href="#" className="nav-link">Sanctuary Alerts</a></li>
                </ul>
              </div>

              <div>
                <span className="text-[10px] tracking-[0.2em] font-bold text-white/30 uppercase block mb-4">System</span>
                <ul className="space-y-4">
                  <li><a href="/audit" className="nav-link text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant hover:text-primary transition-all duration-300">Identity Hash Logs</a></li>
                  <li><a href="/login" className="nav-link">Student Auth Login</a></li>
                  <li><a href="/audit" className="nav-link">Privacy Audit Log</a></li>
                </ul>
              </div>
            </nav>

            <div className="mt-auto pt-8 border-t border-white/5 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-surface-container-high border border-white/10 flex items-center justify-center">
                  <span className="text-[10px] font-bold">JW</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest leading-none">James Warden</span>
                  <span className="text-[9px] text-on-surface-variant/40 uppercase tracking-tighter">Senior Counsellor</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="ml-72 flex-1 relative min-h-screen">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
