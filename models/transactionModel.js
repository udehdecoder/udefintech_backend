// const { transactionId } = require("../controllers/userController");
const mongoose = require("mongoose")
const transactionSchema =  mongoose.Schema({
    transactionId: String,
    status: String,
    amount: String,
    from: String,
    to: String
   
}, {timestamps: true});

const transactionModel = mongoose.model ("transactionmodel", transactionSchema)

module.exports = transactionModel;