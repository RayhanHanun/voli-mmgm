import type { ReactNode } from 'react';
import { Shield } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface Props {
  adminControls?: ReactNode;
}

export default function Header({ adminControls }: Props) {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';

  return (
    <header className="py-6 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/70 backdrop-blur-md border border-purple-100 shadow-lg rounded-2xl px-6 py-5">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <img
                src="/logo.png"
                alt="Logo GLOW"
                className="w-14 h-14 rounded-xl object-contain"
              />
              <div className="text-left">
                <h1 className="text-lg sm:text-xl font-bold text-glow-dark m-0 leading-tight">
                  Klasemen Liga Voli
                </h1>
                <p className="text-sm text-glow-subtext m-0">MUDA-MUDI GANGSAL MUDA</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {adminControls}
              {!isAdmin && (
                <a
                  href="/admin"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-glow-primary text-white text-sm font-medium hover:bg-glow-dark transition-colors no-underline"
                >
                  <Shield className="w-4 h-4" />
                  Admin
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
