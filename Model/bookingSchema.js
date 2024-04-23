//import mongoose
const mongoose = require('mongoose')


const bookingSchema = new mongoose.Schema({
    uname:{
        type:String,
        require:true,
        min:[3,'Must be atleast 3 character but got {VALUE}']
    },
    uemail:{
        type:String,
        require:true,
        unique:true,
       
    
        validator(value){
            (!validator.isEmail(value))
        throw new Error('invalid Email')
    }},
    unumber:{
        type:Number,
        require:true,
     
    },
    uaadhar:{
          type:Number,
          require:true,
    },
   
    udate:{
        type:String,
        require:true,
     
    },
    usharings:{
        type:Number,
        require:true,
     
    },
    umsg:{
        type:String,
        require:true,
     
    },
    hostelID:{
        type:String,
        require:true,
    }



})

//create modal
const bookings = mongoose.model("bookings",bookingSchema)

//export
module.exports = bookings