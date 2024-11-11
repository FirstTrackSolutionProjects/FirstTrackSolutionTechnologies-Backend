const express = require('express');
const router = express.Router();
const {careerMail, contactEmail, joiningMail} = require('../controllers/emailController');

router.post('/career', careerMail)
router.post('/contact',contactEmail)
router.post('/join',joiningMail)

module.exports = router