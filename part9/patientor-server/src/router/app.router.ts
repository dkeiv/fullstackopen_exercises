import express, { Request, Response } from 'express';
import { DiagnoseRouter } from '../api/diagnoses';
import { PatientRouter } from '../api/patients';

const appRouter = express.Router();

appRouter.get('/api/v1/ping', (_req: Request, res: Response) => {
  res.status(200).send({ message: 'pong' });
});

appRouter.use('/api/v1/patients', PatientRouter);
appRouter.use('/api/v1/diagnoses', DiagnoseRouter);

export default appRouter;
