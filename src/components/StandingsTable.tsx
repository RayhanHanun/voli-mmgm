import { Trophy, Info } from 'lucide-react';
import type { Standing } from '../types';

interface Props {
  standings: Standing[];
}

export default function StandingsTable({ standings }: Props) {
  return (
    <div className="bg-white/70 backdrop-blur-md border border-purple-100 shadow-lg rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-purple-100 flex items-center gap-3">
        <Trophy className="w-5 h-5 text-glow-primary" />
        <h2 className="text-lg font-semibold text-glow-dark m-0">Klasemen</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-glow-dark text-white">
              <th className="px-4 py-3 text-left font-medium">#</th>
              <th className="px-4 py-3 text-left font-medium">Tim</th>
              <th className="px-4 py-3 text-center font-medium">Main</th>
              <th className="px-4 py-3 text-center font-medium">M</th>
              <th className="px-4 py-3 text-center font-medium">K</th>
              <th className="hidden sm:table-cell px-4 py-3 text-center font-medium">SW</th>
              <th className="hidden sm:table-cell px-4 py-3 text-center font-medium">SL</th>
              <th className="hidden sm:table-cell px-4 py-3 text-center font-medium">SD</th>
              <th className="px-4 py-3 text-center font-medium">Poin</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((s, i) => (
              <tr
                key={s.team}
                className={`border-b border-purple-50 transition-colors hover:bg-purple-50/50 ${
                  i < 3 ? 'bg-purple-50/30' : ''
                }`}
              >
                <td className="px-4 py-3 text-left">
                  {i === 0 ? (
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-yellow-400 text-white font-bold text-xs">
                      1
                    </span>
                  ) : i === 1 ? (
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-400 text-white font-bold text-xs">
                      2
                    </span>
                  ) : i === 2 ? (
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-700 text-white font-bold text-xs">
                      3
                    </span>
                  ) : (
                    <span className="inline-flex items-center justify-center w-7 h-7 text-glow-subtext font-medium text-xs">
                      {i + 1}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-left font-medium text-glow-dark">
                  {s.team}
                </td>
                <td className="px-4 py-3 text-center text-glow-subtext">{s.played}</td>
                <td className="px-4 py-3 text-center text-green-600 font-medium">{s.wins}</td>
                <td className="px-4 py-3 text-center text-red-500 font-medium">{s.losses}</td>
                <td className="hidden sm:table-cell px-4 py-3 text-center text-glow-subtext">{s.setsWon}</td>
                <td className="hidden sm:table-cell px-4 py-3 text-center text-glow-subtext">{s.setsLost}</td>
                <td className="hidden sm:table-cell px-4 py-3 text-center font-medium text-glow-dark">
                  {s.setDifference > 0 ? `+${s.setDifference}` : s.setDifference}
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="inline-flex items-center justify-center min-w-[2rem] px-2 py-1 rounded-full bg-glow-primary text-white font-bold text-xs">
                    {s.points}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Informasi sistem poin */}
      <div className="px-5 py-4 border-t border-purple-100 bg-purple-50/30">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-glow-primary mt-0.5 shrink-0" />
          <div className="text-xs text-glow-subtext space-y-1">
            <p className="m-0 font-semibold text-glow-dark">Sistem Poin:</p>
            <p className="m-0">Menang <span className="font-bold text-glow-dark">2–0</span> → Pemenang dapat <span className="font-bold text-green-600">3 poin</span>, yang kalah <span className="font-bold text-red-500">0 poin</span></p>
            <p className="m-0">Menang <span className="font-bold text-glow-dark">2–1</span> → Pemenang dapat <span className="font-bold text-green-600">2 poin</span>, yang kalah <span className="font-bold text-amber-600">1 poin</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
