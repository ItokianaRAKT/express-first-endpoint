import express from 'express';
import { eleveRouter } from './routes/eleve.routes.js';
import { authRouter } from './routes/auth.routes.js';
import { errorHandler } from './middleware/error.middleware.js';

const app = express();

app.use(express.json()); // ceci est un middleware qui sert à
// transformer les requêtes HTTP au format stream en json

app.use('/auth', authRouter);
app.use('/eleves', eleveRouter);

app.use(errorHandler);

export default app;
