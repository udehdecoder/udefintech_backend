const apiClient = require("../configs/nibbsAPI")
const bvnModel= require("../models/bvnModel")
const ninModel = require('../models/ninModel')
const accountsModel= require("../models/accountsModels")
const userModel = require("../models/userModel")
const transactionModel = require("../models/transactionModel")
const createApiClient = require("../configs/nibbsAPI")
const { default: mongoose } = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("../middleware/bcrypt")

exports.validateBvn = async(req, res) =>{
    try{
        const {bvn, kycID, dob} = req.body

        const BVNresponse = await apiClient.post("/api/validateBvn", bvn)
        res.status(200).json({sucess: "True", message: response.data})

        if (BVNresponse.status == 200){
            const response = await apiClient.post(`/api/account/create`, req.body)
            return res.status(200).json(response.data)
        }
    
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
}



//validate nin
exports.validateNin = async(req, res) =>{
    try{
        const {nin, kycID, dob} = req.body

        const NINresponse = await apiClient.post("/api/validateNin", nin)
        res.status(200).json({sucess: "True", message: response.data})
        if (NINresponse.status == 200){
            const response = await apiClient.post(`/api/account/create`, req.body)
            return res.status(200).json(response.data)
        }
    
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
}

//sign up or register new user endpoint
exports.signUpUsers = async(req, res) => {
    const {name, email,password,kycType, dob, kycID} = req.body
    console.log(kycType)

    try{
        if (!name || !email || !password || !kycType || !dob || !kycID){
            return res.status(400).json({message: "All fields must be provided"})
        }
        if(kycType === 'nin'){
            const kycID = nin
            const NINresponse = await apiClient.post("/api/validateNin", nin)
            if (NINresponse.status !== 200){
                res.status(400).json({
                    message: "Inavalid NIN credentials, try again"
                })
            }
            // res.status(200).json({sucess: "True", message: response.data})

        
                 const ninUser = {
                name, email, nin 
            }
            await ninModel.create(ninUser)
            console.log("NIN model recieved")

            const accountResponse = await apiClient.post(`/api/account/create`, {kycType,kycID,dob })
            if(!accountResponse){
                res.status(400).json({message: "something broke, Try again"})
            }
            let accountNumber = accountResponse.data.account.accountNumber
            const accUser = {name, email, accountNumber}
            await accountsModel.create(accUser)
            console.log("account created")

            // hash the password coming from the user
            const hashedPassword  = await bcrypt.dothash(password, 10)

            const user = await userModel.create({
            name, 
            email,
            password : hashedPassword,
            dob,
            accountNumber: accUser._id,
            bvn: bvnRecord._id 
           })

            return res.status(200).json({
            message: "Account creation sucessful",
            data:{
                accountNumber,
                userId: user._id
            }
        })
        }
    

        
        if (kycType === 'bvn'){
            console.log(kycID)
        let bvnRecord;
        const bvn = kycID

        const bvnResponse = await apiClient.post("/api/validateBvn", {bvn: kycID})

         if (bvnResponse.status !== 200) {
            return res.status(400).json({ message: "Invalid BVN" });
        }
        const existingBVN = await bvnModel.findOne({bvn})
        if  (!existingBVN){
              bvnRecord = await bvnModel.create({
            name, email, bvn
        }
    )
            // return res.json("BVN has been created and stored")
        }
        
        else{
            bvnRecord = existingBVN
        }
       
    
        console.log("BVN is already in the database")
        console.log(kycID)

         const accountResponse = await apiClient.post(`/api/account/create`, {
            kycID: kycID,
            kycType: kycType,
            dob: dob
        })
      
        console.log(accountResponse.data.account.accountNumber)
        // res.status(200).json("Account created succuessfuully")
        const accountNumber = accountResponse.data.account.accountNumber
        console.log("account created", accountNumber)

        // const existingAccount = await accountsModel.findOne({accountNumber})
       
        const savedAccount = await accountsModel.create({
        name, email, accountNumber
        });
        
        if (!savedAccount || !bvnRecord){
            return res.status(400).json({
                message: "Account or bvn not found, Try again"
            })
        }        
        console.log("Account was created")
        console.log("saved account", bvnRecord)
        console.log("savedAccount", savedAccount)


        const hashedPassword  = await bcrypt.dothash(password, 10)
        // const nin = await bvnModel.findOne({email: email})
        const user = await userModel.create({
            name, 
            email,
            password: hashedPassword,
            dob,
            account: savedAccount._id,
            bvn: bvnRecord._id 
    })

        return res.status(200).json({
            message: "Account creation sucessful",
            data:{
                accountNumber,
                userId: user._id
            }
        })

       
        }
    }
     
    catch(error){

        console.log(error)

        if (error.code === 'ENOTFOUND' || error.code === 'EAI_AGAIN') {
        return res.status(503).json({
            message: "Unable to connect to the verification service. Please check your internet connection."
        });
    }
    // 2. Check for Request Timeouts
    if (error.code === 'ETIMEDOUT') {
        return res.status(408).json({
            message: "The request took too long to respond. Please try again later."
        });
    }
    // 3. Check for actual API errors (e.g., 400, 401, 404 from the external server)
    if (error.response) {
        return res.status(error.response.status).json({
            message: error.response.data.message || "External service error",
            details: error.response.data
        });
    }
    // 4. Fallback for everything else
    res.status(500).json({
        message: "An unexpected error occurred during signup."
    });
}


}


    // }
exports.login = async(req, res) =>{
    const {email, password} = req.body

    const user = await userModel.findOne({email})
    if (!user){
        res.status(404).json({message: "User not found, Try again with the right credentials"})
    }
    const isMatch = await bcrypt.dothashValidation(password, user.password)
    if(!isMatch){
        return res.status(400).json({message: "Invalid credentials"})
    }
    const token = jwt.sign(
        {
            id : user._id,
            email: user.email,
            accountNumber: user.accountNumber
        }, 
        process.env.JWT_SECRET,
        {expiresIn: "1h"}
    );
    res.status(200).json({
        message: "login successfull",
        token,
        user:{
            id: user._id,
            name: user.name,
            accountNumber: user.accountNumber
        }
    })



}

//get account balance endpoint

exports.getAccountBalance = async(req,res) =>{
         const {accountNumber} = req.params
         if(!accountNumber  || accountNumber === "undefined"){
            return res.status(400).json({message: "inavalid accountnumber"})
         }

    try{
   
        const response = await apiClient.get(`/api/account/balance/${accountNumber}`)
        console.log(response)
        res.status(200).json(response.data)
    }
    catch(error){
        console.log(error)
        res.status(400).json({message: "sorry something happened, Try again"})
    }
}


//transfer funds endpoint
exports.transferFunds = async(req, res) =>{

    console.log("transfering now")
    try{
    const {from, to, amount} = req.body
    const validateTo = await apiClient.get(`/api/account/name-enquiry/${to}`)
    console.log("validate", validateTo)

    if(validateTo.status >= 400){
        return("account number is invalid (Retry)")
    }
    const checkAccountBalance = await apiClient.get(`api/account/balance/${from}`)
    console.log(checkAccountBalance)

    if (checkAccountBalance.data.balance < amount){
        return res.status(400).json({message: "can not coontinue with transaction. Insufficient funds"})
    }

    const response =  await apiClient.post("api/transfer", req.body)
    console.log(response.data)
       await transactionModel.create({
        transactionId : response.data.reference,
        status: response.data.status,
        amount: response.data.amount,
        from: response.data.senderAccount,
        to: response.data.receiverAccount
    }
    )
    return res.status(200).json(response.data)

 
    }

    catch(error){
        console.log(error)
        res.status(400).json({message: "Invalid request, try again"})
    }
}


//get transaction endpoint

exports.transactionId = async(req, res) =>{
    try{
    const {transactionId} = req.params
    const response = await apiClient.get(`api/transaction/${transactionId}`)
    }

    catch(error){
        res.status(400).json({message:"something broke please try again"})
    }

}