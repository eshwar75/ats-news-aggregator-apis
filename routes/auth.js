const express = require('express');
const router = express.Router();

router.post('/register', require('../controllers/authControllers').register)
router.post('/login', require('../controllers/authControllers').login)

module.exports = router;