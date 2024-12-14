const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public"))); // Static files
app.use(cors({ origin: "http://localhost:3000", methods: ["GET", "POST", "PUT", "DELETE"], credentials: true })); // Allow CORS for frontend
app.use(express.json()); // Parse JSON

const port = 5005;

// Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "students",
});

// Test Database Connection
db.connect((err) => {
  if (err) {
    console.log("Database connection error:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Add a New Student
app.post("/add_user", (req, res) => {
  const sql = "INSERT INTO student_details (`name`,`email`,`age`,`gender`) VALUES (?, ?, ?, ?)";
  const values = [req.body.name, req.body.email, req.body.age, req.body.gender];

  console.log("Incoming data:", req.body); // Debugging incoming data

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error while inserting data:", err);
      return res.status(500).json({ message: "Something unexpected occurred", error: err });
    }
    return res.json({ success: "Student added successfully", result });
  });
});

// Get All Students
app.get("/students", (req, res) => {
  const sql = "SELECT * FROM student_details";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error while fetching students:", err);
      return res.status(500).json({ message: "Server error" });
    }
    return res.json(result);
  });
});

// Get Student by ID
app.get("/get_student/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM student_details WHERE `id`= ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error while fetching student by ID:", err);
      return res.status(500).json({ message: "Server error" });
    }
    return res.json(result);
  });
});

// Update Student by ID
app.post("/edit_user/:id", (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE student_details SET `name`=?, `email`=?, `age`=?, `gender`=? WHERE id=?";
  const values = [req.body.name, req.body.email, req.body.age, req.body.gender, id];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error while updating student:", err);
      return res.status(500).json({ message: "Something unexpected occurred", error: err });
    }
    return res.json({ success: "Student updated successfully" });
  });
});

// Delete Student by ID
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM student_details WHERE id=?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error while deleting student:", err);
      return res.status(500).json({ message: "Something unexpected occurred", error: err });
    }
    return res.json({ success: "Student deleted successfully" });
  });
});

// Start the Server
app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});