/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useState, useEffect } from "react";
import supabase from "@/app/supabase-client";
import { Button } from "@/components/ui/button";

export default function Events() {
  const [events, setEvents] = useState<any[]>([]);

  const deleteEvent = async (eventId: number) => {
    const { error } = await supabase.from("events").delete().eq("id", eventId);
    if (error) {
      console.error("Failed to delete event:", error.message);
      alert("Error deleting event");
    } else {
      // Optional: refetch events after deletion
      setEvents((prev) => prev.filter((e) => e.id !== eventId));
      alert("Event deleted successfully");
    }
  };
  useEffect(() => {
    const fetch = async () => {
      const data = (await supabase.from("events").select("*")).data;
      setEvents(data || []);
    };
    fetch();
  }, []);
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Events</h1>
          <p className="text-muted-foreground">
            Manage competition events and their settings
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Card key={event?.id} className="admin-card-hover">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Trophy className="h-8 w-8 text-primary" />
                <Badge variant="outline">{event.event_name}</Badge>
              </div>
              <CardTitle className="text-lg">{event?.event_name}</CardTitle>
              {/*              <CardDescription>
                {event} round{event.rounds > 1 ? "s" : ""}
              </CardDescription> */}{" "}
            </CardHeader>
            <CardFooter>
              <Button
                variant={"destructive"}
                className="w-full"
                onClick={() => {
                  deleteEvent(event.id);
                }}
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
