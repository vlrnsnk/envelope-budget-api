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

    const result = await db.query(`
      DELETE FROM envelopes
      WHERE id = $1
      RETURNING *;`
    , [envelope.id]);

    if (result.rows.length === 0) {
      return res.status(404).send('Envelope not found');
    }

    res.sendStatus(204);
  } catch (error) {
    console.log('Delete error:', error);
    res.status(500).send(error);
  }
};

exports.transferFunds = async (req, res) => {
  try {
    const { fromId, toId } = req.params;
    const { amount } = req.body;
    const numericAmount = Number(amount);

    if (!amount || isNaN(numericAmount) || numericAmount < 0) {
      return res.status(400).send('Data validation error');
    }

    await db.query('BEGIN');

    const originResult = await db.query(
      'SELECT * FROM envelopes WHERE id = $1 FOR UPDATE',
      [fromId],
    );
    const targetResult = await db.query(
      'SELECT * FROM envelopes WHERE id = $1 FOR UPDATE',
      [toId],
    );

    const originEnvelope = originResult.rows[0];
    const targetEnvelope = targetResult.rows[0];

    if (!targetEnvelope || !originEnvelope) {
      await db.query('ROLLBACK');

      return res.status(404).send({
        message: 'Envelope not found',
      });
    }

    if (originEnvelope.budget < numericAmount) {
      await db.query('ROLLBACK');

      return res.status(400).send({
        message: 'Amount to transfer exceeds envelope budget funds',
      });
    }

    const updatedOrigin = await db.query(
      'UPDATE envelopes SET budget = budget - $1 WHERE id = $2 RETURNING *',
      [numericAmount, fromId],
    );

    const updatedTarget = await db.query(
      'UPDATE envelopes SET budget = budget + $1 WHERE id = $2 RETURNING *',
      [numericAmount, toId],
    );

    await db.query('COMMIT');

    res.status(201).send([updatedOrigin.rows[0], updatedTarget.rows[0]]);
  } catch (error) {
    await db.query('ROLLBACK');
    console.log('Transfer error:',error);
    res.status(500).send(error);
  }
};
