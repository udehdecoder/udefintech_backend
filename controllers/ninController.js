const apiClient = require("../configs/nibbsAPI")
const ninModel = require("../models/ninModel")

exports.createNIN = async (req, res) =>{
  try{
  const {nin, firstname, lastname, dob} = req.body
    const response = await apiClient.post("/api/insertNin", req.body)
    res.status(200).json({sucess: "True", message: response.data})
    const existingNin = await ninModel.findOne({nin})
    if (!existingNin){
         await ninModel.create({
      firstname: response.data.firstName,
      lastname : response.data.lastName,
      dob: response.data.dob,
      nin: response.data.nin
    })
    res.status(200).json(existingNin)
    }
    res.status(200).json({message: response.data})
 
  }
  catch(error){
    res.status.json({message: error})
  }
}



exports.validateNIN = async(req,res) =>{
      try{
    const {nin} = req.body
    const response = await apiClient.post("/api/validateNin", req.body)
    res.status(200).json({sucess: "True", message: response.data})
  }
  catch(error){
    res.status.json({message: error})
  }
}