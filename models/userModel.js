const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    dob: {type: String, required:true},

    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },

    bvn: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bvn'
    },

    nin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Nin'
    }
},{timestamps: true});

const userModel = mongoose.model ("User", userSchema)
module.exports = userModel;