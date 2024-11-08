import { v1 as uuid } from 'uuid';
import patientData from '../../../data/patients';
import { IPatient, IPatientNoSsn, NewPatientData } from './patient.type';

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
const findById = (id: string): IPatient | undefined => {
  const foundPatient = patientData.find(p => p.id === id);
  return foundPatient;
};

const addNew = (newPatientData: NewPatientData): IPatient => {
  const id = uuid();
  const newPatient: IPatient = { id, ...newPatientData };

  patientData.push(newPatient); // save();
  return newPatient;
};

export default {
  getAll,
  getAllNoSsn,
  findById,
  addNew,
};
