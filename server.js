// server.js
const express = require('express');
const help360 = express();
const port = process.env.PORT || 7000;

//3.import cors
const cors = require('cors')

//import router
const router = require('./Routes/router')

//5.use of cors in server
help360.use(cors())

//use of router
help360.use(router)

// Body parser middleware
help360.use(express.json());
help360.use(express.urlencoded({ extended: true }));


// Start the server
help360.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
