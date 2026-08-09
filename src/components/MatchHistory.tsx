import { Calendar, Trash2 } from 'lucide-react';
import type { Match } from '../types';
import { formatTanggalIndo } from '../utils/dateFormatter';

interface Props {
  matches: Match[];
  isAdmin?: boolean;
  onDelete?: (id: string) => void;
}

export default function MatchHistory({ matches, isAdmin, onDelete }: Props) {
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
                <div className="flex items-center justify-between sm:justify-start sm:flex-col sm:items-start text-xs text-glow-subtext sm:min-w-[170px] shrink-0">
                  <div className="font-medium sm:font-normal">{formatTanggalIndo(m.date)}</div>
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

                {isAdmin && onDelete && (
                  <div className="flex items-center justify-end shrink-0 pt-2 sm:pt-0 border-t border-purple-50 sm:border-0 mt-2 sm:mt-0">
                    <button
                      onClick={() => onDelete(m.id)}
                      className="p-2 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer w-full sm:w-auto flex justify-center border border-red-100 sm:border-transparent"
                      title="Hapus pertandingan"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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
