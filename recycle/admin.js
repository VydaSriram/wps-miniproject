const mongoose=require('mongoose')
const express = require('express')
const bcrypt =  require('bcryptjs')
// mongoose.connect('mongodb://127.0.0.1:27017/vehicle-services',{
//     useNewUrlParser : true,
//    //useCreateNewIndex : true
// })
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

        },
        tokens:[{token:
        {
            type:String
        }}]
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
userSchema.methods.generateAuthToken = async function () {
    const admin = this
    const token = jwt.sign({_id:admin._id.toString()},'myToken')
    admin.tokens = admin.tokens.concat({token})
    await admin.save()
    return token
    
}


const Admin=mongoose.model('Admin',userSchema)

module.exports=Admin