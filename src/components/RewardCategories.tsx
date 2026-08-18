import { Trophy, Medal } from 'lucide-react';

const REWARDS = [
  {
    icon: Trophy,
    label: 'JUARA I',
    title: 'CHAMPION',
    iconBg: 'bg-gradient-to-br from-yellow-300 via-amber-400 to-yellow-600',
    cardBg: 'bg-gradient-to-br from-yellow-50 via-amber-50/80 to-orange-50/60',
    borderColor: 'border-amber-400/80',
    glowColor: 'hover:shadow-[0_8px_40px_rgba(251,191,36,0.35)] active:shadow-[0_8px_40px_rgba(251,191,36,0.35)]',
    ringColor: 'ring-yellow-300/50',
    pulseColor: 'bg-yellow-400/20',
    titleColor: 'text-amber-800',
  },
  {
    icon: Trophy,
    label: 'JUARA II',
    title: 'RUNNER UP',
    iconBg: 'bg-gradient-to-br from-slate-200 via-gray-300 to-slate-500',
    cardBg: 'bg-gradient-to-br from-slate-50 via-gray-50/80 to-slate-100/60',
    borderColor: 'border-slate-400/80',
    glowColor: 'hover:shadow-[0_8px_40px_rgba(148,163,184,0.35)] active:shadow-[0_8px_40px_rgba(148,163,184,0.35)]',
    ringColor: 'ring-slate-300/50',
    pulseColor: 'bg-slate-300/20',
    titleColor: 'text-slate-700',
  },
  {
    icon: Trophy,
    label: 'JUARA III',
    title: 'THIRD PLACE',
    iconBg: 'bg-gradient-to-br from-amber-500 via-orange-600 to-amber-800',
    cardBg: 'bg-gradient-to-br from-orange-50 via-amber-50/80 to-yellow-50/60',
    borderColor: 'border-amber-500/40',
    glowColor: 'hover:shadow-[0_8px_40px_rgba(180,83,9,0.3)] active:shadow-[0_8px_40px_rgba(180,83,9,0.3)]',
    ringColor: 'ring-amber-500/40',
    pulseColor: 'bg-amber-500/15',
    titleColor: 'text-amber-900',
  },
  {
    icon: Medal,
    label: 'TIM SPORTIF',
    title: 'FAIR PLAY AWARD',
    iconBg: 'bg-gradient-to-br from-emerald-300 via-green-400 to-teal-600',
    cardBg: 'bg-gradient-to-br from-emerald-50 via-green-50/80 to-teal-50/60',
    borderColor: 'border-emerald-400/50',
    glowColor: 'hover:shadow-[0_8px_40px_rgba(52,211,153,0.35)] active:shadow-[0_8px_40px_rgba(52,211,153,0.35)]',
    ringColor: 'ring-emerald-400/40',
    pulseColor: 'bg-emerald-400/15',
    titleColor: 'text-emerald-800',
  },
] as const;

export default function RewardCategories() {
  return (
    <div className="bg-white/70 backdrop-blur-md border border-purple-100 shadow-lg rounded-2xl overflow-hidden">
      {/* Section Header */}
      <div className="px-6 py-4 border-b border-purple-100 flex items-center gap-3">
        <Medal className="w-5 h-5 text-glow-primary" />
        <h2 className="text-lg font-semibold text-glow-dark m-0">Kategori Penghargaan</h2>
      </div>

      {/* Cards Grid */}
      <div className="p-4 sm:p-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {REWARDS.map(({ icon: Icon, label, title, iconBg, cardBg, borderColor, glowColor, ringColor, pulseColor, titleColor }, i) => (
          <div
            key={label}
            tabIndex={0}
            className={`group relative overflow-hidden ${cardBg} backdrop-blur-xl border-2 ${borderColor} rounded-2xl px-3 py-5 sm:px-4 sm:py-7 flex flex-col items-center text-center transition-all duration-500 hover:scale-[1.05] active:scale-[1.05] focus:scale-[1.05] outline-none ${glowColor} cursor-pointer`}
            style={{ animation: `fadeSlideUp 0.5s ease-out ${i * 120}ms both` }}
          >
            {/* Animated shimmer overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 group-active:opacity-100 group-focus:opacity-100 transition-opacity duration-700 bg-[linear-gradient(110deg,transparent_20%,rgba(255,255,255,0.5)_50%,transparent_80%)] bg-[length:250%_100%] group-hover:animate-[shimmer_2s_ease-in-out] group-active:animate-[shimmer_2s_ease-in-out] group-focus:animate-[shimmer_2s_ease-in-out]" />

            {/* Pulsing ring behind icon */}
            <div className="relative mb-4">
              <div className={`absolute inset-0 rounded-full ${pulseColor} scale-150 animate-[pulse_3s_ease-in-out_infinite]`} />
              <div className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full ${iconBg} ${ringColor} ring-[5px] flex items-center justify-center shadow-xl transition-transform duration-500`}>
                <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-md" strokeWidth={1.8} />
              </div>
            </div>

            {/* Text */}
            <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] text-glow-subtext font-semibold mb-1.5 relative">
              {label}
            </span>
            <span className={`text-xs sm:text-sm font-extrabold ${titleColor} leading-tight relative`}>
              {title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
