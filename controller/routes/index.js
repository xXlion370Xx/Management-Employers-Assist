const express = require('express');
const router = express.Router();
const formModel = require('../../model/formModel');

/* GET home page. */
router.get('/', formModel.getHomePage);
router.post('/login', formModel.login);

router.get('/register', (req, res) => {
  res.render('register');
});
router.post('/register', formModel.register);

module.exports = router;
