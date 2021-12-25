const express = require('express')
const User = require('../modelsSchema/user')
const router = express.Router()
const auth=require('../middleware/auth')
const Vehicle = require('../modelsSchema/vehicle')

//(admin)add,remove,update
router.post('/addVehicle', auth, async (req,res)=>{
   try{
     const admin = req.user
      if(admin.role === 1)
      {
        const vehicle = new Vehicle(req.body)

        await vehicle.save()
        res.send(vehicle)
      }
   }

catch (e){
    res.status(400).send(e)
}
   
})

router.post('/removeVehicle', auth, async (req,res)=>{
    try{
      const admin = req.user
       if(admin.role === 1)
       {
         const name=req.body.name
        const vehicle=await Vehicle.findVehicleByName(name)
        res.status(200).send(vehicle)
        //console.log("hello")
        vehicle.remove()
       }
       
    }
 
 catch (e){
     console.log(e)
     res.status(400).send(e)
 }
    
 })


 router.patch('/updateVehicle', auth, async (req,res)=>{
    try{
      const admin = req.user
       if(admin.role === 1)
       {
         const name=req.body.name
        const vehicle=await Vehicle.findVehicleByName(name)
        res.status(200).send(vehicle)
        Vehicle.findByIdAndUpdate({_id:vehicle._id},{name:req.body.name,type:req.body.name,name:req.body.name})
       }
       
    }
 
 catch (e){
     console.log(e)
     res.status(400).send(e)
 }
    
 })

module.exports = router