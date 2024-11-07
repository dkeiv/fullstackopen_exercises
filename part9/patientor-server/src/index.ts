import express, { Request, Response } from 'express';

const app = express();

app.use(express.json());

app.get('/api/ping', (_req: Request, res: Response) => {
  res.status(200).json({ message: 'pong' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
