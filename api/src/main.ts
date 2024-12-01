import express from 'express';
import { logger } from './config/logger';
import { PORT } from './config/system';

const app = express();
app.use(express.json());

// Routes

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
