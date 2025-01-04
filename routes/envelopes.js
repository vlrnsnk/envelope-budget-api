const express = require('express');
const router = express.Router();

const { getEnvelopes } = require('../controllers/envelopes.js');

router.get('/', getEnvelopes);

router.post('/', (req, res, next) => {
  res.status(201).send('POST');
});

module.exports = router;
