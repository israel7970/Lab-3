require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
app.use(express.static('public'));
const PORT = process.env.PORT || 3000;

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Display counter on page load
app.get('/display', async (req, res) => {
  try {
    const [userRows] = await pool.query('SELECT count FROM user WHERE userid = 1');
    res.json({ count: userRows[0].count });
  } 
  catch (err) {
    res.status(500).send(`
      <h1>MySQL connection failed</h1>
      <pre>${err.message}</pre>
      <p>Check your .env file and make sure MySQL is running.</p>
    `);
  }
});

// Increment counter route
app.post('/increment', async (req, res) => {
  try {
    const [rows] = await pool.query('UPDATE user SET count = count + 1 WHERE userid = 1');
    const [userRows] = await pool.query('SELECT count FROM user WHERE userid = 1');
    res.json({ count: userRows[0].count });
  } 
  catch (err) {
    res.status(500).send(`
      <h1>MySQL connection failed</h1>
      <pre>${err.message}</pre>
      <p>Check your .env file and make sure MySQL is running.</p>
    `);
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});