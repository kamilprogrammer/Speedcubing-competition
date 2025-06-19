import { winner } from "../../app/types";
import { Crown, Medal, Award, Trophy, Clock, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface LeaderboardCardProps {
  entry: winner;
  index: number;
}

export function LeaderboardCard({ entry, index }: LeaderboardCardProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-amber-400" />;
      case 2:
        return <Medal className="w-5 h-5 text-slate-300" />;
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return <Trophy className="w-5 h-5 text-slate-500" />;
    }
  };

  const getRankStyles = (rank: number) => {
    switch (rank) {
      case 1:
        return {
          card: "bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border-amber-500/20 shadow-amber-500/10",
          avatar: "bg-gradient-to-r from-amber-500 to-yellow-500 text-white",
          rank: "bg-amber-500 text-white shadow-amber-500/25",
        };
      case 2:
        return {
          card: "bg-gradient-to-r from-slate-400/10 to-slate-300/10 border-slate-400/20 shadow-slate-400/10",
          avatar: "bg-gradient-to-r from-slate-400 to-slate-500 text-white",
          rank: "bg-slate-400 text-white shadow-slate-400/25",
        };
      case 3:
        return {
          card: "bg-gradient-to-r from-amber-600/10 to-amber-700/10 border-amber-600/20 shadow-amber-600/10",
          avatar: "bg-gradient-to-r from-amber-600 to-amber-700 text-white",
          rank: "bg-amber-600 text-white shadow-amber-600/25",
        };
      default:
        return {
          card: "bg-white/5 border-white/10 shadow-black/10",
          avatar: "bg-gradient-to-r from-slate-600 to-slate-700 text-white",
          rank: "bg-slate-600 text-white shadow-slate-600/25",
        };
    }
  };

  const styles = getRankStyles(entry.top);

  return (
    <div
      className={cn(
        "group relative p-5 rounded-xl border backdrop-blur-sm transition-all duration-500",
        "hover:scale-[1.02] hover:shadow-xl hover:shadow-black/20",
        styles.card
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center gap-4">
        {/* Rank */}
        <div
          className={cn(
            "flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold shadow-lg",
            styles.rank
          )}
        >
          {entry.top}
        </div>

        {/* Avatar */}
        <div
          className={cn(
            "flex items-center justify-center w-12 h-12 rounded-full text-md font-bold shadow-lg transition-transform group-hover:scale-110",
            styles.avatar
          )}
        >
          {entry.username[0]}
        </div>

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {getRankIcon(entry.top)}
            <h3 className="text-lg font-bold text-white truncate">
              {entry.username}
            </h3>
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-1">
              <Target className="w-4 h-4" />
              <span className="font-semibold text-slate-300">
                {entry.score.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span className="text-slate-400">{entry.best_solve + "s"}</span>
            </div>
          </div>
        </div>

        {/* Mobile rank indicator */}
        <div className="sm:hidden">{getRankIcon(entry.top)}</div>
      </div>

      {/* Shine effect for top 3 */}
      {entry.top <= 3 && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
    </div>
  );
}
