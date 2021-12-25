const jwt=require('jsonwebtoken')
const User = require('../modelsSchema/user')

const auth=async (req,res,next) =>{
    
    try
    {
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token,'myToken')
        const user = await User.findOne({_id:decoded._id,'tokens.token': token})
        
        if(!user) 
          throw new Error("not found")

        req.token = token
        req.user = user
        next()
    }
    catch (e){
        console.log(e)
        res.status(400).send({error:"please authenticate"})
    }
}

module.exports = auth










