import patientData from '../../../data/patients';
import { IPatient, IPatientNoSsn } from './patient.type';

const getAll = (): IPatient[] => {
  return patientData;
};

const getAllNoSsn = (): IPatientNoSsn[] => {
  return patientData.map(({ id, name, occupation, gender, dateOfBirth }) => ({
    id,
    name,
    occupation,
    gender,
    dateOfBirth,
  }));
};

export default {
  getAll,
  getAllNoSsn,
};
