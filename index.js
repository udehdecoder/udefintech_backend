const express = require("express")
const app = express()
const connectDb = require("./configs/database")
app.use(express.json())
require("dotenv").config()

const apiClient = require("./configs/nibbsAPI")
const userRoute = require("./routes/userRoute")
const fintechRoute = require("./routes/fintechRoute")

 connectDb()

app.listen( process.env.PORT, () => {

    console.log(`App is listening ${process.env.PORT}`)
   
})


app.use("/bank/user", userRoute)
app.use("/bank", fintechRoute)

app.get("/", async(req, res) =>{
try{
    
const response = await apiClient.get("/api/accounts")
return res.status(200).json(response.data)
}
catch(error){
    console.log(error)
}

    res.status(200).json("Bank App is Loading...")
})

