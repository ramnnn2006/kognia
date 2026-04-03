import React from "react";
import Link from "next/link";

export default function ParentLogin() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      <div className="glass-card p-16 rounded-3xl w-full max-w-md border-white/5 relative overflow-hidden backdrop-blur-2xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="mb-10 text-center">
            <span className="material-symbols-outlined text-4xl text-primary mb-4 font-light">family_restroom</span>
            <h1 className="font-headline text-4xl italic mb-2">Parent Portal</h1>
            <p className="text-[10px] uppercase tracking-[0.4em] opacity-40">Guardian Oversight Hub</p>
        </div>

        <form className="space-y-6">
           <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest opacity-40 font-bold italic">Student Reg ID Hash</label>
              <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-primary/50 transition-all font-body" placeholder="24BAIXXXX" required />
           </div>
           <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest opacity-40 font-bold italic">Pass-Keyword</label>
              <input type="password" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-primary/50 transition-all font-body font-mono" placeholder="••••••••" required />
           </div>
           <button type="submit" className="w-full bg-primary/80 hover:bg-primary text-on-primary font-bold py-5 rounded-2xl tracking-[0.2em] transition-all uppercase text-xs">
               Sync Ward Safety Markers
           </button>
        </form>

        <Link href="/login" className="mt-12 block text-center text-[10px] uppercase tracking-widest opacity-20 hover:opacity-100 transition-opacity">
           Switch Portal Node
        </Link>
      </div>
    </div>
  );
}
