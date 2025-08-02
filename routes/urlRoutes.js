const express = require('express');
const router = express.Router();
const { shortenUrl , getHistory} = require('../controllers/urlController');

router.get('/shorturls/:shortcode', getHistory);

router.post('/shorturls', shortenUrl);

module.exports = router;
