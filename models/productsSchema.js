const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Define the user schema
const productSchema = new Schema({
  
    img1:{type:String},       
    img2:{type:String},       
    img3:{type:String},
    description:{type:String},
    amount:{type:String},
    location:{type:String}
   
});

// Create the User model
const product = mongoose.model('product', productSchema);

module.exports = product