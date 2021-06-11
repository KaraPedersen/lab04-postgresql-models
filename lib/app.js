import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import dogController from '../lib/controllers/dogs.js';
const app = express();

app.use(express.json());

app.use(dogController);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
