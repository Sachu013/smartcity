const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const { protect, admin } = require('../middleware/authMiddleware');

// Get all feedback (Admin only)
router.get('/', protect, admin, async (req, res) => {
    try {
        const feedback = await Feedback.find({}).populate('user', 'name').sort({ createdAt: -1 });
        res.json(feedback);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Submit feedback
router.post('/', protect, async (req, res) => {
    try {
        const feedback = await Feedback.create({
            ...req.body,
            user: req.user._id,
        });
        res.status(201).json(feedback);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
