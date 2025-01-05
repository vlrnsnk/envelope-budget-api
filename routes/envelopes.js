const express = require('express');
const router = express.Router();

const {
  getEnvelopes,
  addEnvelope,
  getEnvelopeById,
  updateEnvelope,
  deleteEnvelope,
  transferFunds,
} = require('../controllers/envelopes.js');

const {
  loadEnvelopes,
  findEnvelopeById,
} = require('../middlewares/envelopes.js');

router.use(loadEnvelopes);

router.get('/', getEnvelopes);

router.post('/', addEnvelope);

router.get('/:id', findEnvelopeById, getEnvelopeById);

router.put('/:id', findEnvelopeById, updateEnvelope);

router.delete('/:id', findEnvelopeById, deleteEnvelope);

router.post('/:fromId/transfer/:toId', transferFunds);

module.exports = router;
