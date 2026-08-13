import { Calendar, Trash2, Edit3, Clock } from 'lucide-react';
import type { Match } from '../types';
import { formatTanggalIndo } from '../utils/dateFormatter';

interface Props {
  matches: Match[];
  isAdmin?: boolean;
  onDelete?: (id: string) => void;
  onEditScore?: (match: Match) => void;
}

export default function MatchHistory({ matches, isAdmin, onDelete, onEditScore }: Props) {
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
            const homeWin = (m.home_score ?? 0) > (m.away_score ?? 0);
            return (
              <div
                key={m.id}
                className="px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 hover:bg-purple-50/30 transition-colors"
              >
                <div className="flex items-center gap-1.5 text-xs text-glow-subtext sm:min-w-[170px] shrink-0 flex-wrap mb-1 sm:mb-0">
                  <span className="font-medium sm:font-normal">{formatTanggalIndo(m.date)}</span>
                  <span className="text-purple-300 hidden sm:inline">•</span>
                  <span className="flex items-center gap-1 bg-purple-50 sm:bg-transparent px-2 py-0.5 sm:p-0 rounded-md sm:rounded-none text-glow-dark sm:text-glow-subtext">
                    <Clock className="w-3 h-3" />
                    {m.match_time}
                  </span>
                </div>

                <div className="flex-1 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base py-2 sm:py-0">
                  <span
                    className={`text-right flex-1 ${
                      homeWin ? 'font-bold text-glow-dark' : 'text-glow-subtext'
                    }`}
                  >
                    {m.home_team}
                  </span>

                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-glow-dark text-white font-mono font-bold text-sm tracking-wider min-w-[60px] justify-center">
                    {m.home_score ?? '-'} - {m.away_score ?? '-'}
                  </span>

                  <span
                    className={`text-left flex-1 ${
                      !homeWin ? 'font-bold text-glow-dark' : 'text-glow-subtext'
                    }`}
                  >
                    {m.away_team}
                  </span>
                </div>

                {isAdmin && (
                  <div className="flex items-center justify-end gap-2 shrink-0 pt-2 sm:pt-0 border-t border-purple-50 sm:border-0 mt-2 sm:mt-0">
                    {onEditScore && (
                      <button
                        onClick={() => onEditScore(m)}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 rounded-lg bg-glow-primary/10 text-glow-primary text-xs font-bold hover:bg-glow-primary hover:text-white transition-colors cursor-pointer"
                        title="Edit Skor"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> Skor
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(m.id)}
                        className="p-2 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer flex justify-center border border-red-100 sm:border-transparent"
                        title="Hapus pertandingan"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
