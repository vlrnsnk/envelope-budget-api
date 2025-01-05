const dbEnvelopes = require('../config/db.js');
const { findById } = require('../helpers/db.js');

const loadEnvelopes = async (req, res, next) => {
  try {
    req.envelopes = await dbEnvelopes;

    next();
  } catch (error) {
    res.status(500).send(error);
  }
};

const findEnvelopeById = (req, res, next) => {
  const { id } = req.params;
  const envelope = findById(req.envelopes, id);

  if (!envelope) {
    return res.status(404).send({
      message: 'Envelope not found',
    });
  }

  req.envelope = envelope;

  next();
};

module.exports = {
  loadEnvelopes,
  findEnvelopeById,
};
