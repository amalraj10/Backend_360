const express = require('express');
const help360 = express();
const port = process.env.PORT || 7000;

// 3. Import cors
const cors = require('cors');

// 5. Use cors middleware
help360.use(cors());

// Body parser middleware
// Parse JSON bodies
help360.use(express.json());
// Parse URL-encoded bodies
help360.use(express.urlencoded({ extended: true }));

// Import router
const router = require('./Routes/router');

// Use router
help360.use(router);

// Start the server
help360.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
