import { Trophy, Users, Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mockEvents } from "@/lib/mock-data";

export default function Events() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Events</h1>
          <p className="text-muted-foreground">
            Manage competition events and their settings
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockEvents.map((event) => (
          <Card key={event.id} className="admin-card-hover">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Trophy className="h-8 w-8 text-primary" />
                <Badge variant="outline">{event.format}</Badge>
              </div>
              <CardTitle className="text-lg">{event.name}</CardTitle>
              <CardDescription>
                {event.rounds} round{event.rounds > 1 ? "s" : ""}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Participants</span>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span className="font-medium">{event.participants}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Time Limit</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span className="font-medium">
                      {Math.floor(event.timeLimit / 60)}:00
                    </span>
                  </div>
                </div>
                {event.cutoff && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Cutoff</span>
                    <span className="font-medium">
                      {Math.floor(event.cutoff / 60)}:00
                    </span>
                  </div>
                )}
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Results
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
