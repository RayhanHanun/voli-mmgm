import { useEffect } from 'react';
import { useStore } from '../store';
import { CalendarDays, Clock, Trophy, Inbox } from 'lucide-react';
import { formatTanggalIndo } from '../utils/dateFormatter';

export default function ScheduleView() {
  const { matches, loading, fetchMatches } = useStore();

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  const upcoming = matches.filter((m) => m.status === 'UPCOMING');
  const completed = matches.filter((m) => m.status === 'COMPLETED');

  if (loading && matches.length === 0) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-4 border-glow-light border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Upcoming */}
      <div className="bg-white/70 backdrop-blur-md border border-purple-100 shadow-lg rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-purple-100 flex items-center gap-3">
          <CalendarDays className="w-5 h-5 text-glow-primary" />
          <h2 className="text-lg font-semibold text-glow-dark m-0">Jadwal Mendatang</h2>
        </div>

        {upcoming.length === 0 ? (
          <div className="px-6 py-12 flex flex-col items-center gap-3 text-glow-subtext">
            <Inbox className="w-10 h-10 opacity-40" />
            <p className="text-sm m-0">Belum ada jadwal pertandingan.</p>
          </div>
        ) : (
          <div className="p-4 grid gap-3 sm:grid-cols-2">
            {upcoming.map((m) => (
              <div
                key={m.id}
                className="bg-white/80 border border-purple-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 text-xs text-glow-subtext mb-3">
                  <CalendarDays className="w-3.5 h-3.5" />
                  <span>{formatTanggalIndo(m.date)}</span>
                  <span className="mx-1">•</span>
                  <Clock className="w-3.5 h-3.5" />
                  <span>{m.match_time}</span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-glow-dark flex-1 text-center">
                    {m.home_team}
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-glow-light/20 text-glow-primary text-xs font-bold">
                    VS
                  </span>
                  <span className="text-sm font-semibold text-glow-dark flex-1 text-center">
                    {m.away_team}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Completed */}
      <div className="bg-white/70 backdrop-blur-md border border-purple-100 shadow-lg rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-purple-100 flex items-center gap-3">
          <Trophy className="w-5 h-5 text-glow-primary" />
          <h2 className="text-lg font-semibold text-glow-dark m-0">Hasil Pertandingan</h2>
        </div>

        {completed.length === 0 ? (
          <div className="px-6 py-12 flex flex-col items-center gap-3 text-glow-subtext">
            <Inbox className="w-10 h-10 opacity-40" />
            <p className="text-sm m-0">Belum ada hasil pertandingan.</p>
          </div>
        ) : (
          <div className="divide-y divide-purple-50">
            {[...completed].reverse().map((m) => {
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
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
