import { useEffect } from 'react';
import { useStore } from '../store';
import StandingsTable from '../components/StandingsTable';
import MatchHistory from '../components/MatchHistory';
import Header from '../components/Header';

export default function PublicView() {
  const { standings, matches, loading, error, fetchMatches } = useStore();

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <Header />
      <main className="max-w-4xl mx-auto px-4 pb-12 space-y-8">
        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
            {error}
          </div>
        )}

        {loading && matches.length === 0 ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-glow-light border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <StandingsTable standings={standings} />
            <MatchHistory matches={matches} />
          </>
        )}
      </main>
    </div>
  );
}
