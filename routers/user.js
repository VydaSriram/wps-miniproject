const express = require('express')
const User = require('../models/user')
const router = express.Router()
const auth=require('../middleware/auth')
const Admin = require('../models/admin')


router.post('/sign-up', async (req,res)=>{
   
      try{
        const use = await User.findOne({email : req.body.email})
       if(!use)
        {
         const user = new User(req.body)

         await user.save()
         res.send(user)
        }
        else
         return res.status(400).send({error : 'email already used'})
      }
    
    catch (e){  
        console.log(e)
        res.status(401).send(e)
    }
})

router.post('/login-admin',async (req,res)=>
 {
     try{
         const admin = await Admin.findByEmail(req.body.email,req.body.password)
       // const token = await admin.generateAuthToken()
         res.send({"admin":admin})
   }
   catch (e){
       console.log(e)
     res.status(401).send({error:"not matched"})
   }
 
 })

router.post('/login',async (req,res)=>
{
    try{
        const user = await User.findByEmail(req.body.email,req.body.password)
       //console.log(user)
        const token = await user.generateAuthToken()
        
        res.send({"user":user,"token":token})
       //console.log(user)
    }
    catch(e)
    {
        console.log(e)
        res.status(401).send({error:"not matched"})

    }
})

router.post('/logout',auth,async (req,res)=>
{
    try
    {
        req.user.tokens=req.user.tokens.filter((element)=>
        {
            return element.token!==req.token
        })
        await req.user.save()
        res.send("logged out")
    }
    catch(e)
    {
        res.status(401).send("error!")


    }

})


module.exports=router