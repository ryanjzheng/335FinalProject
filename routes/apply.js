const express = require('express');
const router = express.Router();
const Applicant = require('../models/applicant');

router.get('/', (req, res) => {
    res.render('apply'); // apply.ejs
});

router.post('/', async (req, res) => {
    try {
        // Extract data from the submitted form
        const { name, email, gpa, background } = req.body;

        // Create a new applicant instance using the Mongoose model
        const newApplicant = new Applicant({
            name,
            email,
            gpa,
            background,
        });

        // Save the applicant to the database
        await newApplicant.save();

        // Redirect to a success page or send a response
        res.redirect(`/processApplication?email=${encodeURIComponent(email)}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;