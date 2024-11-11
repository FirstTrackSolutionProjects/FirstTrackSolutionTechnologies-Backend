const express = require('express');
const router = express.Router();
const {careerMail, contactEmail} = require('../controllers/emailController');

router.post('/career', careerMail)
router.post('/contact',contactEmail)

module.exports = router