//import mongoose
const mongoose = require('mongoose')

//access connection string of mongodb
const connectionString = process.env.DATABASE

//connect server with the mongodb
mongoose.connect(connectionString).then((res)=>{
    console.log('mongodb connected succesfully');
}).catch((err)=>{
    console.log(`mongodb connection failed due to : ${err}`);
})