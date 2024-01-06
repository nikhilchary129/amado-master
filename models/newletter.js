const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Define the user schema
const newsSchema = new Schema({
    user:{ type: mongoose.Schema.Types.ObjectId}    
});

// Create the User model
const news = mongoose.model('news', newsSchema);

module.exports = news