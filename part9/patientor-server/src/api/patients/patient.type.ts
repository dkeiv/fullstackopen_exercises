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

export type IPatientNoSsn = Omit<IPatient, 'ssn'>;
