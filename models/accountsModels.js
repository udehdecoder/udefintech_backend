const mongoose = require("mongoose")

const accountSchema = mongoose.Schema({
    name: {type: String, required:true }, 
    email: {type: String, required: true},
    accountNumber : {type: String, required: true}
    },
{timestamps: true}
)
module.exports = mongoose.model('Account', accountSchema);