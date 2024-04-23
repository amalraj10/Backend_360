//1.import dotenv
require('dotenv').config()

//2.import express
const express = require('express')

//3.import cors
const cors = require('cors')

//import router
const router = require('./Routes/router')

//import connection.js file
require('./DB/connections')

//4.create server

const   Help360Server = express()

//5.use of cors in server
Help360Server .use(cors())



//6.Returns a middleware that only parses json- javascript object
Help360Server .use(express.json())

//use of router
Help360Server .use(router)


//server use uploads folder
//first arg - the way in which other application should use this folder
//sec arg - export that folder - express static
Help360Server .use('/uploads',express.static('./uploads'))

//7.customize port
const PORT = 4000 || process.env

//to run the server
Help360Server .listen(PORT,()=>{
    console.log(`SERVER RUNNING SUCCESSFULLY AT PORT NUMBER ${PORT}`);
})

Help360Server .get('/',(req,res)=>
res.send(`<h1>Help360Server  Server Running successfully and ready to accept from clients</h1>`))