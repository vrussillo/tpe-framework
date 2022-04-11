const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");

// Signup Route
router.post("/signup", async (req, res) => {
  const { email, username, password, firstname, lastname, role } = req.body;

  try {
    const user = await pool.query("SELECT * FROM employees WHERE email = $1", [
      email,
    ]);

    if (user.rows.length > 0) {
      return res.status(401).json("User already exist!");
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    let newUser = await pool.query(
      "INSERT INTO employees (email, username, password, firstname, lastname, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [email, username, bcryptPassword, firstname, lastname, role]
    );

    const jwtToken = jwtGenerator(newUser.rows[0].id);

    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Login Route
router.post("/login", validInfo, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM employees WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Invalid Credential");
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res.status(401).json("Invalid Credential");
    }
    const jwtToken = jwtGenerator(user.rows[0].id);
    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Edit Employee Route
router.put("/employee/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;

    let newUser = await pool.query(
      "UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING id, username, email",
      [username, email, id]
    );
    return res.json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get Employee By ID
router.get("/employee/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await pool.query("SELECT * FROM employees WHERE id = $1", [
      id,
    ]);
    if (employee.rows.length === 0) {
      return res.status(401).json(`${id}`);
    }
    return res.status(200).json(employee.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Delete Employee Route
router.delete("/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteEmployee = await pool.query(
      "DELETE FROM employees WHERE id = $1",
      [id]
    );

    return res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get All Pages Route
router.get("/pages", async (req, res) => {
  // const { template_id, page_number, page_name, tags } = req.body;
  try {
    const allPages = await pool.query("SELECT * FROM pages");

    return res.status(200).json(allPages.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get Page by ID Route
router.get("/pages/:id", async (req, res) => {
  // const { template_id, page_number, page_name, tags } = req.body;
  const { id } = req.params;
  try {
    const getPage = await pool.query("SELECT * FROM pages WHERE id = $1", [id]);

    return res.status(200).json(getPage.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Post Favorite Route
router.post("/favorite", async (req, res) => {
  // const { id } = req.params;
  const { user_id, template_id, page_id } = req.body;
  try {
    const newFavorite = await pool.query(
      "INSERT INTO favorites (user_id, template_id, page_id) VALUES ($1, $2, $3) RETURNING *",
      [user_id, template_id, page_id]
    );

    return res.status(200).json(newFavorite.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Delete Favorite Route
router.delete("/favorite/:page_id", async (req, res) => {
  try {
    const { page_id } = req.params;
    const deleteFav = await pool.query(
      "DELETE FROM favorites WHERE page_id = $1",
      [page_id]
    );

    return res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get Favorite By ID Route
router.get("/favorite/:user_id", async (req, res) => {
  const { user_id } = req.params;

  try {
    const getFav = await pool.query(
      "SELECT * FROM favorites WHERE user_id = $1",
      [user_id]
    );

    return res.status(200).json(getFav.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Verify
router.post("/verify", authorize, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
