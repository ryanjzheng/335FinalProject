const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('home'); // Renders home.ejs
});

module.exports = router;