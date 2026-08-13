import { Outlet, useLocation, Link } from 'react-router-dom';
import { Trophy, CalendarDays, ShieldCheck } from 'lucide-react';

const NAV_ITEMS = [
  { to: '/', label: 'Klasemen', icon: Trophy },
  { to: '/jadwal', label: 'Jadwal', icon: CalendarDays },
  { to: '/admin', label: 'Admin', icon: ShieldCheck },
] as const;

export default function Layout() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      {/* Desktop top navbar — hidden on mobile */}
      <nav className="hidden sm:block sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b border-purple-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 no-underline">
            <img src="/logo.webp" alt="Logo" loading="eager" fetchPriority="high" className="w-10 h-10 rounded-lg object-contain" />
            <div className="text-left">
              <span className="text-base font-bold text-glow-dark leading-tight block">Klasemen Liga Voli</span>
              <span className="text-xs text-glow-subtext">MUDA-MUDI GANGSAL MUDA</span>
            </div>
          </Link>

          <div className="flex items-center gap-1">
            {NAV_ITEMS.map(({ to, label, icon: Icon }) => {
              const active = pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors no-underline ${
                    active
                      ? 'bg-glow-primary text-white'
                      : 'text-glow-subtext hover:bg-purple-50 hover:text-glow-dark'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile header — visible only on mobile */}
      <div className="sm:hidden px-4 pt-4 pb-2">
        <div className="bg-white/70 backdrop-blur-md border border-purple-100 shadow-lg rounded-2xl px-4 py-3 flex items-center gap-3">
          <img src="/logo.webp" alt="Logo" loading="eager" fetchPriority="high" className="w-10 h-10 rounded-lg object-contain" />
          <div className="text-left">
            <span className="text-sm font-bold text-glow-dark leading-tight block">Klasemen Liga Voli</span>
            <span className="text-xs text-glow-subtext">MUDA-MUDI GANGSAL MUDA</span>
          </div>
        </div>
      </div>

      {/* Page content */}
      <main className="max-w-4xl mx-auto w-full px-4 py-8 pb-24 sm:pb-8">
        <Outlet />
      </main>

      {/* Mobile bottom nav — hidden on desktop */}
      <nav className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/80 backdrop-blur-lg border-t border-purple-100 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-around h-16">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => {
            const active = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex flex-col items-center gap-0.5 px-4 py-1 rounded-xl transition-colors no-underline ${
                  active ? 'text-glow-primary' : 'text-glow-subtext'
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'stroke-[2.5]' : ''}`} />
                <span className="text-[10px] font-medium">{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
