const express = require('express');
const router = express.Router();
const managementAsist = require('../../model/managementAsist');
const managementUser = require('../../model/managementUser');

router.get('/asist', managementAsist.dateExist);
router.post('/asist', managementAsist.insertDate);

router.get('/logout', managementUser.logOut);

module.exports = router;
