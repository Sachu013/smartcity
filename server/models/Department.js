const mongoose = require('mongoose');

const departmentSchema = mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        head: { type: String },
        contact: { type: String },
    },
    { timestamps: true }
);

const Department = mongoose.model('Department', departmentSchema);
module.exports = Department;
