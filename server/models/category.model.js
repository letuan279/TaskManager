const mongoose = require('mongoose');

// Declare the Schema of the Mongo model
var categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true,
    },
    color: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

//Export the model
module.exports = mongoose.model('Category', categorySchema);
