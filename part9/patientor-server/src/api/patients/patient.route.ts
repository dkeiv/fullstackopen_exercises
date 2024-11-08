import express, { Response, Request } from 'express';
import patientService from './patient.service';
import { IPatient } from './patient.type';

const route = express.Router();

route.get('/', (_req: Request, res: Response<IPatient[]>) => {
  res.send(patientService.getAllNoSsn());
});

export default route;
