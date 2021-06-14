import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import dogController from '../lib/controllers/dogs.js';
import catController from '../lib/controllers/cats.js';
import birdController from '../lib/controllers/birds.js';
import dolphinController from '../lib/controllers/dolphins.js';
import goatController from '../lib/controllers/goats.js';

const app = express();

app.use(express.json());

app.use(goatController);
app.use(dolphinController);
app.use(birdController);
app.use(catController);
app.use(dogController);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
