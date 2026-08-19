import express from 'express';
import { eleveRouter } from './routes/eleveRoutes.js';
import { authRouter } from './routes/authRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';

const app = express();

app.use(express.json()); // ceci est un middleware qui sert à
// transformer les requêtes HTTP au format stream en json

app.use('/auth', authRouter);
app.use('/eleves', eleveRouter);

app.use(errorHandler);

export default app;
