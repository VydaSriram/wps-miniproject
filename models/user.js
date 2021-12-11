const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true,
        minlength : 7,
        validate(username) {
           // console.log(validator.isAlphanumeric(username))
            if(!validator.isAlphanumeric(username))
            {
                throw new Error('username must be numbers and alphabet')
            }
        }

    },
    email :{
        type : String,
        required : true,
     
        validate(email){
            if(!validator.isEmail(email))
            {
                throw new Error('enter valid email')
            }
        }
    },
    password : {
        type : String,
        required : true,
        minlength : 8
    },
    tokens :[
        {
            token :{
                type:String
            }
    }
    ]
})
userSchema.statics.findByEmail =  async function(email,password){
    const user = await User.findOne({email})
    if(!user)
    {
        throw new Error("user not found")
    }
    const check = await bcrypt.compare(password,user.password)
    if(!check)
        throw new Error("invalid password")

    return user
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id:user._id.toString()},'myToken')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
    
}

userSchema.pre('save',async function (next)
{
    const user=this
    if(user.isModified('password')){
    user.password=await bcrypt.hash(user.password,8)
    }
    next()

})
const User = mongoose.model('User',userSchema)


module.exports=User
