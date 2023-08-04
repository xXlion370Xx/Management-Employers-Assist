const express = require('express');
const router = express.Router();
const managementAsist = require('../../model/managementAsist');
const managementUser = require('../../model/managementUser');


router.get('/asist', managementUser.authMiddleware, managementAsist.getUserAsist);
router.post('/asist', managementUser.authMiddleware, managementAsist.insertDate);


router.get('/logout', managementUser.logOut);

router.get('/restore', managementUser.restorePassword);

module.exports = router;
