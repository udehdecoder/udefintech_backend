
const express = require("express")
const { signUpUsers, getAccountBalance, transferFunds, validateBvn, validateNin, transactionId, login } = require("../controllers/userController")
const router = express.Router()
const {authmiddleware}  = require("../middleware/authMiddleware")

router.post("/signup", signUpUsers)
router.post("/validatebvn", validateBvn)
router.post("/validatenin", validateNin)
router.get("/getbalance/:accountNumber", getAccountBalance)
router.post("/transfer", 
    // authmiddleware, 
    transferFunds)
router.post("/login", login)
router.get("/transactionid", transactionId)

module.exports = router