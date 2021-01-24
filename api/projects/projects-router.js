const express = require('express');
const router = express.Router();
router.use(express.json());

const {
  get,
  insert,
  update,
  remove,
  getProjectActions,
} = require('./projects-model');

router.get('/', (req, res) => {
    get().then(a => res.send(a));
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    get().then(a =>{
        const b = a.filter(c => c.id == id);
        b.length > 0 ? res.send(b[0]) : res.status(404).send({errorMessage: "ID not found" });
    });
  });
  router.get('/:id/actions', (req, res) => {
    const {id} = req.params;
    getProjectActions(id).then(a =>{
        res.send(a)
    });
  });

  router.post('/', (req, res) => {
    if (!req.body.name||!req.body.description){
      res.status(400).send('sorry');
    }
    else{
    insert(req.body).then(a => res.send(a));
    }
  });

  router.put('/:id', (req, res) => {
    if (!req.body.name||!req.body.description){
      res.status(400).send('sorry');
    }
    else{
    const {id} = req.params;
    update(id, req.body).then(a => res.send(a))
    }
  });
  
  router.delete('/:id', (req, res) => {
    const {id} = req.params;
    let limit;
    get().then(a => { limit = a.length})
    if(id < 1 || id > 9){
      res.status(404).send('sorry')
    }
    else{
    remove(id).then(a => res.send('deleted')).catch(a => res.status(404).send('sorry'));
    }
  });

  module.exports = router;