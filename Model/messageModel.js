// models/messageModel.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'help_360',
  password: 'amal',
  port: 5432,
});

const getMessage = async () => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT $1::text as message', ['Hello from PostgreSQL']);
    const message = result.rows[0].message;
    client.release();
    return message;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getMessage,
};
