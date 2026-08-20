import express from 'express';
import cors from 'cors';
import { eleveRouter } from './routes/eleveRoutes.js';
import { authRouter } from './routes/authRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/eleves', eleveRouter);

app.use(errorHandler);

export default app;
