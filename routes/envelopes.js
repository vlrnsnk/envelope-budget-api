const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('Hello World!');
});

router.post('/', (req, res, next) => {
  res.status(201).send('POST');
});

module.exports = router;
