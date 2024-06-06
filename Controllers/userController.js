// Import required modules
const { Router } = require('express');

// In-memory user database
const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' },
  // Add more users as needed
];

// Create a new router instance
const router = Router();

// Login route
router.post('/login', (req, res) => {
    console.log(req)
  const { username, password } = req.body;

  // Find user by username
  const user = users.find(user => user.username === username);

  // If user not found or password is incorrect, return error
  if (!user || user.password !== password) {
    return res.status(401).json({ success: false, message: 'Invalid username or password' });
  }

  // If username and password are correct, return success
  res.status(200).json({ success: true, message: 'Login successful', user: { id: user.id, username: user.username } });
});

// Export the router
module.exports = router;
