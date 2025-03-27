const { Client } = require('pg');
require('dotenv').config();

async function setupDatabase() {
  // connect to database
  const adminClient = new Client({
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    host: process.env.DB_HOST || 'localhost',
  });

  try {
    await adminClient.connect();

    await adminClient.query(`
      CREATE DATABASE envelope_budget;
    `);

    console.log('Database created');
  } catch (err) {
    console.error('Database already exists or creation failed', err);
  } finally {
    await adminClient.end();
  }

  const client = new Client({
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    host: process.env.DB_HOST || 'localhost',
    database: 'envelope_budget',
  });

  try {
    await client.connect();

    await client.query(`
      CREATE TABLE IF NOT EXISTS envelopes (
                id SERIAL         PRIMARY KEY,
              name VARCHAR(100)   NOT NULL,
            budget NUMERIC(10,2)  NOT NULL
      );
    `);

    console.log('Table created');
  } catch (err) {
    console.error('Table creation failed:', err);
  } finally {
    await client.end();
  }

}

setupDatabase();
