const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Define the user schema
const wishSchema = new Schema({
    user:{ type: mongoose.Schema.Types.ObjectId},
    items:[ {
        id: { type: mongoose.Schema.Types.ObjectId },
    }]
    
});

// Create the User model
const wish = mongoose.model('product', wishSchema);

module.exports = wish