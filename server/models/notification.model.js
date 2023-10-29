const mongoose = require('mongoose');

// Declare the Schema of the Mongo model
var notiSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }
}, {
    timestamps: true
});

//Export the model
module.exports = mongoose.model('Notification', notiSchema);
