const express = require('express');
const router = express.Router();
const formModel = require('../../model/formModel');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('login', { title: 'Inicio de sesión', status: '' });
});
router.post('/login', formModel.login);

router.get('/register', (req, res) => {
  res.render('register');
});
router.post('/register', formModel.register);

module.exports = router;
