import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalMiddleware from './app/middleware/globalMIddleware';
import { mainRoutes } from './app/routes';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('db connected');
});
app.use('/api/v1', mainRoutes);
// global error handler
app.use(globalMiddleware);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    statusCode: 404,
    message: 'Route Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'the route not exist',
      },
    ],
  });
  next();
});

export default app;
