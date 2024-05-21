const express = require('express');
const validateJWT = require('../middleware/validateJWT');
const router = express.Router();

router.get('/news', validateJWT, require('../controllers/newsController').getNews)

module.exports = router;
