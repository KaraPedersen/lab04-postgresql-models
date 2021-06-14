import { Router } from 'express';
import Dolphin from '../models/Dolphin';

export default Router()
  .post('/api/v1/dolphins', async (req, res) => {
    try {
      const dolphin = await Dolphin.insert(req.body);
      res.send(dolphin);

    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/api/v1/dolphins', async (req, res) => {
    try {
      const dolphins = await Dolphin.findAll();
      res.send(dolphins);

    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });
