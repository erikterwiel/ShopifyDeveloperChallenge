const express = require("express");
const bottle = require("../bottle");
const router = express.Router();

router.get("/", async (req, res) => {
  const result = await bottle.orderManager.get(req.query);
  const { status, json } = result;
  res.status(status).json(json);
});

router.post("/", async (req, res) => {
  const result = await bottle.orderManager.create(req.body);
  const { status, json } = result;
  res.status(status).json(json);
});

router.patch("/", async (req, res) => {
  const result = await bottle.orderManager.update(req.body);
  const { status, json } = result;
  res.status(status).json(json);
});

router.delete("/", async (req, res) => {
  const result = await bottle.orderManager.delete(req.body);
  const { status, json } = result;
  res.status(status).json(json);
});

module.exports = router;