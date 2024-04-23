//import mongoose
const mongoose = require('mongoose')

//create modal
const OwnerSchema = new mongoose.Schema({
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
    }
   
})


//create modal
const owners = mongoose.model("owners",OwnerSchema)

//export
module.exports = owners