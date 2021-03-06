var express = require('express');
var router = express.Router();
const ObjectID = require('mongodb').ObjectID;

router.get('/contacts', (req, res, next) => {
  req.collection.find({})
    .toArray()
    .then(results => res.json(results))
    .catch(error => res.send(error));
});

router.post('/contacts', (req, res, next) => {
  const { name, email, location, primary } = req.body;
  if (!name || !email || !location || !primary) {
    return res.status(400).json({
      message: 'All fields are required',
    });
  }

  const payload = { name, email, location, primary };
  req.collection.insertOne(payload)
    .then(result => res.json(result.ops[0]))
    .catch(error => res.send(error));
});

router.delete('/contacts/:id', (req, res, next) => {
  const { id } = req.params;
  const _id = ObjectID(id);
  req.collection.deleteOne({ _id })
    .then(result => res.json(result))
    .catch(error => res.send(error));
});

module.exports = router;
