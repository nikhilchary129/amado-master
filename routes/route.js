const express = require("express")
const User = require("../models/userschema");
const auth=require("../controllers/auth")
const product=require("../controllers/products")



const route = express()

route.get("/",(req, res) => {

    res.render("index")
})
route.get("/shop",(req,res)=>{
    res.render("shop");
})
route.get("/auth",(req,res)=>{
    res.render("auth");
})

route.post('/auth/register', auth.register);
route.post('/auth/login',auth.login);

route.get('/post',(req,res)=>{
    res.render("post");
})
route.post('/productinfo',async (req, res) => {
    const {
      categories,
      img1,
      img2,
      img3,
      description,
      amount,
      location,
    } = req.body;
  
    try {
      // Create a new product
      const newProduct = new product({
        categories,
        img1,
        img2,
        img3,
        description,
        amount,
        location,
      });
  
      // Save the product to the database
      await newProduct.save();
      const userId = req.cookies.userId;
      
  
      //res.send('Product submitted successfully');
      res.render("index")
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
    
    
})

  module.exports = route