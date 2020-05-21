const express = require("express");

const knex = require("../data/dbConfig");

const router = express.Router();

// GET accounts
router.get("/", async (req, res) => {
  try {
    const accounts = await knex("accounts");
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ message: "problem with db", error: err });
  }
});

// GET accounts by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await knex("accounts").where({ id });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "problem with db", error: err });
  }
});

// POST new account
router.post("/", async (req, res) => {
  const accountData = req.body;
  try {
    const numAccounts = await knex("accounts").insert(accountData);
    res.status(201).json(numAccounts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "problem with db", error: err });
  }
});

// UPDATE account
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const newAccount = req.body;

  try {
    const count = await knex("accounts").update(newAccount).where({ id });
    if (count) {
      res.json({ updated: count });
    } else {
      res.status(404).json({ message: "invalid id" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "problem with db", error: err });
  }
});

//DELETE account
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const count = await knex("accounts").del().where({ id });
    if (count) {
      res.json({ deleted: count });
    } else {
      res.status(404).json({ message: "invalid id" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "problem with db", error: err });
  }
});

module.exports = router;
