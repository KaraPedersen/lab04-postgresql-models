import { Router } from 'express';
import Goat from '../models/Goat';

export default Router()
  .post('/api/v1/goats', async (req, res) => {
    try {
      const goat = await Goat.insert(req.body);
      res.send(goat);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/api/v1/goats', async (req, res) => {
    try {
      const goats = await Goat.findAll();
      res.send(goats);
      
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/api/v1/goats/:id', async (req, res) => {
    try {
      const goat = await Goat.findById(req.params.id);
      res.send(goat);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .put('/api/v1/goats/:id', async (req, res) => {
    try {
      const goat = await Goat.update(req.body, req.params.id);
      res.send(goat);

    } catch(err) {
      res.status(500).send({ error: err.message });

    }
  })

  .delete('/api/v1/goats/:id', async (req, res) => {
    try {
      const goat = await Goat.delete(req.params.id);
      res.send(goat);

    } catch(err) {
      res.status(500).send({ error: err.message });
    
    }
  });
