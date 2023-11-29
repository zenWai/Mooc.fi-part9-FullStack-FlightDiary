import request from 'supertest';
import {app} from '../index';

describe('Router tests', () => {
  describe('GET /api/diaries', () => {
    it('responds with json containing a list of all diaries', async () => {
      const res = await request(app).get('/api/diaries');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Array);
    });
  });

  describe('GET /api/diaries/:id', () => {
    it('responds with a single diary entry', async () => {
      const res = await request(app).get('/api/diaries/1'); // Assuming 1 is a valid ID
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id', 1);
    });

    it('responds with 404 for a non-existent diary entry', async () => {
      const res = await request(app).get('/api/diaries/9999');
      expect(res.statusCode).toEqual(404);
    });
  });

  describe('POST /api/diaries', () => {
    it('creates a new diary entry', async () => {
      const newDiary = { date: '2023-11-28',
        weather: 'sunny',
        visibility: 'great',
        comment: '' };
      const res = await request(app)
        .post('/api/diaries')
        .send(newDiary);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id');
    });

    it('fails to create a diary entry with invalid data', async () => {
      const invalidDiary = { invalid: 'data' };
      const res = await request(app)
        .post('/api/diaries')
        .send(invalidDiary);
      expect(res.statusCode).toEqual(400);
    });
  });

  describe('DELETE /api/diaries/:id', () => {
    it('deletes a diary entry', async () => {
      const res = await request(app).delete('/api/diaries/1'); // Assuming 1 is a valid ID
      expect(res.statusCode).toEqual(204);
    });

    it('fails to delete a non-existent diary entry', async () => {
      const res = await request(app).delete('/api/diaries/9999');
      expect(res.statusCode).toEqual(404);
    });
  });
})
