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
  })

  .get('/api/v1/dolphins/:id', async (req, res) => {
    try {
      const dolphin = await Dolphin.findById(req.params.id);
      res.send(dolphin);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .put('/api/v1/dolphins/:id', async (req, res) => {
    try {
      const dolphin = await Dolphin.update(req.body, req.params.id);
      res.send(dolphin);

    } catch (err) {
      res.status(500).send({ error: err.message });
    }
    
  })

  .delete('/api/v1/dolphins/:id', async (req, res) => {
    try {
      const dolphin = await Dolphin.delete(req.params.id);
      res.send(dolphin);

    } catch(err) {
      res.status(500).send({ error: err.message });

    }
  });

