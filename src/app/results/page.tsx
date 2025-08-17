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
  const [day, setDay] = useState<number>(1);
  const [first, setFirst] = useState<any[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const data = (await supabase.from("events").select("*")).data;
      const days_filterd = data?.map((event) => {
        if (
          event.id === 17 ||
          event.id === 18 ||
          event.id === 19 ||
          event.id === 28
        ) {
          return { ...event, day: 1 };
        } else {
          return { ...event, day: 2 };
        }
      });
      if (day === 1) {
        setEvents(days_filterd?.filter((event) => event.day === 1) || []);
      } else if (day === 2) {
        setEvents(days_filterd?.filter((event) => event.day === 2) || []);
      }
    };
    fetch();
  }, [day]);
  async function getRound() {
    if ((select === 17 || select === 18) && round === 0) {
      setRound(1);
    } else if ((select === 17 || select === 18) && round !== 0) {
    } else {
      setRound(0);
    }
  }
  const fetchLeaderboard = async (select: number, round: number) => {
    if (!select) return;

    await getRound().then(async () => {
      const { data, error } = await supabase
        .from("winners")
        .select("*, events(event_name)")
        .eq("eventid", select)
        .eq("round", round);

      if (error) {
        console.error("Error fetching leaderboard:", error);
      } else {
        const filteredData = data.filter(
          (entry) => entry.average_time !== null
        );
        filteredData.map((entry) => {
          const totalSeconds = Number(entry.average_time);
          const minutes = Math.floor(totalSeconds / 60);
          const seconds = (totalSeconds % 60).toFixed(2);

          entry.average_time =
            String(minutes).padStart(2, "0") +
            ":" +
            String(seconds).padStart(5, "0");

          const totalSecondsBest = Number(entry.best_solve);
          const minutesBest = Math.floor(totalSecondsBest / 60);
          const secondsBest = (totalSecondsBest % 60).toFixed(2);

          entry.best_solve =
            String(minutesBest).padStart(2, "0") +
            ":" +
            String(secondsBest).padStart(5, "0");

          entry.solves = entry.solves.map((solve: string) => {
            const totalSeconds = Number(solve);
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = (totalSeconds % 60).toFixed(2);

            return (
              String(minutes).padStart(2, "0") +
              ":" +
              String(seconds).padStart(5, "0")
            );
          });
        });

        console.log(filteredData);
        setFirst(filteredData || []);
      }
    });
  };

  useEffect(() => {
    fetchLeaderboard(select, round);

    const interval = setInterval(() => {
      fetchLeaderboard(select, round);
    }, 2000);

    return () => clearInterval(interval);
  }, [select, round]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#030712] via-[#030712] to-slate-800 relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#1e293b,transparent)] opacity-50" />

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-3">
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
          className="mb-4 animate-slide-up cursor-none"
          style={{ animationDelay: "100ms" }}
        >
          <div className="mb-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="cursor-none" variant="secondary">
                  {day === 1 ? "Day 01 ▼" : day === 2 ? "Day 02 ▼" : ""}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="cursor-none">
                <DropdownMenuItem
                  className="cursor-none"
                  onClick={() => setDay(1)}
                >
                  Day 01
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-none"
                  onClick={() => setDay(2)}
                >
                  Day 02
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <EventTabs
            events={events}
            selectedEvent={select}
            onEventChange={setSelect}
            loading={false}
          />
        </div>

        {/* Leaderboard Container */}
        {select !== 0 && (
          <div className="animate-slide-up" style={{ animationDelay: "200ms" }}>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 md:p-8 shadow-2xl">
              {/* Current Event Header */}
              {select && (
                <>
                  <div className="mb-2 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
                      {events.find((e) => e.id === select)?.event_name} Event
                      {round !== 0 &&
                        (round === 1
                          ? " - Round #1"
                          : round === 2
                          ? " - Round #2"
                          : "")}
                    </h2>
                    <p className="text-slate-400">Top {round === 1 ? 10 : 3}</p>
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
                {first.length > 0 &&
                  first.map((entry, index) => {
                    return (
                      <LeaderboardCard
                        key={entry.id}
                        entry={entry}
                        index={index + 1}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        )}
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
