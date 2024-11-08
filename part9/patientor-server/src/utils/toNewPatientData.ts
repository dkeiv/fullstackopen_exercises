import { Gender, NewPatientData } from '../api/patients/patient.type';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender)
    .map(g => g.toString())
    .includes(gender);
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('name is not valid!');
  }

  return name;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('occupation is not valid!');
  }

  return occupation;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error('ssn is not valid!');
  }

  return ssn;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('dateOfBirth is not valid!');
  }

  return dateOfBirth;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('gender is not valid!');
  }

  return gender;
};

const toNewPatientData = (object: unknown): NewPatientData => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'occupation' in object && 'gender' in object) {
    const newPatientData: NewPatientData = {
      //TODO:
      name: parseName(object.name),
      occupation: parseOccupation(object.occupation),
      gender: parseGender(object.gender),
    };

    if ('ssn' in object) newPatientData.ssn = parseSsn(object.ssn);
    if ('dateOfBirth' in object)
      newPatientData.dateOfBirth = parseDateOfBirth(object.dateOfBirth);
    return newPatientData;
  }
  throw new Error('missing required fields');
};

export default toNewPatientData;
