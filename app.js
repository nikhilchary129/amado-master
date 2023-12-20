const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bodyPaser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const router = require("./routes/route.js");

const app = express();
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// MongoDB connection
const db = "mongodb+srv://nikhilchary129:1234567890@cluster0.c0ujdyf.mongodb.net/";
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Routes
app.use(router);

// Server listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
