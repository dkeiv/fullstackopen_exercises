import express, { Response, Request } from 'express';
import patientService from './patient.service';
import { IPatient } from './patient.type';
import { toNewPatientData } from '../../utils';

const route = express.Router();

route.get('/', (_req: Request, res: Response<IPatient[]>) => {
  res.send(patientService.getAllNoSsn());
});

route.post('/', (req: Request, res: Response) => {
  try {
    const newPatientData = toNewPatientData(req.body);
    const newPatient = patientService.addNew(newPatientData);

    res.send(newPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong :(';
    if (error instanceof Error) {
      errorMessage = 'Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

route.get('/:id', (req: Request, res: Response<IPatient | undefined>) => {
  const id = req.params.id;
  res.send(patientService.findById(id));
});

export default route;
