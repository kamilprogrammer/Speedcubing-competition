import { Users, Trophy, Timer, Zap } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { mockDashboardStats, formatTime } from "..//..//app/mock-data";

export default function Dashboard() {
  const stats = mockDashboardStats;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the CubeComp competition management system
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Competitors"
          value={stats.totalCompetitors}
          description="Registered for competition"
          icon={Users}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Active Events"
          value={stats.totalEvents}
          description="Events in competition"
          icon={Trophy}
          trend={{ value: 0, isPositive: true }}
        />
        <StatCard
          title="Total Solves"
          value={stats.totalSolves.toLocaleString()}
          description="Submitted this competition"
          icon={Timer}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Fastest Solve"
          value={`${formatTime(stats.fastestSolve.time)}`}
          description={`${stats.fastestSolve.event} by ${stats.fastestSolve.competitor}`}
          icon={Zap}
          className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20"
        />
      </div>
    </div>
  );
}
