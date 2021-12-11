const express = require('express')
const User = require('../models/user')
const router = express.Router()


router.post('/sign-up', async (req,res)=>{
    const user = new User(req.body)
    
    try{
     await user.save()
     res.send(user)
    }
    catch (e){
        res.status(401).send(e)
    }
})
module.exports=router