import express, { Request, Response } from 'express';
import { DiagnoseRouter } from './api/diagnoses';
import { PatientRouter } from './api/patients';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/api/ping', (_req: Request, res: Response) => {
  res.status(200).json({ message: 'pong' });
});

app.use('/api/v1/patients', PatientRouter);
app.use('/api/v1/diagnoses', DiagnoseRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
