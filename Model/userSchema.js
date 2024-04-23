//import mongoose
const mongoose = require('mongoose')


//create modal
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:[3,'Must be atleast 3 character but got {VALUE}']
    },
    email:{
        type:String,
        require:true,
        unique:true,
       
    
        validator(value){
            (!validator.isEmail(value))
        throw new Error('invalid Email')
    }},
    password:{
        type:String,
        require:true,
    },
    mobile:{
        type:Number,
     
    },
    aadhar:{
          type:Number,
    },
   
    date:{
        type:String,
     
    },
    sharings:{
        type:String,
     
    },
    message:{
        type:String,
     
    },
})


//create modal
const users = mongoose.model("users",userSchema)

//export
module.exports = users