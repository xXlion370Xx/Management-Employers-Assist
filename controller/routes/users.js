const express = require('express');
const router = express.Router();
const userUpdate = require('../../model/managementAsist');
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/userUpdate', userUpdate.dateExist);


module.exports = router;
