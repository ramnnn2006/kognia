import React from "react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary-container selection:text-white">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/10 flex justify-between items-center px-8 py-4 max-w-full mx-auto">
        <div className="text-xl font-bold tracking-widest text-[#CCC3D8] uppercase font-headline">COGNIA</div>
        <div className="hidden md:flex items-center space-x-10">
          <Link className="text-[11px] font-bold tracking-[0.05em] uppercase text-[#7C3AED] border-b border-[#7C3AED]" href="#">Platform</Link>
          <Link className="text-[11px] font-bold tracking-[0.05em] uppercase text-[#CCC3D8] hover:text-[#7C3AED] transition-colors duration-300" href="/login">Portals</Link>
          <Link className="text-[11px] font-bold tracking-[0.05em] uppercase text-[#CCC3D8] hover:text-[#7C3AED] transition-colors duration-300" href="#">Privacy</Link>
          <Link className="text-[11px] font-bold tracking-[0.05em] uppercase text-[#CCC3D8] hover:text-[#7C3AED] transition-colors duration-300" href="#">Join</Link>
          <Link className="text-[11px] font-bold tracking-[0.05em] uppercase border border-primary-container px-6 py-2 hover:bg-primary-container/10 transition-all active:scale-95 duration-400" href="/login">Login Hub</Link>
        </div>
        <button className="md:hidden text-on-surface">
          <span className="material-symbols-outlined font-light">menu</span>
        </button>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="min-h-screen pt-32 px-8 flex flex-col justify-between pb-24 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-8">
              <h1 className="font-headline italic font-light text-display-lg leading-tight mb-8">
                Stress has a<br />signature.
              </h1>
              <p className="text-on-surface-variant text-xl md:text-2xl font-light max-w-lg mb-12 leading-relaxed">
                Cognia detects it silently — before it becomes a crisis.
              </p>
              <Link className="inline-flex items-center group px-8 py-4 border border-primary-container text-on-surface font-label uppercase tracking-widest text-[13px] hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all" href="/login">
                Request Early Access
                <span className="material-symbols-outlined ml-4 group-hover:translate-x-2 transition-transform font-light">arrow_right_alt</span>
              </Link>
            </div>
            <div className="md:col-span-4 self-end flex justify-end">
              <div className="glass-card p-10 w-full max-w-sm rounded-xl">
                <div className="flex flex-col items-center">
                  <div className="relative w-48 h-48 mb-6">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="96" cy="96" fill="transparent" r="88" stroke="rgba(124, 58, 237, 0.1)" strokeWidth="8"></circle>
                      <circle className="drop-shadow-[0_0_8px_rgba(124,58,237,0.8)]" cx="96" cy="96" fill="transparent" r="88" stroke="#7C3AED" strokeDasharray="553" strokeDashoffset="165" strokeWidth="8"></circle>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-headline italic">72</span>
                      <span className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant">Stress Score</span>
                    </div>
                  </div>
                  <div className="w-full space-y-4">
                    <div className="flex justify-between items-center text-[11px] font-label uppercase tracking-tighter opacity-60">
                      <span>Signal Quality</span>
                      <span className="text-secondary">Excellent</span>
                    </div>
                    <div className="h-[1px] w-full bg-white/10"></div>
                    <div className="flex justify-between items-center text-[11px] font-label uppercase tracking-tighter opacity-60">
                      <span>Sync Status</span>
                      <span>Live</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="razor-divider"></div>

        {/* Statement Section */}
        <section className="py-32 px-8 max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-24">
            <h2 className="font-headline text-4xl md:text-6xl italic leading-tight text-on-surface">
              Twelve behavioral signals. Zero data leaves your device.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/5 hidden md:block"></div>
            <div className="space-y-6">
              <span className="text-[10px] font-label uppercase tracking-[0.2em] text-secondary-container">Passive Sensing</span>
              <p className="text-on-surface-variant font-light leading-relaxed text-lg">
                We don't ask you how you feel. We look at the geometry of your touch, the rhythm of your typing, and the micro-latencies in your interaction. It’s a passive mirror of the mind.
              </p>
            </div>
            <div className="space-y-6">
              <span className="text-[10px] font-label uppercase tracking-[0.2em] text-primary-container">Privacy Architecture</span>
              <p className="text-on-surface-variant font-light leading-relaxed text-lg">
                Your raw behavior never touches our servers. Federated learning allows us to train models on your device, ensuring your digital footprint remains yours and yours alone.
              </p>
            </div>
          </div>
        </section>

        <div className="razor-divider"></div>

        {/* Hostel Heatmap Section (Aesthetic Representation) */}
        <section className="py-32 bg-surface">
          <div className="max-w-7xl mx-auto px-8 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <h2 className="font-headline text-4xl md:text-6xl italic leading-tight mb-4">Wardens see patterns.</h2>
              <h2 className="font-headline text-4xl md:text-6xl italic leading-tight text-on-surface-variant opacity-50">Not people.</h2>
            </div>
            <div className="max-w-xs">
              <p className="text-[11px] font-label uppercase tracking-widest text-on-surface-variant leading-loose">
                Institutions receive high-level heatmaps of campus wellbeing, never individual identities. Actionable data, absolute anonymity.
              </p>
            </div>
          </div>
          <div className="px-8 overflow-hidden">
            <div className="glass-card p-4 md:p-8 rounded-xl max-w-6xl mx-auto">
              <div className="flex justify-between items-center mb-8 px-4">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 rounded-full bg-error animate-pulse"></div>
                  <span className="text-[10px] font-label uppercase tracking-widest">Block B · Floor 3 · Live View</span>
                </div>
                <div className="hidden sm:block text-[10px] font-label uppercase tracking-[0.3em] opacity-40">System Status: Active</div>
              </div>
              <div className="grid grid-cols-5 md:grid-cols-10 gap-2 md:gap-4 aspect-video md:aspect-[21/9]">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div key={i} className={`rounded-sm border ${i % 7 === 0 ? 'bg-error/30 border-error/40' : i % 4 === 0 ? 'bg-primary-container/20 border-primary-container/30' : 'bg-secondary/10 border-secondary/20'}`}></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="razor-divider"></div>

        {/* Join Section */}
        <section className="py-32 px-8 max-w-7xl mx-auto text-center" id="join">
          <h1 className="font-headline text-display-lg italic leading-none mb-16">
            Your campus.<br />
            <span className="text-on-surface-variant opacity-40">Less silent.</span>
          </h1>
          <div className="max-w-xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <input className="flex-grow bg-white/5 border border-white/10 text-on-surface px-6 py-4 focus:ring-0 focus:border-secondary transition-colors outline-none font-body rounded-lg" placeholder="University Email" type="email" />
              <Link href="/login" className="bg-primary-container text-white px-8 py-4 font-label uppercase tracking-widest hover:bg-primary-container/80 transition-all flex items-center justify-center gap-4 rounded-lg">
                Join Waitlist
                <span className="material-symbols-outlined font-light">arrow_right_alt</span>
              </Link>
            </div>
            <p className="text-[10px] font-label uppercase tracking-widest opacity-40">No spam. No data selling. Just early access.</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#050505] border-t border-white/5 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-8 max-w-7xl mx-auto">
          <div className="space-y-6">
            <div className="text-lg font-bold tracking-widest text-[#CCC3D8] uppercase">COGNIA</div>
            <p className="text-sm font-body text-on-surface-variant/60 max-w-xs leading-relaxed">
              Developing modern infrastructure for digital mental health. Built for university resilience and student privacy.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <span className="block uppercase Manrope tracking-widest text-[10px] text-white/40">Open Source</span>
              <Link className="block text-[#CCC3D8]/60 hover:text-[#06B6D4] transition-colors text-xs font-body" href="#">GitHub</Link>
              <Link className="block text-[#CCC3D8]/60 hover:text-[#06B6D4] transition-colors text-xs font-body" href="#">Documentation</Link>
            </div>
            <div className="space-y-4">
              <span className="block uppercase Manrope tracking-widest text-[10px] text-white/40">Product</span>
              <Link className="block text-[#CCC3D8]/60 hover:text-[#06B6D4] transition-colors text-xs font-body" href="#">Features</Link>
              <Link className="block text-[#CCC3D8]/60 hover:text-[#06B6D4] transition-colors text-xs font-body" href="#">Privacy</Link>
            </div>
            <div className="space-y-4">
              <span className="block uppercase Manrope tracking-widest text-[10px] text-white/40">Legal</span>
              <Link className="block text-[#CCC3D8]/60 hover:text-[#06B6D4] transition-colors text-xs font-body" href="#">Terms</Link>
              <Link className="block text-[#CCC3D8]/60 hover:text-[#06B6D4] transition-colors text-xs font-body" href="#">Security</Link>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-8 mt-12">
          <p className="text-[10px] font-label text-white/20 uppercase tracking-[0.2em] pt-8 border-t border-white/5">© 2024 COGNIA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
