const express = require('express');
const validateJWT = require('../middleware/validateJWT');
const router = express.Router();

router.get('/preferences', validateJWT, require('../controllers/preferencesControllers').getThePerferencesDetails)
router.put('/preferences', validateJWT, require('../controllers/preferencesControllers').updateThePerferencesDetails)

module.exports = router;