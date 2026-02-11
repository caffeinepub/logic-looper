import { LogIn, LogOut, User, Clock, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useLocalGameState } from '@/hooks/useLocalGameState';

export default function SettingsPage() {
  const { identity, login, clear, isLoggingIn } = useInternetIdentity();
  const { settings, updateSettings, difficulty } = useLocalGameState();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Customize your experience</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Account
          </CardTitle>
          <CardDescription>
            {identity ? 'Signed in with Internet Identity' : 'Playing in Guest Mode'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {identity ? (
            <>
              <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                <div>
                  <p className="text-sm font-medium">Principal ID</p>
                  <p className="text-xs text-muted-foreground font-mono mt-1">
                    {identity.getPrincipal().toString().slice(0, 20)}...
                  </p>
                </div>
                <Badge className="bg-green-600 text-white">Authenticated</Badge>
              </div>
              <Button variant="outline" onClick={clear} className="w-full">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <div className="p-4 bg-muted rounded-md space-y-2">
                <p className="text-sm">
                  <strong>Guest Mode:</strong> Your progress is saved locally on this device only.
                </p>
                <p className="text-sm text-muted-foreground">
                  Sign in to sync your scores to the leaderboard and access your progress across devices.
                </p>
              </div>
              <Button onClick={login} disabled={isLoggingIn} className="w-full">
                <LogIn className="mr-2 h-4 w-4" />
                {isLoggingIn ? 'Signing In...' : 'Sign In with Internet Identity'}
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Gameplay
          </CardTitle>
          <CardDescription>Adjust your puzzle experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="timed-mode">Timed Mode</Label>
              <p className="text-sm text-muted-foreground">
                Track your solve time and earn time bonuses
              </p>
            </div>
            <Switch
              id="timed-mode"
              checked={settings.timedMode}
              onCheckedChange={(checked) =>
                updateSettings({ ...settings, timedMode: checked })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Difficulty
          </CardTitle>
          <CardDescription>Your current puzzle difficulty level</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-muted rounded-md">
            <span className="text-sm font-medium">Current Level</span>
            <Badge variant="outline" className="text-base">
              {difficulty.label} ({difficulty.level})
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Difficulty adjusts automatically based on your performance
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
