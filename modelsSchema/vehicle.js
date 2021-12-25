const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
   name :{
       type : String,
       required : true
   },
   typeofvehicle :{
       type : String,
       required : true
   },
   cost : {
       type : Number,
       required : true
   }
})
userSchema.statics.findVehicleByName=async function (name){
  
    const vehicle=Vehicle.findOne({name})
    if(!vehicle)
    {
        throw new Error("no such vehicle exists")
    }
    return vehicle
    
}
const Vehicle = mongoose.model('Vehicle',userSchema)




module.exports = Vehicle