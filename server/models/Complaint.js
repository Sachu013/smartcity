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
            enum: ['Road', 'Water', 'Waste', 'Electricity', 'Other'],
        },
        imageUrl: { type: String },
        location: { type: String, required: true },
        status: {
            type: String,
            required: true,
            enum: [
                'Submitted',
                'Under Review',
                'Assigned to Department',
                'In Progress',
                'Resolved',
            ],
            default: 'Submitted',
        },
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
