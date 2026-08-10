import express from 'express';
import { eleveRouter } from './routes/eleve.routes.js';
import { errorHandler } from './middleware/error.middleware.js';

const app = express();

app.use(express.json());

app.use('/eleves', eleveRouter);

app.use(errorHandler);

export default app;
