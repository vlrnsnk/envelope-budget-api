const {
  findById,
  deleteById,
} = require('../helpers/db.js');

const db = require('../config/db.js');

exports.getEnvelopes = async (req, res) => {
  try {
    res.status(200).send(req.envelopes);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.addEnvelope = async (req, res) => {
  const { name, budget } = req.body;

  if (!name || !budget || Number(budget) < 0) {
    return res.status(400).send('Data validation error');
  }

  try {
    const result = await db.query(`
      INSERT INTO envelopes (name, budget)
      VALUES ($1, $2)
      RETURNING *;
    `, [name, budget]);

    res.status(201).send(result.rows[0]);
  } catch (error) {
    console.error('DB error:', error);
    res.status(500).send(error);
  }
};

exports.getEnvelopeById = async (req, res) => {
  try {
    res.status(200).send(req.envelope);
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

    const envelope = req.envelope;

    const result = await db.query(`
      UPDATE envelopes
      SET name = $1, budget = $2
      WHERE id = $3
      RETURNING *;
    `, [name, budget, envelope.id]);

    if (result.rows.length === 0) {
      return res.status(404).send('Envelope not found');
    }

    res.status(200).send(result.rows[0]);
  } catch (error) {
    console.log('Update error:', error);
    res.status(500).send(error);
  }
};

exports.deleteEnvelope = async (req, res) => {
  try {
    const envelope = req.envelope;

    deleteById(req.envelopes, envelope.id);

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

    const originEnvelope = findById(req.envelopes, fromId);
    const targetEnvelope = findById(req.envelopes, toId);

    if (!targetEnvelope) {
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
    console.log(error);
    res.status(500).send(error);
  }
};
