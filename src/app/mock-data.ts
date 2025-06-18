// Mock data for the speedcubing competition management system

export interface Competitor {
  id: string;
  name: string;
  email: string;
  country: string;
  wcaId?: string;
  registrationDate: string;
  events: string[];
  averages: Record<string, number>;
}

export interface Event {
  id: string;
  name: string;
  format: string;
  rounds: number;
  timeLimit: number;
  cutoff?: number;
  participants: number;
}

export interface Solve {
  id: string;
  competitorId: string;
  eventId: string;
  round: number;
  attempt: number;
  time: number;
  penalty?: "DNF" | "+2";
  scramble: string;
  timestamp: string;
}

export interface DashboardStats {
  totalCompetitors: number;
  totalEvents: number;
  totalSolves: number;
  fastestSolve: {
    time: number;
    event: string;
    competitor: string;
  };
}

export interface ChartData {
  name: string;
  average: number;
  best: number;
}

// Mock competitors data
export const mockCompetitors: Competitor[] = [
  {
    id: "1",
    name: "Felix Zemdegs",
    email: "felix@speedcubing.com",
    country: "Australia",
    wcaId: "2009ZEMD01",
    registrationDate: "2024-01-15",
    events: ["3x3", "4x4", "5x5", "2x2"],
    averages: { "3x3": 7.23, "4x4": 28.45, "5x5": 52.31, "2x2": 2.1 },
  },
  {
    id: "2",
    name: "Max Park",
    email: "max@cubing.com",
    country: "USA",
    wcaId: "2012PARK03",
    registrationDate: "2024-01-16",
    events: ["3x3", "4x4", "5x5", "6x6", "7x7"],
    averages: {
      "3x3": 6.89,
      "4x4": 24.32,
      "5x5": 45.67,
      "6x6": 120.45,
      "7x7": 180.23,
    },
  },
  {
    id: "3",
    name: "Tymon Kolasiński",
    email: "tymon@speedcube.pl",
    country: "Poland",
    wcaId: "2013KOLA02",
    registrationDate: "2024-01-17",
    events: ["3x3", "2x2", "OH", "BLD"],
    averages: { "3x3": 7.56, "2x2": 1.89, OH: 12.34, BLD: 45.67 },
  },
  {
    id: "4",
    name: "Yusheng Du",
    email: "yusheng@cube.cn",
    country: "China",
    wcaId: "2014DUYU01",
    registrationDate: "2024-01-18",
    events: ["3x3", "4x4", "2x2"],
    averages: { "3x3": 8.12, "4x4": 32.45, "2x2": 2.34 },
  },
  {
    id: "5",
    name: "Matty Hiroto Inaba",
    email: "matty@japan-cube.jp",
    country: "Japan",
    wcaId: "2015INAB01",
    registrationDate: "2024-01-19",
    events: ["3x3", "5x5", "OH"],
    averages: { "3x3": 9.23, "5x5": 58.12, OH: 15.67 },
  },
];

// Mock events data
export const mockEvents: Event[] = [
  {
    id: "3x3",
    name: "3x3x3 Cube",
    format: "Average of 5",
    rounds: 3,
    timeLimit: 600,
    cutoff: 120,
    participants: 125,
  },
  {
    id: "2x2",
    name: "2x2x2 Cube",
    format: "Average of 5",
    rounds: 2,
    timeLimit: 300,
    cutoff: 60,
    participants: 89,
  },
  {
    id: "4x4",
    name: "4x4x4 Cube",
    format: "Average of 5",
    rounds: 2,
    timeLimit: 1200,
    cutoff: 240,
    participants: 67,
  },
  {
    id: "5x5",
    name: "5x5x5 Cube",
    format: "Average of 5",
    rounds: 2,
    timeLimit: 1800,
    cutoff: 360,
    participants: 45,
  },
  {
    id: "6x6",
    name: "6x6x6 Cube",
    format: "Mean of 3",
    rounds: 1,
    timeLimit: 2400,
    participants: 28,
  },
  {
    id: "7x7",
    name: "7x7x7 Cube",
    format: "Mean of 3",
    rounds: 1,
    timeLimit: 3600,
    participants: 23,
  },
  {
    id: "OH",
    name: "3x3x3 One-Handed",
    format: "Average of 5",
    rounds: 2,
    timeLimit: 900,
    cutoff: 180,
    participants: 72,
  },
  {
    id: "BLD",
    name: "3x3x3 Blindfolded",
    format: "Best of 3",
    rounds: 1,
    timeLimit: 1800,
    participants: 34,
  },
];

// Mock solves data
export const mockSolves: Solve[] = [
  {
    id: "1",
    competitorId: "1",
    eventId: "3x3",
    round: 1,
    attempt: 1,
    time: 7.23,
    scramble: "R U R' U' R U R' F R F'",
    timestamp: "2024-01-20T10:30:00Z",
  },
  {
    id: "2",
    competitorId: "2",
    eventId: "3x3",
    round: 1,
    attempt: 1,
    time: 6.89,
    scramble: "F R U' R' U' R U R' F'",
    timestamp: "2024-01-20T10:31:00Z",
  },
  {
    id: "3",
    competitorId: "3",
    eventId: "2x2",
    round: 1,
    attempt: 1,
    time: 1.89,
    scramble: "R U R' U' R U2 R'",
    timestamp: "2024-01-20T10:32:00Z",
  },
];

// Dashboard statistics
export const mockDashboardStats: DashboardStats = {
  totalCompetitors: mockCompetitors.length,
  totalEvents: mockEvents.length,
  totalSolves: 1247,
  fastestSolve: {
    time: 1.89,
    event: "2x2x2 Cube",
    competitor: "Tymon Kolasiński",
  },
};

// Chart data for average solve times by event
export const mockChartData: ChartData[] = [
  { name: "2x2", average: 3.45, best: 1.89 },
  { name: "3x3", average: 11.23, best: 6.89 },
  { name: "4x4", average: 45.67, best: 24.32 },
  { name: "5x5", average: 78.92, best: 45.67 },
  { name: "6x6", average: 165.43, best: 120.45 },
  { name: "7x7", average: 245.67, best: 180.23 },
  { name: "OH", average: 18.45, best: 12.34 },
  { name: "BLD", average: 89.23, best: 45.67 },
];

// Format time in seconds to MM:SS.ss or SS.ss format
export const formatTime = (timeInSeconds: number): string => {
  if (timeInSeconds >= 60) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = (timeInSeconds % 60).toFixed(2);
    return `${minutes}:${seconds.padStart(5, "0")}`;
  }
  return timeInSeconds.toFixed(2);
};

// Get country flag emoji
export const getCountryFlag = (country: string): string => {
  const flags: Record<string, string> = {
    Australia: "🇦🇺",
    USA: "🇺🇸",
    Poland: "🇵🇱",
    China: "🇨🇳",
    Japan: "🇯🇵",
    Germany: "🇩🇪",
    "United Kingdom": "🇬🇧",
    France: "🇫🇷",
    Canada: "🇨🇦",
    Brazil: "🇧🇷",
  };
  return flags[country] || "🌍";
};
