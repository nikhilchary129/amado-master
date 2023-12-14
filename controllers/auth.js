const User = require("../models/userschema");
const cookieParser=require("cookie-parser");

const register=async (req, res) => {
    const { username, password } = req.body;
  console.log( username, password)
    try {
      // Create a new user
      const newUser = new User({
        username,
        password,
      });
  
      // Save the user to the database
      await newUser.save();
      const userId = newUser.id;

      // Set user ID in a cookie named 'userId'
      res.cookie('userId', userId, { maxAge: 900000, httpOnly: true });
    
      res.send('User registered successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
}
const login = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Find the user by username
      const user = await User.findOne({ username });
  
      // Check if the user exists
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      // Compare the provided password with the stored hashed password
      if (password === user.password) {
        // Authentication successful
        res.send('Login successful');
      } else {
        // Incorrect password
        res.status(401).send('Incorrect password');
      }
      const userId = user.id;

      // Set user ID in a cookie named 'userId'
      res.cookie('userId', userId, { maxAge: 900000, httpOnly: true });
    
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    register,
    login
  
}