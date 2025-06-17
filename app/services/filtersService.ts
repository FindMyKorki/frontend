import { apiCall } from '../utils/ApiHandler';
import { Level } from '../types/Level';
import { Subject } from '../types/Subject';

export const fetchLevels = async (): Promise<Level[]> => {
  return await apiCall({ method: 'GET', url: '/levels' });
};

export const fetchSubjects = async (): Promise<Subject[]> => {
  return await apiCall({ method: 'GET', url: '/subjects' });
};
