import { Award, Lock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAchievements } from '@/hooks/useLocalGameState';
import { ACHIEVEMENTS } from '@/achievements/definitions';

export default function AchievementsPage() {
  const { unlockedAchievements } = useAchievements();

  const achievementsList = ACHIEVEMENTS.map((achievement) => ({
    ...achievement,
    unlocked: unlockedAchievements.includes(achievement.id),
  }));

  const unlockedCount = achievementsList.filter((a) => a.unlocked).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Achievements</h1>
        <p className="text-muted-foreground">
          {unlockedCount} of {ACHIEVEMENTS.length} unlocked
        </p>
      </div>

      <div className="text-center">
        <img
          src="/assets/generated/achievement-badges-set.dim_1024x1024.png"
          alt="Achievement Badges"
          className="mx-auto h-32 w-auto opacity-80"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {achievementsList.map((achievement) => (
          <Card
            key={achievement.id}
            className={achievement.unlocked ? 'border-primary' : 'opacity-60'}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {achievement.unlocked ? (
                    <Award className="h-6 w-6 text-primary" />
                  ) : (
                    <Lock className="h-6 w-6 text-muted-foreground" />
                  )}
                  <div>
                    <CardTitle className="text-lg">{achievement.title}</CardTitle>
                    <CardDescription>{achievement.description}</CardDescription>
                  </div>
                </div>
                {achievement.unlocked && (
                  <Badge className="bg-green-600 text-white">Unlocked</Badge>
                )}
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
