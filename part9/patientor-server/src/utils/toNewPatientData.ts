import { NewPatientData, NewPatientSchema } from '../api/patients/patient.type';

// const isString = (text: unknown): text is string => {
//   return typeof text === 'string' || text instanceof String;
// };

// const isDate = (date: string): boolean => {
//   return Boolean(Date.parse(date));
// };

// const isGender = (gender: string): gender is Gender => {
//   return Object.values(Gender)
//     .map(g => g.toString())
//     .includes(gender);
// };

// const parseName = (name: unknown): string => {
//   if (!name || !isString(name)) {
//     throw new Error('name is not valid!');
//   }

//   return name;
// };

// const parseOccupation = (occupation: unknown): string => {
//   if (!occupation || !isString(occupation)) {
//     throw new Error('occupation is not valid!');
//   }

//   return occupation;
// };

// const parseSsn = (ssn: unknown): string => {
//   if (!isString(ssn)) {
//     throw new Error('ssn is not valid!');
//   }

//   return ssn;
// };

// const parseDateOfBirth = (dateOfBirth: unknown): string => {
//   if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
//     throw new Error('dateOfBirth is not valid!');
//   }

//   return dateOfBirth;
// };

// const parseGender = (gender: unknown): Gender => {
//   if (!gender || !isString(gender) || !isGender(gender)) {
//     throw new Error('gender is not valid!');
//   }

//   return gender;
// };

const toNewPatientData = (object: unknown): NewPatientData => {
  return NewPatientSchema.parse(object);
};

export default toNewPatientData;
