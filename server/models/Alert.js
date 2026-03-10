const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['Emergency', 'Warning', 'Info'],
        default: 'Info',
    },
    severity: {
        type: String,
        enum: ['Critical', 'Moderate', 'Low'],
        default: 'Moderate',
    },
    area: {
        type: String,
        required: true,
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Alert', alertSchema);
