import { RouterProvider, createRouter, createRootRoute, createRoute } from '@tanstack/react-router';
import { useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import AppShell from './components/AppShell';
import HomePage from './pages/HomePage';
import PuzzlePage from './pages/PuzzlePage';
import LeaderboardPage from './pages/LeaderboardPage';
import AchievementsPage from './pages/AchievementsPage';
import SettingsPage from './pages/SettingsPage';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import { retryQueuedSubmissions } from './sync/scoreQueue';
import { useInternetIdentity } from './hooks/useInternetIdentity';

const rootRoute = createRootRoute({
  component: AppShell,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const puzzleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/puzzle',
  component: PuzzlePage,
});

const leaderboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/leaderboard',
  component: LeaderboardPage,
});

const achievementsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/achievements',
  component: AchievementsPage,
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/settings',
  component: SettingsPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  puzzleRoute,
  leaderboardRoute,
  achievementsRoute,
  settingsRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function SyncManager() {
  const isOnline = useOnlineStatus();
  const { identity } = useInternetIdentity();

  useEffect(() => {
    if (isOnline && identity) {
      void retryQueuedSubmissions();
    }
  }, [isOnline, identity]);

  return null;
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <RouterProvider router={router} />
      <SyncManager />
      <Toaster />
    </ThemeProvider>
  );
}
