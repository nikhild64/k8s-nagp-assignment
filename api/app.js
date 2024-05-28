const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
app.use(express.json());

// Configuration (replace with values from ConfigMap and Secret)
// const dbConfig = {
//   host: "mysql", // Use the service name (headless)
//   user: "root",
//   password: process.env.MYSQL_ROOT_PASSWORD,
//   database: "books",
// };
const pool = mysql.createPool({
  host: "mysql",
  user: "root",
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: "books",
  waitForConnections: true,
  connectionLimit: 1000, // adjust as needed
  queueLimit: 0,
});
// Get list of books
app.get("/books", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute("SELECT * FROM books");
    connection.release();
    res.json(rows);
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

// Add a new book
app.post("/books", async (req, res) => {
  const { title, author, isbn } = req.body;

  try {
    const connection = await pool.getConnection();

    await connection.execute(
      "INSERT INTO books (title, author, isbn) VALUES (?, ?, ?)",
      [title, author, isbn]
    );
    connection.release();

    res.status(201).json({ message: "Book added successfully" });
  } catch (err) {
    console.error("Error adding book:", err);
    res.status(500).json({ error: "Failed to add book" });
  }
});

app.post("/load-test", async (req, res) => {
  const { test } = req.body;

  try {
    // program to generate fibonacci series up to n terms
    number = 0;
    while (number < test) {
      // take input from the user
      let n1 = 0,
        n2 = 1,
        nextTerm;

      console.log("Fibonacci Series:");

      for (let i = 1; i <= number; i++) {
        nextTerm = n1 + n2;
        n1 = n2;
        n2 = nextTerm;
      }
      number++;
    }
    res.status(201).json({ message: "done" });
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API server listening on port ${PORT}`);
});
