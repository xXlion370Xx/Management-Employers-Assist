const express = require('express');
const router = express.Router();
const managementAdmin = require('../../model/managementAdmin');

router.get('/', managementAdmin.getAdminList);
router.post('/createWorker', managementAdmin.insertWorker);


module.exports = router;
