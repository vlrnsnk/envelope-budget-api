const dbEnvelopes = require('../config/db.js');
const {
  createId,
  findById,
  deleteById
} = require('../helpers/db.js');

exports.getEnvelopes = async (req, res) => {
  try {
    const envelopes = await dbEnvelopes;

    res.status(200).send(envelopes);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.addEnvelope = async (req, res) => {
  try {
    const { name, budget } = req.body;

    if (!name || !budget || Number(budget) < 0) {
      return res.status(400).send('Data validation error');
    }

    const envelopes = await dbEnvelopes;
    const id = createId(envelopes);
    const newEnvelope = { id, name, budget };

    envelopes.push(newEnvelope);

    res.status(201).send(newEnvelope);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getEnvelopeById = async (req, res) => {
  try {
    const { id } = req.params;
    const envelopes = await dbEnvelopes;
    const envelope = findById(envelopes, id);

    if (!envelope) {
      return res.status(404).send({
        message: 'Envelope not found',
      });
    }

    res.status(200).send(envelope);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateEnvelope = async (req, res) => {
  try {
    const { name, budget } = req.body;

    if (!name || !budget || Number(budget) < 0) {
      return res.status(400).send('Data validation error');
    }

    const { id } = req.params;

    const envelopes = await dbEnvelopes;
    const envelope = findById(envelopes, id);

    if (!envelope) {
      return res.status(404).send({
        message: 'Envelope not found',
      });
    }

    envelope.name = name;
    envelope.budget = budget;

    res.status(200).send(envelope);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteEnvelope = async (req, res) => {
  try {
    const { id } = req.params;
    const envelopes = await dbEnvelopes;
    const envelope = findById(envelopes, id);

    if (!envelope) {
      return res.status(404).send({
        message: 'Envelope not found',
      });
    }

    deleteById(envelopes, id);

    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.transferFunds = async (req, res) => {
  try {
    const { fromId, toId } = req.params;
    const { amount } = req.body;

    if (!amount || isNaN(amount) || Number(amount) < 0) {
      return res.status(400).send('Data validation error');
    }

    const envelopes = await dbEnvelopes;
    const originEnvelope = findById(envelopes, fromId);
    const targetEnvelope = findById(envelopes, toId);

    if (!originEnvelope || !targetEnvelope) {
      return res.status(404).send({
        message: 'Envelope not found',
      });
    }

    if (originEnvelope.budget < amount) {
      return res.status(400).send({
        message: 'Amount to transfer exceeds envelope budget funds',
      });
    }

    originEnvelope.budget -= amount;
    targetEnvelope.budget += amount;

    res.status(201).send([originEnvelope, targetEnvelope]);
  } catch (error) {
    res.status(500).send(error);
  }
};
