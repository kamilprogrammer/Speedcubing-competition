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
  const [time2, setTime2] = useState("");
  const [time3, setTime3] = useState("");
  const [time4, setTime4] = useState("");
  const [time5, setTime5] = useState("");
  const [round, setRound] = useState<number>(0);
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

  useEffect(() => {
    if (open == false) {
      setTime("");
      setRound(0);
      setEventId("");
      setError(null);
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.from("solves").insert([
      {
        time,
        userid: user.id,
        eventid: Number(eventId),
        round: round,
      },
    ]);
    const solve2 = await supabase.from("solves").insert([
      {
        time: time2,
        userid: user.id,
        eventid: Number(eventId),
        round: round,
      },
    ]);
    if (time3 !== "" && time4 !== "" && time5 !== "") {
      const solve3 = await supabase.from("solves").insert([
        {
          time: time3,
          userid: user.id,
          eventid: Number(eventId),
          round: round,
        },
      ]);
      const solve4 = await supabase.from("solves").insert([
        {
          time: time4,
          userid: user.id,
          eventid: Number(eventId),
          round: round,
        },
      ]);
      const solve5 = await supabase.from("solves").insert([
        {
          time: time5,
          userid: user.id,
          eventid: Number(eventId),
          round: round,
        },
      ]);
      if (
        error ||
        solve2.error ||
        solve3.error ||
        solve4.error ||
        solve5.error
      ) {
        setError(
          (error?.message ||
            solve2.error?.message ||
            solve3.error?.message ||
            solve4.error?.message ||
            solve5.error?.message) ??
            null
        );
      } else {
        // Reset and close
        setTime("");
        setTime2("");
        setTime3("");
        setTime4("");
        setTime5("");
        setRound(0);
        setEventId("");
        setOpen(false);
      }
    }
    setLoading(false);

    if (error || solve2.error) {
      setError((error?.message || solve2.error?.message) ?? null);
    } else {
      // Reset and close
      setTime("");
      setTime2("");
      setTime3("");
      setTime4("");
      setTime5("");
      setRound(0);
      setEventId("");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className=" bg-[#0c0c0f] text-white border border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-white text-lg">Add a Solve</DialogTitle>
          <DialogDescription className="text-gray-400">
            Fill in the solve details below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Time */}
          <p className="text-gray-500 p-0 m-0 mb-1">Time:</p>
          <Input
            name="time"
            placeholder="Time (e.g. 12.34)"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="bg-[#1a1a1d] text-white border-gray-700"
            required
          />
          <p className="text-gray-500 p-0 m-0 mb-1">Time2:</p>
          <Input
            name="time2"
            placeholder="Time (e.g. 12.34)"
            value={time2}
            onChange={(e) => setTime2(e.target.value)}
            className="bg-[#1a1a1d] text-white border-gray-700"
            required
          />
          <p className="text-gray-500 p-0 m-0 mb-1">Time3:</p>
          <Input
            name="time3"
            placeholder="Time (e.g. 12.34)"
            value={time3}
            onChange={(e) => setTime3(e.target.value)}
            className="bg-[#1a1a1d] text-white border-gray-700"
          />
          <p className="text-gray-500 p-0 m-0 mb-1">Time4:</p>
          <Input
            name="time4"
            placeholder="Time (e.g. 12.34)"
            value={time4}
            onChange={(e) => setTime4(e.target.value)}
            className="bg-[#1a1a1d] text-white border-gray-700"
          />
          <p className="text-gray-500 p-0 m-0 mb-1">Time5:</p>
          <Input
            name="time5"
            placeholder="Time (e.g. 12.34)"
            value={time5}
            onChange={(e) => setTime5(e.target.value)}
            className="bg-[#1a1a1d] text-white border-gray-700"
          />

          {/* Round */}
          {(eventId === "17" || eventId === "18") && (
            <>
              <p className="text-gray-500 p-0 m-0 mb-1">Round:</p>
              <Input
                placeholder="Round"
                type="number"
                value={round}
                onChange={(e) => setRound(Number(e.target.value))}
                className="bg-[#1a1a1d] text-white border-gray-700"
                required
              />
            </>
          )}
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
