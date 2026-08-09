import { useState, type FormEvent } from 'react';
import { PlusCircle } from 'lucide-react';
import { TEAMS, VALID_SCORES, type TeamName, type ValidScore } from '../types';
import { useStore } from '../store';

export default function MatchForm() {
  const addMatch = useStore((s) => s.addMatch);
  const loading = useStore((s) => s.loading);

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [homeTeam, setHomeTeam] = useState<TeamName>(TEAMS[0]);
  const [awayTeam, setAwayTeam] = useState<TeamName>(TEAMS[1]);
  const [score, setScore] = useState<ValidScore>('2-0');
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (homeTeam === awayTeam) {
      setFormError('Tim Home dan Away tidak boleh sama!');
      return;
    }

    const [h, a] = score.split('-').map(Number);
    await addMatch({
      date,
      home_team: homeTeam,
      away_team: awayTeam,
      home_score: h,
      away_score: a,
    });
  };

  return (
    <div className="bg-white/70 backdrop-blur-md border border-purple-100 shadow-lg rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-purple-100 flex items-center gap-3">
        <PlusCircle className="w-5 h-5 text-glow-primary" />
        <h2 className="text-lg font-semibold text-glow-dark m-0">Input Pertandingan</h2>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-glow-dark mb-1">Tanggal</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-xl border border-purple-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-glow-light text-sm text-glow-dark"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-glow-dark mb-1">Skor (Set)</label>
            <select
              value={score}
              onChange={(e) => setScore(e.target.value as ValidScore)}
              className="w-full px-3 py-2 rounded-xl border border-purple-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-glow-light text-sm text-glow-dark"
            >
              {VALID_SCORES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-glow-dark mb-1">Tim Home</label>
            <select
              value={homeTeam}
              onChange={(e) => setHomeTeam(e.target.value as TeamName)}
              className="w-full px-3 py-2 rounded-xl border border-purple-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-glow-light text-sm text-glow-dark"
            >
              {TEAMS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-glow-dark mb-1">Tim Away</label>
            <select
              value={awayTeam}
              onChange={(e) => setAwayTeam(e.target.value as TeamName)}
              className="w-full px-3 py-2 rounded-xl border border-purple-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-glow-light text-sm text-glow-dark"
            >
              {TEAMS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {formError && (
          <p className="text-red-500 text-sm font-medium">{formError}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-glow-primary to-glow-light text-white font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
        >
          {loading ? 'Menyimpan...' : 'Simpan Pertandingan'}
        </button>
      </form>
    </div>
  );
}
