/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { EventTabs } from "@/components/ui/EventTabs";
import { LeaderboardCard } from "@/components/ui/LeaderboardCard";
import { Trophy } from "lucide-react";
import supabase from "../supabase-client";
import { EventLeaderboard } from "../types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
export default function Index() {
  const [events, setEvents] = useState<EventLeaderboard[]>([]);
  const [select, setSelect] = useState(0);
  const [round, setRound] = useState<number>(0);
  const [first, setFirst] = useState<any[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const data = (await supabase.from("events").select("*")).data;
      setEvents(data || []);
    };
    fetch();
  }, []);
  async function getRound() {
    if ((select === 17 || select === 18) && round === 0) {
      setRound(1);
    } else if ((select === 17 || select === 18) && round !== 0) {
    } else {
      setRound(0);
    }
  }
  useEffect(() => {
    const fetch = async () => {
      if (select) {
        await getRound().then(async () => {
          const firstData = await supabase
            .from("winners")
            .select("*, events(event_name)")
            .eq("eventid", select)
            .limit(round === 1 ? 10 : 3);

          console.log(firstData);
          const filteredData = firstData.data?.filter((e) => e.round === round);
          console.log(filteredData);
          setFirst(filteredData || []);
        });
      }
    };
    fetch();
  }, [select, round]);
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
              <>
                <div className="mb-2 text-center">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
                    {events.find((e) => e.id === select)?.event_name} Event
                    {round === 1
                      ? " - Round #1"
                      : round === 2
                      ? " - Round #2"
                      : ""}
                  </h2>
                  <p className="text-slate-400">
                    Top {round === 1 ? 10 : 3} Leaders
                  </p>
                </div>
                {(round == 1 || round == 2) &&
                  (select == 17 || select == 18) && (
                    <div className="flex justify-start mb-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button className="cursor-none" variant="secondary">
                            {round === 1
                              ? "Round 1"
                              : round === 2
                              ? "Round 2"
                              : ""}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="cursor-none">
                          <DropdownMenuItem
                            className="cursor-none"
                            onClick={() => setRound(1)}
                          >
                            Round 1
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-none"
                            onClick={() => setRound(2)}
                          >
                            Round 2
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}
              </>
            )}

            <div className="space-y-3">
              {first.map((entry, index) => (
                <LeaderboardCard
                  key={entry.id}
                  entry={entry}
                  index={index + 1}
                />
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
