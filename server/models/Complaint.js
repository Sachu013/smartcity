const mongoose = require('mongoose');

const complaintSchema = mongoose.Schema(
    {
        complaintId: { type: String, required: true, unique: true },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        title: { type: String, required: true },
        description: { type: String, required: true },
        category: {
            type: String,
            required: true,
            enum: ['Garbage', 'Road Damage', 'Water Leakage', 'Electricity', 'Street Light', 'Other'],
        },
        imageUrl: { type: String },
        location: { type: String, required: true },
        status: {
            type: String,
            required: true,
            enum: ['Pending', 'In Progress', 'Resolved'],
            default: 'Pending',
        },
        adminResponse: { type: String },
        assignedDepartment: { type: String },
        urgency: {
            type: String,
            enum: ['Low', 'Medium', 'High', 'Urgent'],
            default: 'Medium',
        },
    },
    { timestamps: true }
);

const Complaint = mongoose.model('Complaint', complaintSchema);
module.exports = Complaint;
