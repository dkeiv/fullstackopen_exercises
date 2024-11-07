import express, { Request, Response } from 'express';
import { calculateBMI } from './utils/bmiCalculator';
import { calculateExercises } from './utils/exercisesCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req: Request, res: Response) => {
  res.send('HELLO FULL-STACK');
});

app.get('/bmi', (req: Request, res: Response) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);

  if (isNaN(weight) || isNaN(height)) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }

  res.status(200).json({
    weight,
    height,
    bmi: calculateBMI(weight, height),
  });
  return;
});

app.get('/exercises', (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { dailyExerciseHours, target } = req.body;
  if (!dailyExerciseHours || target == null) {
    res.status(400).json({ error: 'parameters missing' });
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(dailyExerciseHours, target);

  res.json(result);
  return;
});

const PORT = 3001;

app.listen(PORT || 3001, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
