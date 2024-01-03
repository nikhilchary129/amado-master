const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the user schema
const userSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true }, 
    bill:{type:Number}, 
    products: [{
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },

        quantity: { type: Number, default: 1 },
    }],
    wish: [{
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
        //quantity: { type: Number, default: 1 },
    }]
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
