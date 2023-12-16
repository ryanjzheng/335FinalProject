const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('login'); // Renders home.ejs
});

module.exports = router;