import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { eleveRouter } from './routes/eleveRoutes.js';
import { authRouter } from './routes/authRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/eleves', eleveRouter);

if (process.env.NODE_ENV === 'production') {
  const frontPath = join(__dirname, '../front/dist');
  app.use(express.static(frontPath));
  app.get('/{*splat}', (_req, res) => {
    res.sendFile(join(frontPath, 'index.html'));
  });
}

app.use(errorHandler);

export default app;
