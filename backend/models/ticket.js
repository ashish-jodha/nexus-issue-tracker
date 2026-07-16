const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String, 
        trim: true,
        required: true
    },
    status: {
        type: String,
        enum: ["Open" , "In Progress" , "Closed"],
        required: true
    },
    priority: {
        type: String,
        enum: ["Low" , "Medium" , "High"],
        required: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model('Ticket' , ticketSchema);