const express = require('express');
const router = express.Router();

const {
  getEnvelopes,
  addEnvelope,
  getEnvelopeById,
} = require('../controllers/envelopes.js');

router.get('/', getEnvelopes);

router.post('/', addEnvelope);

router.get('/:id', getEnvelopeById);

module.exports = router;
