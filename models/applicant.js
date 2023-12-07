const mongoose = require('mongoose');

const applicantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gpa: {
        type: Number,
        required: true
    },
    background: {
        type: String,
        required: true
    }
});

const Applicant = mongoose.model('Applicant', applicantSchema, 'my_collection');

module.exports = Applicant;