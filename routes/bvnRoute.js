const express = require("express")
const { createBVN, validateBVN } = require("../controllers/bvnController")
const router = express.Router()
router.post("/createbvn", createBVN)
router.post("/validatebvn", validateBVN)


module.exports = router