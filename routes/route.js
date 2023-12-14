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

  module.exports = route