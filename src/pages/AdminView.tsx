import { useEffect, useState } from 'react';
import { useStore } from '../store';
import { ADMIN_PIN, TEAMS, VALID_SCORES, type TeamName, type ValidScore, type Match, type MatchInsert } from '../types';
import StandingsTable from '../components/StandingsTable';
import MatchHistory from '../components/MatchHistory';
import { Lock, LogOut, PlusCircle, CalendarDays, Clock, Edit3, X, Settings2, CheckCircle2 } from 'lucide-react';
import { formatTanggalIndo } from '../utils/dateFormatter';
import type { FormEvent } from 'react';

/* ── Score Update Modal ────────────────────────── */
function ScoreModal({
  match,
  onClose,
  onSubmit,
}: {
  match: Match;
  onClose: () => void;
  onSubmit: (id: string, hs: number, as_: number) => void;
}) {
  const [score, setScore] = useState<ValidScore>('2-0');

  const handleSave = () => {
    const [h, a] = score.split('-').map(Number);
    onSubmit(match.id, h, a);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-purple-100 w-full max-w-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-glow-dark m-0">Update Skor</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-purple-50 text-glow-subtext cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center text-sm text-glow-subtext">
          <span className="font-medium text-glow-dark">{match.home_team}</span>
          {' vs '}
          <span className="font-medium text-glow-dark">{match.away_team}</span>
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

        <button
          onClick={handleSave}
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-glow-primary to-glow-light text-white font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer"
        >
          Simpan Skor
        </button>
      </div>
    </div>
  );
}

