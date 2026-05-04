const {createNIN, validateNIN} = require("../controllers/ninController")
const express = require("express")
const router = express.Router()

router.get("/bank", validateNIN)
router.post("/bank", createNIN)

module.exports = router;