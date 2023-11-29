import diaryService from './diaryService';
import diaryData from '../../data/entries';

describe('diaryService', () => {

  describe('getEntries', () => {
    it('returns all diary entries', () => {
      const entries = diaryService.getEntries();
      expect(entries).toEqual(diaryData);
    });

  });

  describe('getNonSensitiveEntries', () => {

    it('returns all diary entries without the comment field', () => {
      const entries = diaryService.getNonSensitiveEntries();
      entries.forEach(entry => {
        expect(entry).not.toHaveProperty('comment');
        expect(entry).toHaveProperty('id');
        expect(entry).toHaveProperty('date');
        expect(entry).toHaveProperty('weather');
        expect(entry).toHaveProperty('visibility');
      });
    });

  });

  describe('findById', () => {

    it('finds a diary entry by id', () => {
      const entry = diaryService.findById(1)
      expect(entry).toBeDefined();
      expect(entry?.id).toBe(1);
    });

    it('returns undefined for a non-existent id', () => {
      const entry = diaryService.findById(9999);
      expect(entry).toBeUndefined();
    });

  });

  describe('removeDiary', () => {

    it('removes a diary entry by id', () => {
      const initialLength = diaryService.getEntries().length;
      const success = diaryService.removeDiary(1);
      expect(success).toBe(true);
      expect(diaryService.getEntries().length).toBe(initialLength - 1);
    });

    it('returns false for a non-existent id', () => {
      const success = diaryService.removeDiary(9999);
      expect(success).toBe(false);

    });
  });

});