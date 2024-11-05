interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

function calculateExercises(session: number[], target: number): Result {
  const result: Result = {
    periodLength: session.length,
    trainingDays: session.filter(s => s !== 0).length,
    success: true,
    rating: 1,
    ratingDescription: 'good',
    target,
    average: session.reduce((avg, cur, _, { length }) => avg + cur / length, 0),
  };
  return result;
}
