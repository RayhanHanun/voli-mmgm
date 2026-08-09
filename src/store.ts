import { create } from 'zustand';
import { supabase } from './supabaseClient';
import type { Match, MatchInsert, Standing, TeamName } from './types';
import { TEAMS } from './types';

interface StoreState {
  matches: Match[];
  standings: Standing[];
  loading: boolean;
  error: string | null;
  fetchMatches: () => Promise<void>;
  addMatch: (match: MatchInsert) => Promise<void>;
  deleteMatch: (id: string) => Promise<void>;
}

function calculateStandings(matches: Match[]): Standing[] {
  const map = new Map<TeamName, Standing>();

  for (const team of TEAMS) {
    map.set(team, {
      team,
      played: 0,
      wins: 0,
      losses: 0,
      points: 0,
      setsWon: 0,
      setsLost: 0,
      setDifference: 0,
    });
  }

  for (const m of matches) {
    const home = map.get(m.home_team)!;
    const away = map.get(m.away_team)!;

    home.played++;
    away.played++;
    home.setsWon += m.home_score;
    home.setsLost += m.away_score;
    away.setsWon += m.away_score;
    away.setsLost += m.home_score;

    if (m.home_score > m.away_score) {
      // Home wins
      home.wins++;
      away.losses++;
      if (m.home_score === 2 && m.away_score === 0) {
        home.points += 3;
        // away gets 0
      } else {
        // 2-1
        home.points += 2;
        away.points += 1;
      }
    } else {
      // Away wins
      away.wins++;
      home.losses++;
      if (m.away_score === 2 && m.home_score === 0) {
        away.points += 3;
        // home gets 0
      } else {
        // 2-1 for away
        away.points += 2;
        home.points += 1;
      }
    }
  }

  const standings = Array.from(map.values());
  for (const s of standings) {
    s.setDifference = s.setsWon - s.setsLost;
  }

  standings.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.setDifference !== a.setDifference) return b.setDifference - a.setDifference;
    return b.setsWon - a.setsWon;
  });

  return standings;
}

export const useStore = create<StoreState>((set, get) => ({
  matches: [],
  standings: [],
  loading: false,
  error: null,

  fetchMatches: async () => {
    set({ loading: true, error: null });
    const { data, error } = await supabase
      .from('matches')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      set({ loading: false, error: error.message });
      return;
    }

    const matches = (data ?? []) as Match[];
    set({ matches, standings: calculateStandings(matches), loading: false });
  },

  addMatch: async (match: MatchInsert) => {
    set({ loading: true, error: null });
    const { error } = await supabase.from('matches').insert(match);

    if (error) {
      set({ loading: false, error: error.message });
      return;
    }

    await get().fetchMatches();
  },

  deleteMatch: async (id: string) => {
    set({ loading: true, error: null });
    const { error } = await supabase.from('matches').delete().eq('id', id);

    if (error) {
      set({ loading: false, error: error.message });
      return;
    }

    await get().fetchMatches();
  },
}));
