const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');
const { protect, admin } = require('../middleware/authMiddleware');

// Keywords for auto-categorization and urgency
const categories = {
    'Garbage': ['trash', 'garbage', 'waste', 'dump', 'smell'],
    'Road Damage': ['pothole', 'street', 'road', 'asphalt', 'sidewalk'],
    'Water Leakage': ['leak', 'pipe', 'water', 'sewage', 'drain'],
    'Electricity': ['power', 'outage', 'blackout', 'transformer'],
    'Street Light': ['street light', 'lamp', 'dark', 'bulb'],
};

const departments = {
    'Garbage': 'Sanitation Department',
    'Road Damage': 'Public Works Department',
    'Water Leakage': 'Water Supply Department',
    'Electricity': 'Power Department',
    'Street Light': 'Electrical Department',
    'Other': 'General Administration',
};

const urgencyKeywords = ['urgent', 'danger', 'immediate', 'emergency', 'dying', 'accident'];

const analyzeComplaint = (text) => {
    const content = text.toLowerCase();
    let category = 'Other';
    let urgency = 'Medium';

    for (const [cat, keywords] of Object.entries(categories)) {
        if (keywords.some((kw) => content.includes(kw))) {
            category = cat;
            break;
        }
    }

    if (urgencyKeywords.some((kw) => content.includes(kw))) {
        urgency = 'Urgent';
    }

    return { category, urgency, assignedDepartment: departments[category] };
};

// @desc    Submit a complaint
// @route   POST /api/complaints
router.post('/', protect, async (req, res) => {
    const { title, description, location, imageUrl } = req.body;

    try {
        const analysis = analyzeComplaint(title + ' ' + description);

        // Simple ID generator
        const complaintId = 'CMP' + Date.now().toString().slice(-8);

        const complaint = await Complaint.create({
            complaintId,
            user: req.user._id,
            title,
            description,
            location,
            imageUrl,
            category: analysis.category,
            urgency: analysis.urgency,
            assignedDepartment: analysis.assignedDepartment,
        });

        res.status(201).json(complaint);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get user's complaints
// @route   GET /api/complaints/my
router.get('/my', protect, async (req, res) => {
    try {
        const complaints = await Complaint.find({ user: req.user._id });
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Track a complaint by ID
// @route   GET /api/complaints/track/:id
router.get('/track/:id', async (req, res) => {
    try {
        const complaint = await Complaint.findOne({ complaintId: req.params.id })
            .populate('user', 'name');

        if (complaint) {
            res.json(complaint);
        } else {
            res.status(404).json({ message: 'Complaint not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
