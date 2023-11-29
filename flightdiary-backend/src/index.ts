import express from 'express';
import diaryRouter from './routes/diaries';
import cors from 'cors';
import { Server } from 'http';

export const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3003;
let server: Server;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diaries', diaryRouter);

export const start = () => {
  if (!server?.listening) {
    server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
};

export const stop = () => {
  server.close();
};

// Only start the server if the file is run directly (not when imported for tests)
if (require.main === module) {
  start();
}