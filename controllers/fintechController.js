const apiClient = require("../configs/nibbsAPI")

// exports.login = async (req, res) =>{

//     try{
//     const response = await apiClient.get('api/auth/token')
//     return res.status(200).json(response.data)
//     }
//     catch(error){
//         res.status(400).json({message: error.message})
//     }

// }

exports.getAllAccounts = async(req,res) =>{
    try{
        const response = await apiClient.get("api/accounts")
    return res.status(200).json({message: "accounts retrived successfully", data: response.data})
    }
    catch(error){
        res.status(404).json({message: error.message})
    }
}
exports.generateBearerToken = async(req, res) =>{
    try{
        const response = await apiClient.post("/api/auth/token", req.body)
        return res.status.json(response.data)
    }
    catch(error){
        res.status(400).json({message: error})
    }
}

exports.nameEnquiry = async(req, res) =>{
    const {accountNumber} = req.params
    if(!accountNumber || accountNumber === 'undefined'){
            return res.status(400).json({message: "Account number is required"})
        }
    try{
        const response = await apiClient.get(`/api/account/name-enquiry/${accountNumber}`)
        
        return res.status(200).json(response.data)
    }
    catch(error){
        console.log(error)
        res.status(400).json({message: error})
    }
}

// exports.transferFunds = async(req, res) =>{
//     try{
//     const response = await apiClient.post("/api/transfer", req.body)
//     return res.status(200).json(response.data)
//     }
//     catch(error){
//         res.status(404).json({message: error.message})
//     }
// }

// exports.transcationRef = async(req, res) =>{
//     const ref = req.params.ref
//     try{
//         const response = await apiClient.get(`/api/transaction/${ref}`)
//         res.status(200).json(response.data)
//     }
//     catch(error){
//         res.status(400).json(error)
//     }
// }

// exports.getAccountBalance = async(req, res) =>{
//     try{
//         const response = await apiClient.get(`/api/account/balance/${accountNumber}`)
//         return res.status(400).json(response.data)
//     }
//     catch(error){
//         res.status(400).json({message: error.message})
//     }
// }

