/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";
import { Timer, Search } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import supabase from "@/app/supabase-client";
import { Solve } from "@/app/types";

export default function Solves() {
  const [solves, setSolves] = useState<Solve[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSolves, setFilteredSolves] = useState<Solve[]>(solves);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase
        .from("solves")
        .select("*, events(event_name), users(username)");

      if (error) {
        console.error("Error fetching users:", error);
        return;
      }
      setSolves(data);
    };

    fetch();
  }, []);

  const handleFilter = (eventName: string) => {
    const filtered = solves.filter(
      (item) => item.events.event_name === eventName
    );
    setFilteredSolves(filtered);
  };

  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    const sorted = [...filteredSolves].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredSolves(sorted);
  };

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

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search solves..."
              className="pl-10 cursor-none"
              value={searchTerm}
              onChange={(e) => {
                const term = e.target.value.toLowerCase();
                setSearchTerm(term);
                const filtered = solves.filter((solve) =>
                  `${solve.users.username} ${solve.events.event_name} Round ${solve.solveindex}`
                    .toLowerCase()
                    .includes(term)
                );
                setFilteredSolves(filtered);
              }}
            />
          </div>
          {solves.map((event) => (
            <Button
              key={event.id}
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm("");
                handleFilter(event.events.event_name);
              }}
              className="cursor-none"
            >
              {event.events.event_name}
            </Button>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setFilteredSolves(solves)}
            className="cursor-none"
          >
            Reset
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="admin-card p-4 bg-[#212121]">
          <div className="flex items-center gap-2">
            <Timer className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Total Solves</span>
          </div>
          <p className="text-2xl font-bold mt-2">{solves.length}</p>
        </div>
        <div className="admin-card p-4 bg-[#212121]">
          <div className="flex items-center gap-2">
            <Timer className="h-4 w-4 text-success-500" />
            <span className="text-sm font-medium">Best Single</span>
          </div>
          <p className="text-2xl font-bold mt-2">
            {Math.min(
              ...solves.map((s) => {
                if (s.time === "0") return Infinity;
                return parseFloat(Number(s.time).toFixed(2));
              })
            )}
          </p>
        </div>
        <div className="admin-card p-4 bg-[#212121]">
          <div className="flex items-center gap-2">
            <Timer className="h-4 w-4 text-warning-500" />
            <span className="text-sm font-medium">DNFs</span>
          </div>
          <p className="text-2xl font-bold mt-2">
            {solves.filter((s) => s.time === "0").length}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="admin-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                onClick={() => handleSort("competitorName")}
                className="cursor-none"
              >
                Competitor{" "}
                {sortConfig.key === "competitorName"
                  ? sortConfig.direction === "asc"
                    ? "🔼"
                    : "🔽"
                  : ""}
              </TableHead>
              <TableHead
                onClick={() => handleSort("eventName")}
                className="cursor-none"
              >
                Event{" "}
                {sortConfig.key === "eventName"
                  ? sortConfig.direction === "asc"
                    ? "🔼"
                    : "🔽"
                  : ""}
              </TableHead>
              <TableHead>Round</TableHead>
              <TableHead
                onClick={() => handleSort("time")}
                className="cursor-none"
              >
                Time{" "}
                {sortConfig.key === "time"
                  ? sortConfig.direction === "asc"
                    ? "🔼"
                    : "🔽"
                  : ""}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSolves.map((solve) => (
              <TableRow key={solve.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">
                  {solve.users.username}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{solve.events.event_name}</Badge>
                </TableCell>
                <TableCell>Round {solve.solveindex}</TableCell>
                <TableCell className="font-mono">{solve.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
