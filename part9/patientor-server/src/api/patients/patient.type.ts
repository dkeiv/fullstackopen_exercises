import { nativeEnum, object, string, TypeOf } from 'zod';

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface IPatient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
}

// zod's validation schema
export const NewPatientSchema = object({
  name: string({
    required_error: 'name is required',
  }).min(1, 'cant be empty'),
  occupation: string({
    required_error: 'occupation is required',
  }).min(1, 'cant be empty'),
  gender: nativeEnum(Gender),
  ssn: string().optional(),
  dateOfBirth: string().date('Invalid date string!').optional(),
});

export type IPatientNoSsn = Omit<IPatient, 'ssn'>;
export type NewPatientData = TypeOf<typeof NewPatientSchema>;
