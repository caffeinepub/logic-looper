import { Outlet, useNavigate, useRouterState } from '@tanstack/react-router';
import { Home, Trophy, Award, Settings, Puzzle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AppShell() {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/assets/generated/adwait-loop-a-logo.dim_512x512.png"
              alt="Adwait Loop logo"
              className="h-10 w-10"
            />
            <img
              src="/assets/generated/adwait-loop-wordmark.dim_1200x300.png"
              alt="Adwait Loop"
              className="h-8 hidden sm:block"
            />
          </div>
          <nav className="flex items-center gap-2">
            <Button
              variant={currentPath === '/' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => navigate({ to: '/' })}
            >
              <Home className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Home</span>
            </Button>
            <Button
              variant={currentPath === '/puzzle' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => navigate({ to: '/puzzle' })}
            >
              <Puzzle className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Play</span>
            </Button>
            <Button
              variant={currentPath === '/leaderboard' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => navigate({ to: '/leaderboard' })}
            >
              <Trophy className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Leaderboard</span>
            </Button>
            <Button
              variant={currentPath === '/achievements' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => navigate({ to: '/achievements' })}
            >
              <Award className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Achievements</span>
            </Button>
            <Button
              variant={currentPath === '/settings' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => navigate({ to: '/settings' })}
            >
              <Settings className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Settings</span>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>

      <footer className="border-t border-border bg-card mt-auto">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Adwait Loop. Built with ❤️ using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== 'undefined' ? window.location.hostname : 'adwait-loop'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
