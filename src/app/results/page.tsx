/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { EventTabs } from "@/components/ui/EventTabs";
import { LeaderboardCard } from "@/components/ui/LeaderboardCard";
import { Trophy } from "lucide-react";
import supabase from "../supabase-client";
import { EventLeaderboard } from "../types";
export default function Index() {
  const [events, setEvents] = useState<EventLeaderboard[]>([]);
  const [select, setSelect] = useState(0);
  const [first, setFirst] = useState<any[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const data = (await supabase.from("events").select("*")).data;
      setEvents(data || []);
      console.log(select);
      if (select) {
        const firstData = await supabase
          .from("winners")
          .select("*, events(event_name)")
          .eq("eventid", select);

        setFirst(firstData.data || []);
      }
    };
    fetch();
  }, [select, setSelect]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#030712] via-[#030712] to-slate-800 relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#1e293b,transparent)] opacity-50" />

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <Trophy className="w-8 h-8 text-orange-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Leaderboard
            </h1>
          </div>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Compete and climb the ranks across events
          </p>
        </div>

        {/* Event Tabs */}
        <div
          className="mb-8 animate-slide-up cursor-none"
          style={{ animationDelay: "100ms" }}
        >
          <EventTabs
            events={events}
            selectedEvent={select}
            onEventChange={setSelect}
            loading={false}
          />
        </div>

        {/* Leaderboard Container */}
        <div className="animate-slide-up" style={{ animationDelay: "200ms" }}>
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 md:p-8 shadow-2xl">
            {/* Current Event Header */}
            {select && (
              <div className="mb-8 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {events.find((e) => e.id === select)?.event_name}
                </h2>
                <p className="text-slate-400">Top 5 Performers</p>
              </div>
            )}

            <div className="space-y-3">
              {first.map((entry, index) => (
                <LeaderboardCard key={entry.id} entry={entry} index={index} />
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="text-center mt-8 text-slate-500 animate-fade-in"
          style={{ animationDelay: "300ms" }}
        >
          <p>&copy; 2025 Leaderboard 🟠 Syrian SpeedCubing Organization.</p>
        </div>
      </div>
    </div>
  );
}
