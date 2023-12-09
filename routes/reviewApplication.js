const express = require('express');
const router = express.Router();
const Applicant = require('../models/applicant');

router.get('/', (req, res) => {
    res.render('reviewApplication');
});

// Handle reviewing an existing application
router.post('/', async (req, res) => {
    try {
        const { weightCategory } = req.body;

        // Find the applicant in the database based on the email
        const applicant = await Applicant.find({ 'weight': weightCategory });
        
        console.log(applicant);

        // Render the processApplication template with the applicant information
        res.render('processApplication', { applicant });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;