import patientData from '../../../data/patients';
import { IPatient } from './patient.type';

const getAll = (): IPatient[] => {
  return patientData;
};

export default {
  getAll,
};
