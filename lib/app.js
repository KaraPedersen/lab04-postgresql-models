import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import dogController from '../lib/controllers/dogs.js';
import catController from '../lib/controllers/cats.js';
import birdController from '../lib/controllers/birds.js';
const app = express();

app.use(express.json());

app.use(birdController);
app.use(catController);
app.use(dogController);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
