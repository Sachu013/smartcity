const express = require('express');
const router = express.Router();
const Alert = require('../models/Alert');
const { protect, admin } = require('../middleware/authMiddleware');

// Get all alerts
router.get('/', protect, async (req, res) => {
    try {
        const alerts = await Alert.find({}).sort({ createdAt: -1 });
        res.json(alerts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create alert (Admin only)
router.post('/', protect, admin, async (req, res) => {
    try {
        const alert = await Alert.create({
            ...req.body,
            postedBy: req.user._id,
        });
        res.status(201).json(alert);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
