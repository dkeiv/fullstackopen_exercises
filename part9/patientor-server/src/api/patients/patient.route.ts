import express, { Response, Request } from 'express';
import patientService from './patient.service';

const route = express.Router();

route.get('/', (_req: Request, res: Response) => {
  res.send(patientService.getAll());
});

export default route;
