import cors from 'cors';
import express, { Request } from 'express';
import diaryRouter from './routes/diaries';

const app = express();
app.use(express.json());
app.use(cors<Request>());

const PORT = 3000;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/v1/diaries', diaryRouter);

app.use('*', (_req, res) => {
  res.status(404).send({ message: 'unknown router' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
