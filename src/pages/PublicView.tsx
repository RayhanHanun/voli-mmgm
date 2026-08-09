import { useEffect } from 'react';
import { useStore } from '../store';
import StandingsTable from '../components/StandingsTable';
import MatchHistory from '../components/MatchHistory';

export default function PublicView() {
  const { standings, matches, loading, error, fetchMatches } = useStore();

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  if (error) {
    return (
      <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
        {error}
      </div>
    );
  }

  if (loading && matches.length === 0) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-4 border-glow-light border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const completedMatches = matches.filter((m) => m.status === 'COMPLETED');

  return (
    <div className="space-y-8 w-full">
      <StandingsTable standings={standings} />
      <MatchHistory matches={completedMatches} />
    </div>
  );
}
