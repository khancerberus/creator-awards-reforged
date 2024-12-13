import express from 'express';
import cors from 'cors';
import { logger } from './config/logger';
import { PORT, ORIGIN } from './config/system';
import morgan from 'morgan';

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);
app.use(morgan('dev', { stream: { write: (msg) => logger.info(msg) } }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, '0.0.0.0', 0, () => {
  logger.info(`Server is running on port ${PORT}`);
});
