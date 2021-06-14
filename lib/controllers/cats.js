import { Router } from 'express';
import Cat from '../models/Cat';

export default Router()
  .post('/api/v1/cats', async (req, res) => {
    try {
      const cat = await Cat.insert(req.body);
      res.send(cat);

    } catch(err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/api/v1/cats', async (req, res) => {
    try {
      const cats = await Cat.findAll();
      res.send(cats);

    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/api/v1/cats/:id', async (req, res) => {
    try {
      const cat = await Cat.findById(req.params.id);
      res.send(cat);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });
