const { render } = require('ejs');
let express = require('express');
let router = express.Router();
const formModel = require('../../model/formModel');

router.get('/register', (req, res) => {
    res.render('register');
});
router.post('/register', formModel.register);

// router.get('/login', (req, res) => {
//     res.render('login', { title: 'Inicio de sesion' });
// })
router.post('/login', formModel.login);

module.exports = router;