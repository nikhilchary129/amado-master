const express = require("express")
const User = require("../models/userschema");
const auth = require("../controllers/auth")
const products = require("../models/productsSchema")
const wish = require("../models/wishlist")
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
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
route.get("/dd",(req,res)=>{
  res.render("product-details")
})
route.get("/shop/cat/glass_work", (req, res) => {

  const item = products.find({ category: "glass_work"})

  res.render("shop", { item })
})
route.get("/shop/cat/plastic", (req, res) => {

  const item = products.find({ category: "plastic" })

  res.render("shop", { item })
})
route.get("/shop/cat/Dressings", (req, res) => {
  const item = products.find({ category: "Dressings" })

  res.render("shop", { item })
})
route.get("/shop/cat/Deco", (req, res) => {
  const item = products.find({ category: "Deco" })

  res.render("shop", { item })
})
route.get("/shop/cat/metals", (req, res) => {
  const item = products.find({ category: "metals"})

  res.render("shop", { item })
})
route.get("/shop/cat/Organic", (req, res) => {
  const item = products.find({ category: "Organic" })

  res.render("shop", { item })
})

route.get("/auth", (req, res) => {
  res.render("auth");
})

route.post('/auth/register', auth.register);
route.post('/auth/login', auth.login);

const authenticateUser = (req, res, next) => {
 // console.log(req.cookies)
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
    name,
    categories,
    img1,
    img2,
    img3,
    description,
    amount,
    location,
    mail,
    number
  } = req.body;

  try {
    // Create a new product
    const newProduct = new products({
      name,
      categories,
      img1,
      img2,
      img3,
      description,
      amount,
      location,
      contact:{
        mail,number
      }
    });
   // console.log(newProduct);

    // Save the product to the database
    await newProduct.save();
    let { userid } = req.cookies
    const userId = jwt.verify(userid, "keybro")
    
    const userfind = await User.findOne({ _id: userId._id });
   // console.log(userfind)
    if (!userfind.products) {
      userfind.products = [];
    }
    
    userfind.products.push({ id: newProduct._id });
    await userfind.save();

    //res.send('Product submitted successfully');
    url = "/shop/" ;
    res.redirect(url)
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }


})

route.get("/cart/:item", authenticateUser, async (req, res) => {
  //  const catgory=req.params.catgory
  const item = req.params.item
  const itemobject = await products.findById(item);
  let { userid} = req.cookies
  const ide=jwt.verify(userid, "keybro");
  const userinfo= await User.findById(ide);
  if (!userinfo.wish) {
    userinfo.wish = [];
  }
  userinfo.wish.push({ id: item });
  await userinfo.save();
  //console.log(userinfo);
 
  res.redirect("/cart");
})
route.get("/cart", authenticateUser, async (req, res) => {
  try {
    let { userid } = req.cookies;
    const ide = jwt.verify(userid, "keybro");
    const userkaid = jwt.verify(userid, "keybro");

    const userinfo = await User.findById(userkaid);
    const wishListItems = userinfo.wish;

    const info = await Promise.all(wishListItems.map(async (el) => {
      try {
        const productinfo = await products.findById(el.id);
        if (productinfo) {
          return productinfo;
        } else {
          console.log(`Product with ID ${el.id} not found`);
          return null;
        }
      } catch (error) {
        console.error(`Error finding product with ID ${el.id}:`, error);
        return null;
      }
    }));

    console.log(info);
    res.render("cart", { carts: info.filter(product => product !== null) });
  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).send("Internal Server Error");
  }
});

route.post("/gettouchrequest/:productid", authenticateUser, async (req, res) => {
  
  const productid=req.params.productid;
  const productinfo=await  products.findById(productid);
  const contactinfo=productinfo.contact
  res.render("so",{contactinfo});
  

})
route.get("/shop/:productid",async  (req, res) => {
  const productid = req.params.productid
 // console.log(productid)
  products.findById(productid)
    .then((product) => {
     // console.log(product)
      res.render('product-details', { product })
    })
    .catch((err) => {
      console.log(err, 'product view')
    })
})

module.exports = route