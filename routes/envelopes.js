const express = require('express');
const router = express.Router();

const { getEnvelopes, addEnvelope } = require('../controllers/envelopes.js');

router.get('/', getEnvelopes);

router.post('/', addEnvelope);

module.exports = router;
