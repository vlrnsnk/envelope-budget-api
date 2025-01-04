const dbEnvelopes = require('../config/db.js');

exports.getEnvelopes = async (req, res, next) => {
  try {
    const envelopes = await dbEnvelopes;

    res.status(200).send(envelopes);
  } catch (error) {
    res.status(400).send(error);
  }
}
