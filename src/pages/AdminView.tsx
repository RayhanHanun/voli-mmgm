import { useEffect, useState } from 'react';
import { useStore } from '../store';
import { ADMIN_PIN } from '../types';
import StandingsTable from '../components/StandingsTable';
import MatchHistory from '../components/MatchHistory';
import MatchForm from '../components/MatchForm';
import Header from '../components/Header';
import { Lock, LogOut } from 'lucide-react';

export default function AdminView() {
  const { standings, matches, loading, error, fetchMatches, deleteMatch } = useStore();
  const [authenticated, setAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');

  useEffect(() => {
    if (authenticated) fetchMatches();
  }, [authenticated, fetchMatches]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      setAuthenticated(true);
      setPinError('');
    } else {
      setPinError('PIN salah!');
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 flex items-center justify-center px-4">
        <div className="bg-white/70 backdrop-blur-md border border-purple-100 shadow-lg rounded-2xl p-8 w-full max-w-sm">
          <div className="flex flex-col items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-glow-primary/10 flex items-center justify-center">
              <Lock className="w-7 h-7 text-glow-primary" />
            </div>
            <h2 className="text-xl font-semibold text-glow-dark">Admin Login</h2>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Masukkan PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-purple-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-glow-light text-center text-lg tracking-widest text-glow-dark"
              autoFocus
            />
            {pinError && (
              <p className="text-red-500 text-sm text-center font-medium">{pinError}</p>
            )}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-glow-primary to-glow-light text-white font-semibold hover:opacity-90 transition-opacity cursor-pointer"
            >
              Masuk
            </button>
          </form>

          <a
            href="/"
            className="block text-center mt-4 text-sm text-glow-subtext hover:text-glow-primary transition-colors"
          >
            ← Kembali ke Klasemen
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <Header
        adminControls={
          <button
            onClick={() => setAuthenticated(false)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/60 border border-purple-200 text-sm text-glow-dark hover:bg-white/80 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        }
      />
      <main className="max-w-4xl mx-auto px-4 pb-12 space-y-8">
        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
            {error}
          </div>
        )}

        <MatchForm />

        {loading && matches.length === 0 ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-glow-light border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <StandingsTable standings={standings} />
            <MatchHistory matches={matches} isAdmin onDelete={deleteMatch} />
          </>
        )}
      </main>
    </div>
  );
}
