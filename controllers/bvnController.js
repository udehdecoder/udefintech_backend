const apiClient = require("../configs/nibbsAPI")



exports.createBVN = async(req, res) =>{
    try{
    const {bvn, firstname, lastname, dob, phone} = req.body
    const response = await apiClient.post("api/insertBvn", req.body)
    res.status(200).json({sucess: "True", message: response.data})
  }
  catch(error){
    res.status.json({message: error})
  }
}
    
exports.validateBVN = async (req, res) =>{
  try{
  const {bvn} = req.body
    const response = await apiClient.post("/api/validateBvn", req.body)
    res.status(200).json({sucess: "True", message: response.data})
  }
  catch(error){
    res.status.json({message: error})
  }
}