require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const session = require('express-session');

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(session({
  secret: 'pesoplumatitodoublepfuerzaregida',
  resave: false,
  saveUninitialized: false
}));
const PORT = process.env.PORT || 3000;

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

function requireLogin(req, res, next) {
  if (req.session.userid) {
    next();
  } else {
      res.status(401).json({ error: 'Not logged in' });
  }
}

// Display counter on page load
app.get('/display', requireLogin, async (req, res) => {
  try {
    const [userRows] = await pool.query('SELECT count FROM user WHERE userid = ?', [req.session.userid]);
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
app.post('/increment', requireLogin, async (req, res) => {
  try {
    const [rows] = await pool.query('UPDATE user SET count = count + 1 WHERE userid = ?', [req.session.userid]);
    const [userRows] = await pool.query('SELECT count FROM user WHERE userid = ?', [req.session.userid]);
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

// Verify user registration credentials
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const [existingUser] = await pool.query('SELECT * FROM user WHERE username = ?', [username]);
    if (existingUser.length > 0) {
      res.json({ success: false, message: 'Username already exists' });
    }
    else {
      const [rows] = await pool.query('INSERT INTO user (username, password) VALUES (?, ?)', [username, password]);
      res.json({ success: true });
    }
  } 
  catch (err) {
    res.status(500).send(`
      <h1>MySQL connection failed</h1>
      <pre>${err.message}</pre>
      <p>Check your .env file and make sure MySQL is running.</p>
    `);
  }
});

// Verify user login credentials
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const [rows] = await pool.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password]);
    if (rows.length > 0) {
      req.session.userid = rows[0].userid;
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } 
  catch (err) {
    res.status(500).send(`
      <h1>MySQL connection failed</h1>
      <pre>${err.message}</pre>
      <p>Check your .env file and make sure MySQL is running.</p>
    `);
  }
});

// logout route
app.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});