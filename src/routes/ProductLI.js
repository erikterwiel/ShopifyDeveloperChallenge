const express = require("express");
const bottle = require("../bottle");
const router = express.Router();

router.get("/", async (req, res) => {
  const result = await bottle.productLIManager.get(req.query);
  const { status, json } = result;
  res.status(status).json(json);
});

router.post("/", async (req, res) => {
  const result = await bottle.productLIManager.create(req.body);
  const { status, json } = result;
  res.status(status).json(json);
});

router.patch("/", async (req, res) => {
  const result = await bottle.productLIManager.update(req.body);
  const { status, json } = result;
  res.status(status).json(json);
});

router.delete("/", async (req, res) => {
  const result = await bottle.productLIManager.delete(req.body);
  const { status, json } = result;
  res.status(status).json(json);
});

module.exports = router;