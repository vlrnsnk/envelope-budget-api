const express = require('express');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8000;

app.get('/', (req, res, next) => {
  res.send('Hello World!');
});

app.post('/api/v1/envelopes', (req, res, next) => {
  res.status(201).send('POST');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
