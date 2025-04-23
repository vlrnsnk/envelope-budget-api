const db = require('../config/db.js');

const loadEnvelopes = async (req, res, next) => {
  try {
    const result = await db.query('SELECT * FROM envelopes');
    req.envelopes = result.rows;
    next();
  } catch (error) {
    console.error('Error loading envelopes:', error);
    res.status(500).send({ error: 'Failed to load envelopes' });
  }
};

const findEnvelopeById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await db.query('SELECT * FROM envelopes WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).send({
        message: 'Envelope not found',
      });
    }

    req.envelope = result.rows[0];
    next();
  } catch (error) {
    console.error('Error finding envelope:', error);
    res.status(500).send({ error: 'Failed to find envelope' });
  }
};

module.exports = {
  loadEnvelopes,
  findEnvelopeById,
};
