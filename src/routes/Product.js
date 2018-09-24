const express = require("express");
const bottle = require("../bottle");
const router = express.Router();

router.get("/", async (req, res) => {
  const result = await bottle.productManager.get(req.query);
  const { status, json } = result;
  res.status(status).json(json);
});

router.post("/", async (req, res) => {
  const result = await bottle.productManager.create(req.body);
  const { status, json } = result;
  res.status(status).json(json);
});

router.patch("/", async (req, res) => {
  const result = await bottle.productManager.update(req.body);
  const { status, json } = result;
  res.status(status).json(json);
});

router.delete("/", async (req, res) => {
  const result = await bottle.productManager.delete(req.body);
  const { status, json } = result;
  res.status(status).json(json);
});

module.exports = router;