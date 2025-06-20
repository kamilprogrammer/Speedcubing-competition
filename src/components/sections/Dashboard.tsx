"use client";
import { Users, Trophy, Timer, Zap } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { useEffect, useState } from "react";
import supabase from "@/app/supabase-client";

export default function Dashboard() {
  const [totalCompetitors, setTotalCompetitors] = useState(0);
  const [totalEvents, setTotalEvents] = useState(0);
  const [totalSolves, setTotalSolves] = useState(0);
  const [fastestSolve, setFastestSolve] = useState({
    time: 1,
    event: "",
    competitor: "",
  });
  useEffect(() => {
    const fetch = async () => {
      const users = (await supabase.from("users").select("*")).data?.length;
      setTotalCompetitors(users || 0);

      const events = (await supabase.from("events").select("*")).data?.length;
      setTotalEvents(events || 0);

      const solves = (await supabase.from("solves").select("*")).data?.length;
      setTotalSolves(solves || 0);

      const fastest = await supabase
        .from("solves")
        .select("time, eventid, userid, events(event_name), users(username)")
        .order("time", { ascending: true });
      if (fastest.data && fastest.data.length > 0) {
        const validSolve = fastest.data.find(
          (solve) => solve.time !== "0" && solve.time !== 0
        );
        if (validSolve) {
          setFastestSolve({
            time: validSolve.time,
            event: validSolve.events[0]?.event_name || "",
            competitor: validSolve.users[0]?.username || "",
          });
        }
      }
    };

    fetch();
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the SpeedCubing Syrian competition Management System
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Competitors"
          value={totalCompetitors}
          description="Registered for competition"
          icon={Users}
        />
        <StatCard
          title="Active Events"
          value={totalEvents}
          description="Events in competition"
          icon={Trophy}
        />
        <StatCard
          title="Total Solves"
          value={totalSolves}
          description="Submitted this competition"
          icon={Timer}
        />
        <StatCard
          title="Fastest Solve"
          value={fastestSolve.time}
          description={`${fastestSolve.event} by ${fastestSolve.competitor}`}
          icon={Zap}
          className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20"
        />
      </div>
    </div>
  );
}
