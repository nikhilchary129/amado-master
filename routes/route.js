const express = require("express")
const User = require("../models/userschema");
const auth = require("../controllers/auth")
const products = require("../models/productsSchema")
const wish = require("../models/wishlist")
const news= require("../models/newletter")
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
//const product=require("../controllers/products");

const route = express()

route.get("/", (req, res) => {

  res.render("index")
})
route.get("/shop", async (req, res) => {
  const item = await products.find();
  // console.log(item[0])
  res.render("shop", { item });
})
route.get("/dd", (req, res) => {
  res.render("product-details")
})
route.get("/shop/furniture", async (req, res) => {

  const item = await products.find({ category: "furniture" })

  res.render("shop", { item })
})
route.get("/shop/glass_work", async (req, res) => {

  const item = await products.find({ category: "glass-work" })

  res.render("shop", { item })
})
route.get("/shop/plastic", async (req, res) => {

  const item = await products.find({ category: "plastic-products" })

  //console.log(item)
  res.render("shop", { item })
})
route.get("/shop/Dressings", async (req, res) => {
  const item = await products.find({ category: "dressings" })

  res.render("shop", { item })
})
route.get("/shop/Deco", async (req, res) => {
  const item = await products.find({ category: "home-deco" })

  res.render("shop", { item })
})
route.get("/shop/metals", async (req, res) => {
  const item = await products.find({ category: "metals" })

  res.render("shop", { item })
})
route.get("/shop/Organic", async (req, res) => {
  const item = await products.find({ category: "organic-waste" })

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
    category,
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
      category,
      img1,
      img2,
      img3,
      description,
      amount,
      location,
      contact: {
        mail, number
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
    url = "/shop";
    res.redirect(url)
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }


})
route.get("/cartdel/:item",async (req, res)=>{
  let { userid } = req.cookies
  const ide = jwt.verify(userid, "keybro");
  const userinfo = await User.findById(ide);
  const item = req.params.item
  for(let i=0;i<userinfo.wish.length ;i++){
    if(userinfo.wish[i].id==item){
      let temp=userinfo.wish[i];
      userinfo.wish[i]=userinfo.wish[userinfo.wish.length-1];
      userinfo.wish[userinfo.wish.length-1]=temp;
      break;
    }
  }
  userinfo.wish.pop();
  userinfo.save();
  res.redirect("/cart");
})
route.get("/cart/:item", authenticateUser, async (req, res) => {
  //  const catgory=req.params.catgory
  const item = req.params.item
  const itemobject = await products.findById(item);
  let { userid } = req.cookies
  const ide = jwt.verify(userid, "keybro");
  const userinfo = await User.findById(ide);
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

  const productid = req.params.productid;
  const productinfo = await products.findById(productid);
  const contactinfo = productinfo.contact
  let { userid } = req.cookies
  const userId = jwt.verify(userid, "keybro")
  const userfind = await User.findOne({ _id: userId._id });
  // userfind.products;
  for (let i = 0; i < userfind.products.length; i++) {
    if (userfind.products[i].id == productid) {
      userfind.products[i].quantity++;
      userfind.products[i].save();
      break;
    }
  }

  res.render("so", { contactinfo });


})
route.get("/shop/:productid", async (req, res) => {
  const productid = req.params.productid
  // console.log(productid)
  products.findById(productid)
    .then((product) => {
      // console.log(product)
      res.send({ product })
    })
    .catch((err) => {
      console.log(err, 'product view')
    })
})
route.get('/myprofile', authenticateUser, async (req, res) => {
  let { userid } = req.cookies
  const userId = jwt.verify(userid, "keybro")
  const userfind = await User.findOne({ _id: userId._id });
  const myproducts = userfind.products;
  const item = []
  for (let i = 0; i < myproducts.length; i++) {
    item.push(await products.findById(myproducts[i].id))
  }
  // console.log(item) 
  res.render("profile", { userfind, item ,candlt:true})

})
route.get("/dlt/:productid", authenticateUser, async (req, res) => {
  let dltid = req.params.productid
  let { userid } = req.cookies
  const userId = jwt.verify(userid, "keybro")
  const userfind = await User.findOne({ _id: userId._id });

  for (let i = 0; i < userfind.products.length; i++) {
    if (userfind.products[i].id == dltid) {
      let temp = userfind.products[i]
      userfind.products[i] = userfind.products[userfind.products.length - 1]
      userfind.products[userfind.products.length - 1] = temp
      userfind.bill+= userfind.products[userfind.products.length - 1].quantity
      userfind.products.pop()
      await products.findByIdAndDelete(dltid);
      await userfind.save();
      break;
    }
  }

  const myproducts = userfind.products;

  const item = []
  for (let i = 0; i < myproducts.length; i++) {
    item.push(await products.findById(myproducts[i].id))
  }
  // console.log(item) 
  //res.render("profile", { userfind, item })
  res.redirect("/myprofile")
})
route.post("/updates",(req,res)=>{
   let { email } = req.params
  // const userId = jwt.verify(userid, "keybro")
  const newupdate= new news({
    user: email
  })
  newupdate.save();

  res.render("cart copy.ejs")
})
route.get("/logout",(req,res)=>{
  res.clearCookie('userid');
  res.redirect("/shop")
})

module.exports = route