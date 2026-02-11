import { getSubmissionQueue, clearSubmissionQueue } from '@/storage/repo';
import { createActorWithConfig } from '../config';

export async function retryQueuedSubmissions(): Promise<void> {
  const queue = getSubmissionQueue();
  
  if (queue.length === 0) return;

  try {
    const actor = await createActorWithConfig();
    
    if (!actor) return;

    for (const submission of queue) {
      try {
        await actor.submitScore(
          submission.dateKey,
          BigInt(submission.score),
          BigInt(submission.timeTaken),
          submission.puzzleType
        );
      } catch (error) {
        console.error('Failed to submit score:', error);
      }
    }

    clearSubmissionQueue();
  } catch (error) {
    console.error('Failed to retry submissions:', error);
  }
}
