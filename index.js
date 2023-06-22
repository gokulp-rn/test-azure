const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Create a MySQL connection
const connection = mysql.createConnection({
  server: 'group4db.database.windows.net',
  user: 'group4',
  password: 'Password@123',
  database: 'group4db'
});

// Connect to the MySQL database
connection.connect((error) => {
  if (error) {
    console.error('Error connecting to the database: ', error);
    return;
  }

  console.log('Connected to the database');
});

// Set up the express app
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Define routes
app.post('/addData', (req, res) => {
  const { name, email } = req.body;

  const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
  const values = [name, email];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Error adding data to the database: ', error);
      res.status(500).json({ message: 'Error adding data' });
    } else {
      res.status(200).json({ message: 'Data added successfully' });
    }
  });
});

app.get('/retrieveData', (req, res) => {
  const query = 'SELECT * FROM users';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error retrieving data from the database: ', error);
      res.status(500).json({ message: 'Error retrieving data' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
