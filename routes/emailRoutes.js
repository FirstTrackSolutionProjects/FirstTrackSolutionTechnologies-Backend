const express = require('express');
const router = express.Router();
const {careerMail} = require('../controllers/emailController');

router.post('/career', careerMail)

module.exports = router