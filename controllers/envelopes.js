const dbEnvelopes = require('../config/db.js');
const { createId } = require('../helpers/db.js');

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
    console.log(error);
    res.sendStatus(500);
  }
};
