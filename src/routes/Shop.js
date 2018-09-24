const express = require("express");
const bottle = require("../bottle");
const router = express.Router();

router.get("/", async (req, res) => {
  const result = await bottle.shopManager.get(req.query);
  const { status, json } = result;
  res.status(status).json(json);
});

router.post("/", async (req, res) => {
  const result = await bottle.shopManager.get(req.body);
  const { status, json } = result;
  res.status(status).json(json);
});

module.exports = router;