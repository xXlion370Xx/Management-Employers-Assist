const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const managementAdmin = require('../../model/managementAdmin');
const managementUser = require('../../model/managementUser');

router.post('/updateWorker/:id/:usuario/:rol', managementUser.authMiddleware, managementAdmin.updateWorker);

router.get('/', managementUser.authMiddleware, managementAdmin.getAdminList);
router.post('/createWorker', managementUser.authMiddleware, managementAdmin.insertWorker);

router.get('/inactiveWorker/:id/:status', managementUser.authMiddleware, managementAdmin.inactiveWorker);
router.get('/getDataWorkers/:id', managementUser.authMiddleware, managementAdmin.getDataWorkers);
router.get('/edit', managementUser.authMiddleware, (req, res) => {
    const token = req.cookies.token;
    const { name } = jwt.decode(token);
    res.render('editMyUser', { title: 'Editar mi usuario', userName: name });
})
router.post('/edit', managementUser.authMiddleware, managementAdmin.updateAdminData)

module.exports = router;
