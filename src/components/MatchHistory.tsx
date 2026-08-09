import { Calendar, Trash2 } from 'lucide-react';
import type { Match } from '../types';

interface Props {
  matches: Match[];
  isAdmin?: boolean;
  onDelete?: (id: string) => void;
}

export default function MatchHistory({ matches, isAdmin, onDelete }: Props) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-white/70 backdrop-blur-md border border-purple-100 shadow-lg rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-purple-100 flex items-center gap-3">
        <Calendar className="w-5 h-5 text-glow-primary" />
        <h2 className="text-lg font-semibold text-glow-dark m-0">Histori Pertandingan</h2>
      </div>

      {matches.length === 0 ? (
        <div className="px-6 py-12 text-center text-glow-subtext">
          Belum ada pertandingan tercatat.
        </div>
      ) : (
        <div className="divide-y divide-purple-50">
          {[...matches].reverse().map((m) => {
            const homeWin = m.home_score > m.away_score;
            return (
              <div
                key={m.id}
                className="px-6 py-4 flex items-center gap-4 hover:bg-purple-50/30 transition-colors"
              >
                <div className="text-xs text-glow-subtext min-w-[100px] shrink-0">
                  {formatDate(m.date)}
                </div>

                <div className="flex-1 flex items-center justify-center gap-3 text-sm">
                  <span
                    className={`text-right flex-1 ${
                      homeWin ? 'font-bold text-glow-dark' : 'text-glow-subtext'
                    }`}
                  >
                    {m.home_team}
                  </span>

                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-glow-dark text-white font-mono font-bold text-sm tracking-wider min-w-[60px] justify-center">
                    {m.home_score} - {m.away_score}
                  </span>

                  <span
                    className={`text-left flex-1 ${
                      !homeWin ? 'font-bold text-glow-dark' : 'text-glow-subtext'
                    }`}
                  >
                    {m.away_team}
                  </span>
                </div>

                {isAdmin && onDelete && (
                  <button
                    onClick={() => onDelete(m.id)}
                    className="p-2 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors shrink-0 cursor-pointer"
                    title="Hapus pertandingan"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
