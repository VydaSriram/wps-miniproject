const mongoose=require('mongoose')
const express = require('express')
const bcrypt =  require('bcryptjs')
mongoose.connect('mongodb://127.0.0.1:27017/vehicle-services',{
    useNewUrlParser : true,
   //useCreateNewIndex : true
})
const userSchema=new mongoose.Schema(
    {
        name:
        {
            type:String
        },
        email:
        {
            type:String
        },
        password:
        {
            type:String

        }
    }
)

userSchema.statics.findByEmail =  async function(email,password){
    const admin = await Admin.findOne({email})
    console.log(admin)
    if(!admin)
    {
        throw new Error("user not found")
    }
    if(password !== admin.password)
        throw new Error("invalid password")

    return admin
}


const Admin=mongoose.model('Admin',userSchema)

module.exports=Admin