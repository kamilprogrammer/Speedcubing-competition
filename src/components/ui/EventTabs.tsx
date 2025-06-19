import { cn } from "@/lib/utils";
import { EventLeaderboard } from "@/app/types";

interface EventTabsProps {
  events: EventLeaderboard[];
  selectedEvent: number | null;
  onEventChange: (eventId: number) => void;
  loading: boolean;
}

export function EventTabs({
  events,
  selectedEvent,
  onEventChange,
  loading,
}: EventTabsProps) {
  if (loading) {
    return (
      <div className="flex gap-2 flex-wrap">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-11 w-32 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-[length:1000px_100%] animate-shimmer rounded-lg"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-2 flex-wrap">
      {events.map((event) => (
        <button
          key={event.id}
          onClick={() => onEventChange(event.id)}
          className={cn(
            "px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 backdrop-blur-sm border",
            "hover:scale-105 hover:shadow-lg cursor-none",
            selectedEvent === event.id
              ? "bg-white/20 border-white/30 text-white shadow-lg"
              : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
          )}
        >
          {event.event_name}
        </button>
      ))}
    </div>
  );
}
