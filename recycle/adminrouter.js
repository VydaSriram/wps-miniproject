const express = require('express')
const router = express.Router()
const auth=require('../middleware/auth')
const Admin = require('./admin')
const jwt=require('jsonwebtoken')

router.post('/login-admin',async (req,res)=>
 {
     try{
         const admin = await Admin.findByEmail(req.body.email,req.body.password)
         const token=await admin.generateAuthToken()
         res.send({"admin":admin,"token":token})
   }
   catch (e){
       console.log(e)
     res.status(401).send({error:"not matched"})
   }
 
 })

// router.post('/logout-admin', async(req,res)=>{
//     try{

    
//     }
//     catch (e){
//        res.status(400).send(e)
//     }
// })

 module.exports = router