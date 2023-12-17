const express = require("express")
const User = require("../models/userschema");
const auth = require("../controllers/auth")
const products = require("../models/productsSchema")
const wish = require("../models/wishlist")
const jwt = require("jsonwebtoken")
//const product=require("../controllers/products");

const route = express()

route.get("/", (req, res) => {

  res.render("index")
})
route.get("/shop",async (req, res) => {
  const item=await products.find();
 // console.log(item[0])
  res.render("shop",{item});
})
route.get("/shop/glass_work", (req, res) => {

  const item = products.find({ category: "glass_work"})

  res.render("shop", { item })
})
route.get("/shop/plastic", (req, res) => {

  const item = products.find({ category: "plastic" })

  res.render("shop", { item })
})
route.get("/shop/Dressings", (req, res) => {
  const item = products.find({ category: "Dressings" })

  res.render("shop", { item })
})
route.get("/shop/Deco", (req, res) => {
  const item = products.find({ category: "Deco" })

  res.render("shop", { item })
})
route.get("/shop/metals", (req, res) => {
  const item = products.find({ category: "metals"})

  res.render("shop", { item })
})
route.get("/shop/Organic", (req, res) => {
  const item = products.find({ category: "Organic" })

  res.render("shop", { item })
})

route.get("/auth", (req, res) => {
  res.render("auth");
})

route.post('/auth/register', auth.register);
route.post('/auth/login', auth.login);

const authenticateUser = (req, res, next) => {
  console.log(req.cookies)
  if (req.cookies.userid) {
    // User is authenticated, continue to the next middleware or route handler
    next();
  } else {
    // User is not authenticated, redirect to the "/auth" route
    res.redirect('/auth');
  }
};

// Apply the authentication middleware to the '/post' route
route.get('/post', authenticateUser, (req, res) => {
  // If the user is authenticated, render the "post" page
  res.render('post');
});

route.post('/productinfo', async (req, res) => {
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
    const newProduct = new products({
      categories,
      img1,
      img2,
      img3,
      description,
      amount,
      location,
    });
    console.log(newProduct);

    // Save the product to the database
    await newProduct.save();
    let { userid } = req.cookies
    const userId = jwt.verify(userid, "keybro")
    
    const userfind = await User.findOne({ _id: userId._id });
    console.log(userfind)
    if (!userfind.products) {
      userfind.products = [];
    }
    
    userfind.products.push({ id: newProduct._id });
    await userfind.save();

    //res.send('Product submitted successfully');
    url = "/shop/" + newProduct._id;
    res.redirect(url)
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }


})

route.post("/cart/:item", authenticateUser, async (req, res) => {
  //  const catgory=req.params.catgory
  const item = req.params.item
  const itemobject = await products.findById(item);
  let { userid, wishlistid } = req.cookies
  const wishlist = wish.findById(jwt.verify(wishlistid, "keybro"));
  // const userinfo= User.findById( jwt.verify(userid,"keybro"))
  wishlist[0].items.push({
    id: itemobject[0]._id
  });
  wishlist[0].save();
  res.redirect("/cart");
})
route.get("/cart", authenticateUser, async (req, res) => {
  let { userid, wishlistid } = req.cookies
  const wishlist = wish.findById(jwt.verify(wishlistid, "keybro"));
  const userkaid = jwt.verify(userid, "keybro");
  const carts = wishlist[0].items;
  res.render("cart", { carts });

})
route.post("/gettouchrequest/:productid", authenticateUser, async (req, res) => {
  const ide = req.params.productid;
  let { userid, wishlistid } = req.cookies
  const contactinfo = await products.findOne({ _id: ide });
  res.render("/contactinfo", { contactinfo });

})
route.post("/shop/:productid", async (req, res) => {
  const ide = req.params.productid;
  console.log(ide)
  const items = products.findOne({ _id: ide });
  res.render("product-deatails.ejs", { items });

})

module.exports = route