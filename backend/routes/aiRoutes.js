const express = require("express");
const { generateSolution } = require("../controllers/aiController");

const router = express.Router();

router.post("/solve", generateSolution);

module.exports = router;

