const express = require('express');
const { getGetSignedUrl, getPutSignedUrl } = require('../controllers/hrmsS3Controller');

const router = express.Router();

router.post('/getUrl', getGetSignedUrl);
router.post('/putUrl', getPutSignedUrl);

module.exports = router;