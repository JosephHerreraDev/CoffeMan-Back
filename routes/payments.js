const express = require("express");
const router = express.Router();
const payments = require("../services/payments");

router.get("/", async function (req, res, next) {
  try {
    res.json(await payments.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting payments `, err.message);
    next(err);
  }
});

router.post("/", async function (req, res, next) {
  try {
    res.json(await payments.create(req.body));
  } catch (err) {
    console.error(`Error while creating payments`, err.message);
    next(err);
  }
});

module.exports = router;
