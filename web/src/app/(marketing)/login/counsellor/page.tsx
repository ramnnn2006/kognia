import React from "react";
import Link from "next/link";

export default function CounsellorLogin() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 text-on-surface">
      <div className="glass-card p-16 rounded-3xl w-full max-w-md border-white/5 relative overflow-hidden backdrop-blur-2xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-tertiary/50 to-transparent" />
        <div className="mb-10 text-center">
            <span className="material-symbols-outlined text-4xl text-tertiary mb-4 font-light">history_edu</span>
            <h1 className="font-headline text-4xl italic mb-2">Counsellor Gateway</h1>
            <p className="text-[10px] uppercase tracking-[0.4em] opacity-40">Psychiatric Intervention Hub</p>
        </div>

        <form className="space-y-6">
           <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest opacity-40 font-bold italic">Liaison ID</label>
              <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-tertiary/50 transition-all font-body" placeholder="L-9923" required />
           </div>
           <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest opacity-40 font-bold italic">Verification-Key</label>
              <input type="password" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-tertiary/50 transition-all font-body font-mono" placeholder="••••••••" required />
           </div>
           <button type="submit" className="w-full bg-tertiary/80 hover:bg-tertiary text-on-surface font-bold py-5 rounded-2xl tracking-[0.2em] transition-all uppercase text-xs">
               Sync Clinical Data Nodes
           </button>
        </form>

        <Link href="/login" className="mt-12 block text-center text-[10px] uppercase tracking-widest opacity-20 hover:opacity-100 transition-opacity">
           Switch Identity Node
        </Link>
      </div>
    </div>
  );
}
