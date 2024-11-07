import diagnoseData from '../../../data/diagnoses';
import { IDiagnose } from './diagnose.type';

const getAll = (): IDiagnose[] => {
  return diagnoseData;
};

export default {
  getAll,
};
