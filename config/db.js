const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'envelope_budget',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
});

client.connect().then(() => {
  console.log('Connected to database');
}).catch((err) => {
  console.error('Error connecting to database', err);
});

module.exports = {
  query: (text, params) => client.query(text, params),
  close: () => client.end(),
};
