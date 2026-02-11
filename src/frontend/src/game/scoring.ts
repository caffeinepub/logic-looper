export function calculateScore(
  baseScore: number,
  hintsUsed: number,
  timeTaken: number,
  timedMode: boolean
): number {
  let score = baseScore;
  
  score -= hintsUsed * 100;
  
  if (timedMode && timeTaken > 0) {
    const timeBonus = Math.max(0, 500 - Math.floor(timeTaken / 10));
    score += timeBonus;
  }
  
  return Math.max(score, 100);
}
