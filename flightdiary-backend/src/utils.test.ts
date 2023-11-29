import toNewDiaryEntry, { parseComment, parseDate, parseWeather, parseVisibility } from './utils';
import { Weather, Visibility } from './types';

describe('Utils', () => {

  describe('parseComment', () => {

    it('should return the same string for valid input', () => {
      const comment = 'A valid comment';
      expect(parseComment(comment)).toBe(comment);
    });

    it('should throw an error for invalid input', () => {
      expect(() => parseComment(123)).toThrow();
    });

  });

  describe('parseDate', () => {

    it('should return the same date string for valid input', () => {
      const date = '2023-01-01';
      expect(parseDate(date)).toBe(date);
    });

    it('should throw an error for invalid date', () => {
      expect(() => parseDate('invalid-date')).toThrow();
    });

  });

  describe('parseWeather', () => {

    it('should return the same weather enum for valid input', () => {
      const weather = Weather.Sunny;
      expect(parseWeather(weather)).toBe(weather);
    });

    it('should throw an error for invalid weather', () => {
      expect(() => parseWeather('notValid')).toThrow();
    });

  });

  describe('parseVisibility', () => {

    it('should return the same visibility enum for valid input', () => {
      const visibility = Visibility.Great;
      expect(parseVisibility(visibility)).toBe(visibility);
    });

    it('should throw an error for invalid visibility', () => {
      expect(() => parseVisibility('notValid')).toThrow();
    });

  });

  describe('toNewDiaryEntry', () => {

    const validEntry = {
      date: '2023-01-01',
      weather: Weather.Sunny,
      visibility: Visibility.Great,
      comment: 'A valid comment'
    };

    it('should correctly parse a valid diary entry', () => {
      const parsedEntry = toNewDiaryEntry(validEntry);
      expect(parsedEntry).toEqual(validEntry);
    });

    it('should throw an error if a required field is missing', () => {
      const invalidEntry = {
        date: '2023-01-01',
        weather: Weather.Sunny
        // Missing fields
      };
      expect(() => toNewDiaryEntry(invalidEntry)).toThrow();
    });

    it('should throw an error for invalid date format', () => {
      const invalidEntry = {
        ...validEntry,
        date: '2023-01-33'
      };
      expect(() => toNewDiaryEntry(invalidEntry)).toThrow();
    });

  });

});