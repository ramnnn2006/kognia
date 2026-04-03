"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface HeatmapSummary {
  block: string;
  room: number;
  avg_score: number;
  count: number;
}

const RoomGrid = () => {
  const [roomData, setRoomData] = useState<Record<number, HeatmapSummary>>({});
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/v1/heatmap/summary");
      if (res.ok) {
        const data: HeatmapSummary[] = await res.json();
        const indexed = data.reduce((acc, curr) => {
          acc[curr.room] = curr;
          return acc;
        }, {} as Record<number, HeatmapSummary>);
        setRoomData(indexed);
      }
    } catch (err) {
      console.error("Heatmap fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return <div className="h-96 w-full animate-pulse bg-white/5 rounded-2xl" />;

  const getRoomColor = (roomNo: number) => {
    const data = roomData[roomNo];
    if (!data) return "bg-white/[0.03] border-white/10 opacity-30";
    if (data.avg_score > 75) return "bg-error/30 border-error/50 shadow-[0_0_15px_rgba(255,180,171,0.2)]";
    if (data.avg_score > 40) return "bg-primary-container/20 border-primary-container/40 shadow-[0_0_10px_rgba(124,58,237,0.15)]";
    return "bg-secondary/10 border-secondary/20 shadow-[0_0_8px_rgba(76,215,246,0.1)]";
  };

  const rooms = Array.from({ length: 50 }, (_, i) => 200 + i);

  return (
    <div className="glass-card p-8 rounded-2xl w-full">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-2.5 h-2.5 rounded-full bg-error" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Block B · Floor 3 · Live View</span>
        </div>
        <div className="flex space-x-8 text-[10px] items-center">
             <span className="opacity-40 uppercase tracking-widest leading-none">
                {loading ? "Syncing..." : `${Object.keys(roomData).length} active signals`}
             </span>
            <div className="flex items-center space-x-2"><div className="w-1.5 h-1.5 rounded-full bg-error" /><span className="opacity-40 uppercase tracking-widest leading-none">High-Risk</span></div>
            <div className="flex items-center space-x-2"><div className="w-1.5 h-1.5 rounded-full bg-primary-container" /><span className="opacity-40 uppercase tracking-widest leading-none">Moderate</span></div>
            <div className="flex items-center space-x-2"><div className="w-1.5 h-1.5 rounded-full bg-secondary" /><span className="opacity-40 uppercase tracking-widest leading-none">Stable</span></div>
        </div>
      </div>

      <div className="grid grid-cols-5 md:grid-cols-10 gap-3 aspect-[21/9]">
        {rooms.map((roomNo) => {
          const data = roomData[roomNo];
          return (
            <motion.div key={roomNo} initial={{ opacity: 0 }} animate={{ opacity: 1 }} whileHover={data ? { scale: 1.1, zIndex: 10 } : {}} className={`rounded-sm border relative group transition-all duration-700 ${getRoomColor(roomNo)}`}>
              {data && (
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 glass-card rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface">Room {roomNo} · {Math.round(data.avg_score)} Avg Stress ({data.count} Users)</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default RoomGrid;
