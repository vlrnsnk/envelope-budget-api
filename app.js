const express = require('express');
const dotenv = require('dotenv');

const envelopesRouter = require('./routes/envelopes.js');

dotenv.config({ path: './config/config.env' });

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8000;

app.use('/api/v1/envelopes', envelopesRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
