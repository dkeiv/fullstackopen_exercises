import express, { Request, Response } from 'express';
import diagnoseService from './diagnose.service';

const route = express.Router();

route.get('/', (_req: Request, res: Response) => {
  res.send(diagnoseService.getAll());
});

export default route;
