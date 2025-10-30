const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true // Adds 'createdAt' and 'updatedAt' Date fields automatically
});

const Subscriber = mongoose.model('Subscriber', subscriberSchema);
module.exports = Subscriber;
