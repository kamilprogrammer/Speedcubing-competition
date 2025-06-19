export interface User {
  id: number;
  username: string;
  solves: {
    event: {
      id: number;
      event_name: string;
    };
  }[];
}
export interface Event {
  id: number;
  event_name: string;
  solves: {
    user: {
      id: number;
      username: string;
    };
    time: number;
  }[];
}
export interface Solve {
  id: number;
  user_id: number;
  event_id: number;
  time: string;
  solveindex: number;
  events: { event_name: string };
  users: { username: string };
}
export interface winner {
  id: number;
  username: string;
  best_solve: string;
  event_name: string;
  top: number;
  score: number;
}
export interface EventLeaderboard {
  id: number;
  event_name: string;
}
