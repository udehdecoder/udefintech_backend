const mongoose = require("mongoose")

const ninSchema = mongoose.Schema({
    firstname: {type: String, required: true }, 
    lastname: {type: String, required: true},
    dob: {type: String, required: true},
    nin: {type: String, required: true}
    },
{timestamps: true}
)
module.exports = mongoose.model('Nin', ninSchema);