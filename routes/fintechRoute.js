const express = require("express")
const { getAllAccounts, generateBearerToken, nameEnquiry } = require("../controllers/fintechController")
const router = express.Router()

router.get("/fintech/accounts", getAllAccounts)
router.post("/fintech/token", generateBearerToken)
router.get("/fintech/enquiry/:accountNumber",nameEnquiry )
module.exports = router