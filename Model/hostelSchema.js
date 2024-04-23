//import mongoose
const mongoose = require('mongoose')

const hostelSchema = new mongoose.Schema({
    hostelName:{
        type:String,
        require:true,
    },
    dLmark:{
        type:String,
        require:true,
    },
    license:{
        type:String,
        require:true,
    },
    rate:{
        type:String,
        require:true,
    },
    occupancy:{
        type:String,
        require:true,
    },
    availableRoom:{
        type:String,
        require:true,
    },
    fc1:{
        type:String,
        require:true,
    },
    fc2:{
        type:String,
        require:true,
    },
    fc3:{
        type:String,
        require:true,
    },
    
    fc4:{
        type:String,
        require:true,
    },
    fc5:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true,
    },
    
    
    hostelimage1:{
        type:String,
        require:true,
    },
    hostelimage2:{
        type:String,
        require:true,
    },
    hostelimage3:{
        type:String,
        require:true,
    },
    userId:{
        type:String,
        require:true,
    },
    conformation:{
        type:String,
        require:true
    }
    
})

const hostels = mongoose.model("hostels",hostelSchema)


module.exports = hostels