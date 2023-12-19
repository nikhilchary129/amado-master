const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Define the user schema
const wishSchema = new Schema({
    user:{ type: mongoose.Schema.Types.ObjectId},
     items: [{ id: { type: Schema.Types.ObjectId, ref: 'Product' } }]
    
});

// Create the User model
const wish = mongoose.model('wish', wishSchema);

module.exports = wish