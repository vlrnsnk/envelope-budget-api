const express = require('express');
const router = express.Router();

const {
  getEnvelopes,
  addEnvelope,
  getEnvelopeById,
  updateEnvelope,
} = require('../controllers/envelopes.js');

router.get('/', getEnvelopes);

router.post('/', addEnvelope);

router.get('/:id', getEnvelopeById);

router.put('/:id', updateEnvelope);

module.exports = router;
