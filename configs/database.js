const mongoose = require("mongoose")

require("dotenv").config()


const connectDb = async() =>{
    try{
        await mongoose.connect(process.env.MONGOURL)
        console.log("mongoose is connected")
    }
    catch(error){
        console.log(error)
        process.exit(1)
    }

}

module.exports = connectDb;