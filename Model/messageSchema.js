const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
ownermessage:{
    type:String,
    require:true
},
adminmessage:{
    type:String,
    require:true
},
hostelID:{
    type:String,
    require:true,
}

})

//create modal
const messages = mongoose.model("messages",messageSchema)

//export
module.exports = messages