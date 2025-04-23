const { Client } = require('pg');
require('dotenv').config();

const envelopes = [
  { name: "Groceries", budget: 500 },
  { name: "Rent", budget: 1200 },
  { name: "Utilities", budget: 150 },
  { name: "Transportation", budget: 300 },
  { name: "Entertainment", budget: 100 }
];

async function seedDatabase() {
  const client = new Client({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'envelope_budget',
    password: process.env.DB_PASSWORD || 'password',
    port: process.env.DB_PORT || 5432,
  });

  try {
    await client.connect();

    // Create the enveloper table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS envelopes(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        budget DECIMAL(10, 2) NOT NULL
      );
    `);

    // Clear existing data
    await client.query(`TRUNCATE TABLE envelopes RESTART IDENTITY CASCADE;`);

    // Insert the sample data
    for (const envelope of envelopes) {
      await client.query(
        'INSERT INTO envelopes (name, budget) VALUES ($1, $2)',
        [envelope.name, envelope.budget],
      );
    }

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.end();
  }
}

seedDatabase();
