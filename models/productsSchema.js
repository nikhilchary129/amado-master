const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Define the user schema
const productSchema = new Schema({
    name:{type:String},
    category:{type:String},
    img1:{type:String},       
    img2:{type:String},       
    img3:{type:String},
    description:{type:String},
    amount:{type:String},
    location:{type:String},
    contact:{
        number:{
            type:String,
        },
        mail:{
            type:String,
        }
    }
   
});

// Create the User model
const products = mongoose.model('products', productSchema);

module.exports = products