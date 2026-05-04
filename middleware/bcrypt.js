let bcrypt = require("bcrypt")


exports.dothash = async (value, saltValue) =>{
    const result = await bcrypt.hash(value, saltValue)
    return result
}

exports.dothashValidation = (value, hashValue) =>{
    const result = bcrypt.compare(value, hashValue)
    return result
}