const User = require("../models/userschema");
const wishlist = require("../models/wishlist")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser");
const products = require("../models/productsSchema")

const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('Username already exists');
    }
    const emptyproduct = [];

    // Create a new user
    // const wishlistide=  tempwishlist._id;

    const newUser = new User({
      username,
      password,
      emptyproduct,
      emptyproduct

    });
     newUser.bill=0;
   // console.log(newUser)
    // const tempwishlist = new wishlist({
    //   user: newUser._id,
    //   items:[]
    // })
    // await tempwishlist.save();

    await newUser.save();
    const userid = jwt.sign({ _id: newUser._id }, "keybro")
    // const wishlistid = jwt.sign({ _id: tempwishlist._id }, "keybro");
    res.cookie("userid", userid, {
      expires: new Date(Date.now() + 9000000),
    })
    // res.cookie("wishlistid", wishlistid, {
    //   expires: new Date(Date.now() + 9000000),
    // })
    // console.log(document.cookie);
    // res.send('User registered successfully');
    res.redirect("/shop");
  } catch (error) {
    console.error(error);
    // Handle errors and send an appropriate response
    res.status(500).send('Internal Server Error');
  }
};

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
      const userid = jwt.sign({ _id: user._id }, "keybro")
     // const wishlistel = await wishlist.findOne({ user: user._id })
      // comst wishlistid=jwt
      res.cookie("userid", userid, {
        expires: new Date(Date.now() + 9000000),
      })
      // res.cookie("wishlistid", wishlistel._id, {
      //   expires: new Date(Date.now() + 9000000),
      // })
      //  console.log( res.cookie);
      // res.send('Login successful');
      res.redirect("/shop")
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