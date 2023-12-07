const express = require('express');
const router = express.Router();
const Applicant = require('../models/applicant');

router.get('/', (req, res) => {
    res.render('adminRemove'); // apply.ejs
});

// Handle removing all applications
router.post('/', async (req, res) => {
    try {
        // Remove all applications from the database
        const result = await Applicant.deleteMany({});
        const removedCount = result.deletedCount;

        // Return a success message
        res.render('processAdminRemove', { removedCount });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;