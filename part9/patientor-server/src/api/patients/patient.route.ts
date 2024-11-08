import express, { Response, Request } from 'express';
import patientService from './patient.service';
import { IPatient, NewPatientData } from './patient.type';
import { newPatientParser } from '../../middlewares';

const route = express.Router();

route.get('/', (_req: Request, res: Response<IPatient[]>) => {
  res.send(patientService.getAllNoSsn());
});

route.post(
  '/',
  newPatientParser,
  (req: Request<unknown, unknown, NewPatientData>, res: Response<IPatient>) => {
    const newPatient = patientService.addNew(req.body);
    res.send(newPatient);
  }
);

route.get('/:id', (req: Request, res: Response<IPatient | undefined>) => {
  const id = req.params.id;
  res.send(patientService.findById(id));
});

export default route;
