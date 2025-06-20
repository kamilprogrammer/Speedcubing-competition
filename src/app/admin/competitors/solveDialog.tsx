/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import supabase from "@/app/supabase-client";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  user: any;
};

export default function AddSolveDialog({ open, setOpen, user }: Props) {
  const [events, setEvents] = useState<{ id: number; event_name: string }[]>(
    []
  );
  const [eventId, setEventId] = useState("");
  const [time, setTime] = useState("");
  const [solveIndex, setSolveIndex] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("id, event_name");
      if (!error && data) setEvents(data);
    };

    fetchEvents();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.from("solves").insert([
      {
        time,
        userid: user.id,
        eventid: Number(eventId),
        solveindex: solveIndex,
      },
    ]);

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      // Reset and close
      setTime("");
      setSolveIndex(1);
      setEventId("");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className=" bg-[#0c0c0f] text-white border border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-white text-lg">Add Solve</DialogTitle>
          <DialogDescription className="text-gray-400">
            Fill in the solve details below.
          </DialogDescription>
          X
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Time */}
          <Input
            placeholder="Time (e.g. 12.34)"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="bg-[#1a1a1d] text-white border-gray-700"
            required
          />

          {/* Solve Index */}
          <Input
            placeholder="Solve Index"
            type="number"
            value={solveIndex}
            onChange={(e) => setSolveIndex(Number(e.target.value))}
            className="bg-[#1a1a1d] text-white border-gray-700"
            required
          />

          {/* Event select */}
          <Select value={eventId} onValueChange={setEventId}>
            <SelectTrigger className="bg-[#1a1a1d] border-gray-700 text-white">
              <SelectValue placeholder="Select Event" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a1d] text-white border-gray-700">
              {events.map((event) => (
                <SelectItem key={event.id} value={event.id.toString()}>
                  {event.event_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <DialogFooter className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              className="bg-[#161616]"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="cursor-none" disabled={loading}>
              {loading ? "Saving..." : "Add Solve"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
