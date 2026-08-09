export const TEAMS = [
  'Malam Senin',
  'Malam Selasa',
  'Malam Rabu',
  'Malam Kamis',
  'Malam Jumat',
  'Malam Sabtu',
  'Malam Minggu',
] as const;

export type TeamName = (typeof TEAMS)[number];

export interface Match {
  id: string;
  date: string;
  home_team: TeamName;
  away_team: TeamName;
  home_score: number;
  away_score: number;
  created_at: string;
}

export interface MatchInsert {
  date: string;
  home_team: TeamName;
  away_team: TeamName;
  home_score: number;
  away_score: number;
}

export interface Standing {
  team: TeamName;
  played: number;
  wins: number;
  losses: number;
  points: number;
  setsWon: number;
  setsLost: number;
  setDifference: number;
}

export type ValidScore = '2-0' | '0-2' | '2-1' | '1-2';

export const VALID_SCORES: ValidScore[] = ['2-0', '2-1', '1-2', '0-2'];

export const ADMIN_PIN = '170826';
