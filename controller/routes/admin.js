const express = require('express');
const router = express.Router();
const managementAdmin = require('../../model/managementAdmin');

router.get('/', managementAdmin.getAdminList);
router.post('/createWorker', managementAdmin.insertWorker);

router.get('/inactiveWorker/:id/:status', managementAdmin.inactiveWorker);
router.get('/getDataWorkers/:id', managementAdmin.getDataWorkers);


module.exports = router;
