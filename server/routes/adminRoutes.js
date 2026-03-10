const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');
const { protect, admin } = require('../middleware/authMiddleware');

// @desc    Get all complaints
// @route   GET /api/admin/complaints
router.get('/complaints', protect, admin, async (req, res) => {
    try {
        const complaints = await Complaint.find({}).populate('user', 'name email');
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   PUT /api/admin/complaints/:id
router.put('/complaints/:id', protect, admin, async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id);

        if (complaint) {
            complaint.status = req.body.status || complaint.status;
            complaint.assignedDepartment = req.body.assignedDepartment || complaint.assignedDepartment;
            complaint.adminResponse = req.body.adminResponse || complaint.adminResponse;
            complaint.urgency = req.body.urgency || complaint.urgency;

            const updatedComplaint = await complaint.save();
            res.json(updatedComplaint);
        } else {
            res.status(404).json({ message: 'Complaint not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get dashboard metrics
// @route   GET /api/admin/metrics
router.get('/metrics', protect, admin, async (req, res) => {
    try {
        const total = await Complaint.countDocuments({});
        const pending = await Complaint.countDocuments({ status: 'Pending' });
        const inProgress = await Complaint.countDocuments({ status: 'In Progress' });
        const resolved = await Complaint.countDocuments({ status: 'Resolved' });

        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const newToday = await Complaint.countDocuments({ createdAt: { $gte: startOfDay } });

        const categoryStats = await Complaint.aggregate([
            { $group: { _id: '$category', count: { $sum: 1 } } }
        ]);

        const statusStats = await Complaint.aggregate([
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);

        res.json({
            total,
            pending,
            inProgress,
            resolved,
            newToday,
            categoryStats,
            statusStats
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
