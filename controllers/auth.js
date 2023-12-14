const User = require("../models/userschema");

const register=async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Create a new user
      const newUser = new User({
        username,
        password,
      });
  
      // Save the user to the database
      await newUser.save();
  
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
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    register,
    login
  
}