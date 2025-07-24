"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import AddCompetitorDialog from "./dialog";
import AddSolveDialog from "./solveDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import supabase from "@/app/supabase-client";
import { User } from "@/app/types";
import { useRouter } from "next/navigation";
export default function Competitors() {
  const [open, setOpen] = useState(false);
  const [solveopen, setSolveOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [competitors, setCompetitors] = useState<User[]>([]);
  const [selected, setSelected] = useState<User | null>(null);
  const router = useRouter();
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      router.replace("/not-authorized");
    }
  }, [router]);
  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase
        .from("users")
        .select(
          `
          id,
          username,
          solves (
            event:events (
              id,
              event_name
            )
          )
        `
        )
        .returns<User[]>();

      data?.forEach((c) => {
        const seen = new Set();
        c.solves = c.solves.filter((s) => {
          const isDuplicate = seen.has(s.event.id);
          seen.add(s.event.id);
          return !isDuplicate;
        });
      });
      setCompetitors(data ?? []);

      if (error) {
        console.error("Error fetching users:", error);
        return;
      }
    };

    fetch();
  }, []);
  const filtered = competitors.filter((c) => {
    const lower = search.toLowerCase();
    return (
      c.username.toLowerCase().includes(lower) ||
      c.solves.some((solve) =>
        solve.event.event_name.toLowerCase().includes(lower)
      )
    );
  });
  const del = async (id: number) => {
    const { error } = await supabase.from("users").delete().eq("id", id);
    if (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Competitors</h1>
          <p className="text-muted-foreground">
            Manage registered competitors and their information
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search competitors..."
              className="pl-10"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>
          <Button
            variant="default"
            onClick={() => setOpen(true)}
            className="px-4 py-2 cursor-none"
          >
            Add Competitor
          </Button>

          <AddCompetitorDialog open={open} setOpen={setOpen} />
        </div>
      </div>

      {/* Competitors Table */}
      <div className="admin-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Events</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((competitor) => (
              <TableRow key={competitor.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">
                  <p>{competitor.username}</p>
                </TableCell>

                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {competitor.solves.map((solve) => (
                      <Badge
                        key={solve.event.id}
                        variant="secondary"
                        className="text-xs"
                      >
                        {solve.event.event_name}
                      </Badge>
                    ))}
                    {competitor.solves.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{competitor.solves.length - 3}
                      </Badge>
                    )}
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="default"
                      className="cursor-none"
                      size="sm"
                      onClick={() => {
                        setSelected(competitor);
                        setSolveOpen(true);
                      }}
                    >
                      Add
                    </Button>
                    <AddSolveDialog
                      open={solveopen}
                      setOpen={setSolveOpen}
                      user={selected}
                    />
                    <Button
                      variant="secondary"
                      className="bg-red-700 cursor-none"
                      size="sm"
                      onClick={() => {
                        del(competitor.id);
                        setCompetitors(
                          competitors.filter((c) => c.id !== competitor.id)
                        );
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
