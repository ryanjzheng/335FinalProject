const express = require('express');
const router = express.Router();
const Applicant = require('../models/applicant');

router.get('/', (req, res) => {
    res.render('adminGPA'); 
});

router.post('/', async (req, res) => {
    try {
        // Extract GPA
        const selectedGPA = parseFloat(req.body.gpa);

        // Find applicants with a GPA greater than or equal to the selected GPA
        const selectedApplicants = await Applicant.find({ gpa: { $gte: selectedGPA } });

        // Render the adminGPA template with the selected applicants
        res.render('processAdminGPA', { selectedApplicants });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;