/* ── Edit Schedule Modal ───────────────────────── */
function EditScheduleModal({
  match,
  onClose,
  onSubmit,
}: {
  match: Match;
  onClose: () => void;
  onSubmit: (id: string, updates: Partial<MatchInsert>) => void;
}) {
  const [date, setDate] = useState(match.date);
  const [matchTime, setMatchTime] = useState(match.match_time);
  const [homeTeam, setHomeTeam] = useState<TeamName>(match.home_team);
  const [awayTeam, setAwayTeam] = useState<TeamName>(match.away_team);
  const [error, setError] = useState('');

  const handleSave = () => {
    if (homeTeam === awayTeam) {
      setError('Tim Home dan Away tidak boleh sama!');
      return;
    }
    onSubmit(match.id, {
      date,
      match_time: matchTime,
      home_team: homeTeam,
      away_team: awayTeam,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-purple-100 w-full max-w-sm p-4 sm:p-6 space-y-2 sm:space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-glow-dark m-0">Edit Jadwal</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-purple-50 text-glow-subtext cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-4">
          <div className="min-w-0">
            <label className="block text-xs sm:text-sm font-medium text-glow-dark mb-1">Tanggal</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="appearance-none m-0 w-full h-[42px] px-2 sm:px-3 rounded-xl border border-purple-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-glow-light text-xs sm:text-sm text-glow-dark min-w-0 truncate"
            />
          </div>
          <div className="min-w-0">
            <label className="block text-xs sm:text-sm font-medium text-glow-dark mb-1">Jam</label>
            <input
              type="time"
              value={matchTime}
              onChange={(e) => setMatchTime(e.target.value)}
              className="appearance-none m-0 w-full h-[42px] px-2 sm:px-3 rounded-xl border border-purple-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-glow-light text-xs sm:text-sm text-glow-dark min-w-0 truncate"
            />
          </div>
          <div className="min-w-0">
            <label className="block text-xs sm:text-sm font-medium text-glow-dark mb-1">Tim Home</label>
            <select
              value={homeTeam}
              onChange={(e) => setHomeTeam(e.target.value as TeamName)}
              className="appearance-none m-0 w-full h-[42px] px-2 sm:px-3 rounded-xl border border-purple-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-glow-light text-xs sm:text-sm text-glow-dark min-w-0 truncate"
            >
              {TEAMS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div className="min-w-0">
            <label className="block text-xs sm:text-sm font-medium text-glow-dark mb-1">Tim Away</label>
            <select
              value={awayTeam}
              onChange={(e) => setAwayTeam(e.target.value as TeamName)}
              className="appearance-none m-0 w-full h-[42px] px-2 sm:px-3 rounded-xl border border-purple-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-glow-light text-xs sm:text-sm text-glow-dark min-w-0 truncate"
            >
              {TEAMS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm font-medium m-0">{error}</p>}

        <button
          onClick={handleSave}
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-glow-primary to-glow-light text-white font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer"
        >
          Simpan Perubahan
        </button>
      </div>
    </div>
  );
}

/* ── Delete Confirm Modal ──────────────────────── */
function DeleteConfirmModal({
  onClose,
  onConfirm,
}: {
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-red-100 w-full max-w-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-glow-dark m-0">Hapus Pertandingan?</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-red-50 text-glow-subtext cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-sm text-glow-subtext">
          Tindakan ini tidak dapat dibatalkan. Apakah Anda yakin ingin menghapus data pertandingan ini?
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-gray-100 text-glow-dark font-semibold text-sm hover:bg-gray-200 transition-colors cursor-pointer"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-semibold text-sm hover:bg-red-600 transition-colors cursor-pointer"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Admin View ────────────────────────────────── */
export default function AdminView() {
  const { standings, matches, loading, error, fetchMatches, addMatch, updateScore, updateMatch, deleteMatch, isAdminAuthenticated, loginAdmin, logoutAdmin } =
    useStore();
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');

  // Form state
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [matchTime, setMatchTime] = useState('20:00');
  const [homeTeam, setHomeTeam] = useState<TeamName>(TEAMS[0]);
  const [awayTeam, setAwayTeam] = useState<TeamName>(TEAMS[1]);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Modals
  const [editingScoreMatch, setEditingScoreMatch] = useState<Match | null>(null);
  const [editingScheduleMatch, setEditingScheduleMatch] = useState<Match | null>(null);
  const [deletingMatchId, setDeletingMatchId] = useState<string | null>(null);

  // Toast
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    if (isAdminAuthenticated) fetchMatches();
  }, [isAdminAuthenticated, fetchMatches]);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      loginAdmin();
      setPinError('');
    } else {
      setPinError('PIN salah!');
    }
  };

  const validateTeams = (): boolean => {
    if (homeTeam === awayTeam) {
      setFormError('Tim Home dan Away tidak boleh sama!');
      return false;
    }
    setFormError('');
    return true;
  };

  const handleSaveSchedule = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateTeams()) return;

    setIsSubmitting(true);
    try {
      const success = await addMatch({
        date,
        home_team: homeTeam,
        away_team: awayTeam,
        home_score: null,
        away_score: null,
        match_time: matchTime,
        status: 'UPCOMING',
      });

      if (success) showToast('Jadwal berhasil ditambahkan!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateScore = async (id: string, hs: number, as_: number) => {
    const success = await updateScore(id, hs, as_);
    if (success) showToast('Skor berhasil disimpan!');
  };

  const handleUpdateSchedule = async (id: string, updates: Partial<MatchInsert>) => {
    const success = await updateMatch(id, updates);
    if (success) showToast('Jadwal berhasil diupdate!');
  };

  const confirmDelete = async () => {
    if (!deletingMatchId) return;
    const success = await deleteMatch(deletingMatchId);
    if (success) showToast('Data berhasil dihapus!');
    setDeletingMatchId(null);
  };

  /* ── PIN gate ─────────────────────────── */
  if (!isAdminAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-white/70 backdrop-blur-md border border-purple-100 shadow-lg rounded-2xl p-8 w-full max-w-md">
          <div className="flex flex-col items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-glow-primary/10 flex items-center justify-center">
              <Lock className="w-7 h-7 text-glow-primary" />
            </div>
            <h2 className="text-xl font-semibold text-glow-dark m-0">Admin Login</h2>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Masukkan PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-purple-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-glow-light text-center text-lg tracking-widest text-glow-dark placeholder:text-slate-500"
              autoFocus
            />
            {pinError && (
              <p className="text-red-500 text-sm text-center font-medium m-0">{pinError}</p>
            )}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-glow-primary to-glow-light text-white font-semibold hover:opacity-90 transition-opacity cursor-pointer"
            >
              Masuk
            </button>
          </form>
        </div>
      </div>
    );
  }

  const upcomingMatches = matches.filter((m) => m.status === 'UPCOMING');
  const completedMatches = matches.filter((m) => m.status === 'COMPLETED');

  /* ── Authenticated admin ──────────────── */
  return (
    <div className="space-y-8">
      {/* Logout bar */}
      <div className="flex justify-end">
        <button
          onClick={logoutAdmin}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-600 border border-red-100 text-sm font-medium hover:bg-red-100 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Match input form */}
      <div className="bg-white/70 backdrop-blur-md border border-purple-100 shadow-lg rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-purple-100 flex items-center gap-3">
          <PlusCircle className="w-5 h-5 text-glow-primary" />
          <h2 className="text-lg font-semibold text-glow-dark m-0">Input Pertandingan</h2>
        </div>

        <form className="p-4 sm:p-6 space-y-2 sm:space-y-4">
          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            <div className="min-w-0">
              <label className="block text-xs sm:text-sm font-medium text-glow-dark mb-1">Tanggal</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="appearance-none m-0 w-full h-[42px] px-2 sm:px-3 rounded-xl border border-purple-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-glow-light text-xs sm:text-sm text-glow-dark min-w-0 truncate"
              />
            </div>
            <div className="min-w-0">
              <label className="block text-xs sm:text-sm font-medium text-glow-dark mb-1">Jam</label>
              <input
                type="time"
                value={matchTime}
                onChange={(e) => setMatchTime(e.target.value)}
                required
                className="appearance-none m-0 w-full h-[42px] px-2 sm:px-3 rounded-xl border border-purple-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-glow-light text-xs sm:text-sm text-glow-dark min-w-0 truncate"
              />
            </div>
            <div className="min-w-0">
              <label className="block text-xs sm:text-sm font-medium text-glow-dark mb-1">Tim Home</label>
              <select
                value={homeTeam}
                onChange={(e) => setHomeTeam(e.target.value as TeamName)}
                className="appearance-none m-0 w-full h-[42px] px-2 sm:px-3 rounded-xl border border-purple-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-glow-light text-xs sm:text-sm text-glow-dark min-w-0 truncate"
              >
                {TEAMS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div className="min-w-0">
              <label className="block text-xs sm:text-sm font-medium text-glow-dark mb-1">Tim Away</label>
              <select
                value={awayTeam}
                onChange={(e) => setAwayTeam(e.target.value as TeamName)}
                className="appearance-none m-0 w-full h-[42px] px-2 sm:px-3 rounded-xl border border-purple-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-glow-light text-xs sm:text-sm text-glow-dark min-w-0 truncate"
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
            <p className="text-red-500 text-sm font-medium m-0">{formError}</p>
          )}

          <button
            type="button"
            onClick={handleSaveSchedule}
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-glow-primary to-glow-light text-white font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer mt-2"
          >
            {isSubmitting ? 'Menyimpan Jadwal...' : 'Simpan Jadwal'}
          </button>
        </form>
      </div>

      {/* Upcoming matches — admin can update score & schedule */}
      {upcomingMatches.length > 0 && (
        <div className="bg-white/70 backdrop-blur-md border border-purple-100 shadow-lg rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-purple-100 flex items-center gap-3">
            <CalendarDays className="w-5 h-5 text-glow-primary" />
            <h2 className="text-lg font-semibold text-glow-dark m-0">Jadwal Mendatang</h2>
          </div>
          <div className="p-4 grid gap-3 sm:grid-cols-2">
            {upcomingMatches.map((m) => (
              <div
                key={m.id}
                className="bg-white/80 border border-purple-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="flex items-center gap-2 text-xs text-glow-subtext mb-3">
                  <CalendarDays className="w-3.5 h-3.5" />
                  <span>{formatTanggalIndo(m.date)}</span>
                  <span className="mx-1">•</span>
                  <Clock className="w-3.5 h-3.5" />
                  <span>{m.match_time}</span>
                </div>

                <div className="flex items-center justify-between gap-3 mb-4">
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

                <div className="mt-auto pt-3 border-t border-purple-100 flex items-center gap-2">
                  <button
                    onClick={() => setEditingScheduleMatch(m)}
                    className="flex-1 flex items-center justify-center gap-1.5 p-2 rounded-lg text-glow-primary hover:bg-purple-50 transition-colors cursor-pointer text-xs font-medium"
                  >
                    <Settings2 className="w-4 h-4" /> Edit
                  </button>
                  <button
                    onClick={() => setEditingScoreMatch(m)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-glow-primary/10 text-glow-primary text-xs font-bold hover:bg-glow-primary hover:text-white transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Skor
                  </button>
                  <button
                    onClick={() => setDeletingMatchId(m.id)}
                    className="p-2 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                    title="Hapus"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Standings */}
      {loading && matches.length === 0 ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-glow-light border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          <StandingsTable standings={standings} />
          <MatchHistory matches={completedMatches} isAdmin onDelete={(id) => setDeletingMatchId(id)} onEditScore={(m) => setEditingScoreMatch(m)} />
        </>
      )}

      {/* Modals */}
      {editingScoreMatch && (
        <ScoreModal
          match={editingScoreMatch}
          onClose={() => setEditingScoreMatch(null)}
          onSubmit={handleUpdateScore}
        />
      )}
      {editingScheduleMatch && (
        <EditScheduleModal
          match={editingScheduleMatch}
          onClose={() => setEditingScheduleMatch(null)}
          onSubmit={handleUpdateSchedule}
        />
      )}
      {deletingMatchId && (
        <DeleteConfirmModal
          onClose={() => setDeletingMatchId(null)}
          onConfirm={confirmDelete}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-glow-dark text-white px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2 z-50 animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-5 h-5 text-green-400" />
          <span className="text-sm font-medium">{toast}</span>
        </div>
      )}
    </div>
  );
}
