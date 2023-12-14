const http = require("http")
const express = require("express")
const data = require("./models/mongo")
const mongodb = require('mongodb');
const bodyPaser = require("body-parser")
const mongoose = require("mongoose");

const jwt=require("jsonwebtoken")
const db = "mongodb+srv://nikhilchary129:nikhilchary1297@data.5jnkklt.mongodb.net"

const path = require("path");
const { render } = require("ejs");
const router = require("./routes/route.js");
const cookieParser = require("cookie-parser");
const app = express()
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, "public")));


app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
mongoose.connect((db))

app.use(router)

app.listen(3000)