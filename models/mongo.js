const mongodb = require('mongodb');
const mongoose= require("mongoose");
const Schema=mongoose.Schema

const booksschema= new Schema({
    title:{
        type:String,
        require:true
    },
    author:{
        type:String,
        require:true
    },
    img:{
        type:String,
        require:true
    },
    genre:{
        type:String,
        require:true
    },
    cost:{
        type:String,
        require:true
    },
    details:{
        type:String,
        require:true
    }
})
const books=mongoose.model("book",booksschema)
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique:true },
    password: { type: String, required: true },
    order:[{
        book: { type: mongoose.Schema.Types.ObjectId, ref: 'book' },
        quantity: { type: Number, default: 1 },
    }]
  });
  
  const user = mongoose.model('user', userSchema);
  
  // Cart schema
  const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user',  },
    items: [{
      book: { type: mongoose.Schema.Types.ObjectId, ref: 'book' },
      quantity: { type: Number, default: 1 },
    }],
  });
  
  const cart = mongoose.model('Cart', cartSchema);
  
const orderschema= new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    address:{type : String},
    delivery:[{
       
       
            book: { type: mongoose.Schema.Types.ObjectId, ref: 'book' },
            quantity: { type: Number, default: 1 },
       

    }]
})
    const order= mongoose.model('orders',orderschema)

  module.exports = {
    books,
    user,
    cart,
    order,
  };