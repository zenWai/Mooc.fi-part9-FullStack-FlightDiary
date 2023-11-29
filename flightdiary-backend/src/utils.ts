import {NewDiaryEntry, Visibility, Weather} from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const parseComment = (comment: unknown): string => {
  if (!isString(comment)) {
    throw new Error('Incorrect or missing comment');
  }

  return comment;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect date: ' + date);
  }
  return date;
};

const isWeather = (param: string): param is Weather => {
  return Object.values(Weather).map(v => v.toString()).includes(param);
};

export const parseWeather = (weather: unknown): Weather => {
  if (!isString(weather) || !isWeather(weather)) {
    throw new Error('Incorrect weather: ' + weather);
  }
  return weather;
};

const isVisibility = (param: string): param is Visibility => {
  return Object.values(Visibility).map(v => v.toString()).includes(param);
};

export const parseVisibility = (visibility: unknown): Visibility => {
  if (!isString(visibility) || !isVisibility(visibility)) {
    throw new Error('Incorrect visibility: ' + visibility);
  }
  return visibility;
};

// Application's data handling, data validation and transformation.
// Prevents invalid data from entering the application logic
const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'weather' in object
    && 'visibility' in object
    && 'date' in object
    && 'comment' in object
  ) {
    return {
      weather: parseWeather(object.weather),
      visibility: parseVisibility(object.visibility),
      date: parseDate(object.date),
      comment: parseComment(object.comment)
    };
  }

  throw new Error('Incorrect data: a field missing');
};

export default toNewDiaryEntry;