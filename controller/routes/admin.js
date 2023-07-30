const express = require('express');
const router = express.Router();
const managementAdmin = require('../../model/managementAdmin');

router.post('/updateWorker/:id/:usuario/:rol', managementAdmin.updateWorker);

router.get('/', managementAdmin.getAdminList);
router.post('/createWorker', managementAdmin.insertWorker);

router.get('/inactiveWorker/:id/:status', managementAdmin.inactiveWorker);
router.get('/getDataWorkers/:id', managementAdmin.getDataWorkers);
router.get('/edit', (req, res) => {
    res.render('editMyUser', { title: 'Editar mi usuario' });
})

module.exports = router;
