import express from 'express';
import cors from 'cors';
import appRouter from './router/app.router';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/', appRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
