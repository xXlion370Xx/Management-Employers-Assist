const express = require('express');
const router = express.Router();
const managementAsist = require('../../model/managementAsist');

router.get('/asist', managementAsist.dateExist);
router.post('/asist', managementAsist.insertDate);

module.exports = router;
