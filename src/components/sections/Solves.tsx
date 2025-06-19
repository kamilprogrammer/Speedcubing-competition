import { Timer, Search, Filter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  mockSolves,
  mockCompetitors,
  mockEvents,
  formatTime,
} from "@/lib/mock-data";

export default function Solves() {
  const getSolvesData = () => {
    return mockSolves.map((solve) => {
      const competitor = mockCompetitors.find(
        (c) => c.id === solve.competitorId,
      );
      const event = mockEvents.find((e) => e.id === solve.eventId);
      return {
        ...solve,
        competitorName: competitor?.name || "Unknown",
        eventName: event?.name || "Unknown Event",
      };
    });
  };

  const solvesData = getSolvesData();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Solves</h1>
          <p className="text-muted-foreground">
            View and manage all submitted solve times
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search solves..." className="pl-10" />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="admin-card p-4">
          <div className="flex items-center gap-2">
            <Timer className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Total Solves</span>
          </div>
          <p className="text-2xl font-bold mt-2">1,247</p>
          <p className="text-xs text-muted-foreground">Across all events</p>
        </div>
        <div className="admin-card p-4">
          <div className="flex items-center gap-2">
            <Timer className="h-4 w-4 text-success-500" />
            <span className="text-sm font-medium">Best Single</span>
          </div>
          <p className="text-2xl font-bold mt-2">1.89</p>
          <p className="text-xs text-muted-foreground">2x2x2 Cube</p>
        </div>
        <div className="admin-card p-4">
          <div className="flex items-center gap-2">
            <Timer className="h-4 w-4 text-warning-500" />
            <span className="text-sm font-medium">DNFs</span>
          </div>
          <p className="text-2xl font-bold mt-2">23</p>
          <p className="text-xs text-muted-foreground">1.8% of all solves</p>
        </div>
        <div className="admin-card p-4">
          <div className="flex items-center gap-2">
            <Timer className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">+2 Penalties</span>
          </div>
          <p className="text-2xl font-bold mt-2">87</p>
          <p className="text-xs text-muted-foreground">7.0% of all solves</p>
        </div>
      </div>

      {/* Solves Table */}
      <div className="admin-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Competitor</TableHead>
              <TableHead>Event</TableHead>
              <TableHead>Round</TableHead>
              <TableHead>Attempt</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Scramble</TableHead>
              <TableHead>Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {solvesData.map((solve) => (
              <TableRow key={solve.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">
                  {solve.competitorName}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{solve.eventId}</Badge>
                </TableCell>
                <TableCell>Round {solve.round}</TableCell>
                <TableCell>{solve.attempt}</TableCell>
                <TableCell className="font-mono">
                  <div className="flex items-center gap-2">
                    <span
                      className={
                        solve.penalty ? "text-destructive" : "text-success-600"
                      }
                    >
                      {formatTime(solve.time)}
                    </span>
                    {solve.penalty && (
                      <Badge variant="destructive" className="text-xs">
                        {solve.penalty}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="max-w-[200px] truncate text-sm font-mono">
                  {solve.scramble}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(solve.timestamp).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
