const express = require('express');
const router = express.Router();
const Applicant = require('../models/applicant');

router.get('/', async (req, res) => {
    try {
        // Extract the email parameter from the request
        const email = req.query.email;

        // Fetch the applicant with the given email from the database
        const applicant = await Applicant.findOne({ email });

        // Render the processApplication page with the applicant data
        res.render('processApplication', { applicant });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;