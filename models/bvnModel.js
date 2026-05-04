const mongoose = require("mongoose")

const bvnSchema = mongoose.Schema({
    name: {type: String, required:true }, 
    email: {type: String, required: true},
    bvn : {type: String, required: true},
    nin: {type: String}
    },
{timestamps: true}
)
module.exports = mongoose.model('Bvn', bvnSchema);