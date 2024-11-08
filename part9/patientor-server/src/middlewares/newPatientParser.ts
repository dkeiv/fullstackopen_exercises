import { Request, NextFunction, Response } from 'express';
import { NewPatientSchema } from '../api/patients/patient.type';

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (err) {
    next(err);
  }
};

export default newPatientParser;
