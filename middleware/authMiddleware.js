const jwt = require("jsonwebtoken")


exports.authmiddleware = async (req, res, next) =>{
   
    let token = req.headers.authorization.split(' ')[1]
  
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
       await req.headers.authorization.split(' ')[1]
    }

    if(!token){
        return res.status(401).json({message: "Not authorized, No token"})
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded 
        next()
    }
    catch(error){
        res.status(500).json({message: "token failed"})
    }
}