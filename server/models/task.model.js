const mongoose = require('mongoose');

// Declare the Schema of the Mongo model
var taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true,
    },
    start_day: {
        type: Date,
        required: true,
    },
    end_day: {
        type: Date,
        required: true,
    },
    color: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    status: {
        type: mongoose.Schema.Types.Number, // 1 -> TODO, 2-> PROCESS, 3-> DONE
        required: true
    },
    priority: {
        type: mongoose.Schema.Types.Number, // 1 -> HIGH, 2 -> MIDDLE, 3 -> LOW
        required: true
    }
}, {
    timestamps: true
});

//Export the model
module.exports = mongoose.model('Task', taskSchema);