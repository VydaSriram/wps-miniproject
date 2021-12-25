const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/vehicle-services',{
    useNewUrlParser : true,
   //useCreateNewIndex : true
})

const express = require('express')
const userrouter = require('./routers/user')
const  adminrouter = require('./routers/vehicle')

const app = express()

app.use(express.json())
app.use(userrouter)
app.use(adminrouter)

const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log('server is up on '+port)
})

