import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from './supabaseClient';
import type { Match, MatchInsert, Standing, TeamName } from './types';
import { TEAMS } from './types';

interface StoreState {
  matches: Match[];
  standings: Standing[];
  loading: boolean;
  error: string | null;
  fetchMatches: () => Promise<void>;
  addMatch: (match: MatchInsert) => Promise<boolean>;
  updateScore: (id: string, home_score: number, away_score: number) => Promise<boolean>;
  updateMatch: (id: string, updates: Partial<MatchInsert>) => Promise<boolean>;
  deleteMatch: (id: string) => Promise<boolean>;
  isAdminAuthenticated: boolean;
  loginAdmin: () => void;
  logoutAdmin: () => void;
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

  // Only count COMPLETED matches with non-null scores
  const completed = matches.filter(
    (m) => m.status === 'COMPLETED' && m.home_score != null && m.away_score != null
  );

  for (const m of completed) {
    const home = map.get(m.home_team)!;
    const away = map.get(m.away_team)!;
    const hs = m.home_score!;
    const as_ = m.away_score!;

    home.played++;
    away.played++;
    home.setsWon += hs;
    home.setsLost += as_;
    away.setsWon += as_;
    away.setsLost += hs;

    if (hs > as_) {
      home.wins++;
      away.losses++;
      if (hs === 2 && as_ === 0) {
        home.points += 3;
      } else {
        home.points += 2;
        away.points += 1;
      }
    } else {
      away.wins++;
      home.losses++;
      if (as_ === 2 && hs === 0) {
        away.points += 3;
      } else {
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

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      matches: [],
      standings: [],
      loading: false,
      error: null,
      isAdminAuthenticated: false,
      loginAdmin: () => set({ isAdminAuthenticated: true }),
      logoutAdmin: () => set({ isAdminAuthenticated: false }),

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
      return false;
    }

    await get().fetchMatches();
    return true;
  },

  updateScore: async (id: string, home_score: number, away_score: number) => {
    set({ loading: true, error: null });
    const { error } = await supabase
      .from('matches')
      .update({ home_score, away_score, status: 'COMPLETED' })
      .eq('id', id);

    if (error) {
      set({ loading: false, error: error.message });
      return false;
    }

    await get().fetchMatches();
    return true;
  },

  updateMatch: async (id: string, updates: Partial<MatchInsert>) => {
    set({ loading: true, error: null });
    const { error } = await supabase
      .from('matches')
      .update(updates)
      .eq('id', id);

    if (error) {
      set({ loading: false, error: error.message });
      return false;
    }

    await get().fetchMatches();
    return true;
  },

  deleteMatch: async (id: string) => {
    set({ loading: true, error: null });
    const { error } = await supabase.from('matches').delete().eq('id', id);

    if (error) {
      set({ loading: false, error: error.message });
      return false;
    }

    await get().fetchMatches();
    return true;
  },
}),
    {
      name: 'glow-admin-session',
      partialize: (state) => ({ isAdminAuthenticated: state.isAdminAuthenticated }),
    }
  )
);
