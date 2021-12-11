const mongoose = require('mongoose')
const validator = require('validator')

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
    }
})

const User = mongoose.model('User',userSchema)


module.exports=User
// const user=new User(
//     {
//         name:"dysfd---do8=ff",
//         email:"abcgmail@gmail.com",
//         password:"hffgrhhdf"
//     }
// )
// user.save().then(()=>
// {
// console.log("success")
// }).catch((error)=>
// {
//     console.log(error)
// })