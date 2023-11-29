import diaryData from '../../data/entries';

import {DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry} from '../types';

const diaries: DiaryEntry[] = diaryData;

const getEntries = (): DiaryEntry[] => {
  return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({id, date, weather, visibility}) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

const findById = (id: number): DiaryEntry | undefined => {
  return diaries.find(d => d.id === id);
};

const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
  const newDiaryEntry = {
    id: Math.max(...diaries.map(d => d.id)) + 1,
    ...entry
  };

  diaries.push(newDiaryEntry);
  return newDiaryEntry;
};

const removeDiary = (id: number): boolean => {
  const index = diaries.findIndex(diary => diary.id === id);
  if (index !== -1) {
    diaries.splice(index, 1);
    return true;
  }
  return false;
};

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries,
  findById,
  removeDiary
};