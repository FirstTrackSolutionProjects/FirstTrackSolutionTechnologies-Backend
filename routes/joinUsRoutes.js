const express = require('express');
const { validateJoinUsAuth, getJoinUsRequest } = require('../controllers/joinUsController');

const router = express.Router();

router.post('/validate', validateJoinUsAuth);
router.get('/details', getJoinUsRequest);

module.exports = router;