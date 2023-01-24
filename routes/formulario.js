const { render } = require('ejs');
let express = require('express');
let router = express.Router();
let connectDB = require('../connection');

connectDB.connect();

router.post("/", (req, res) => {
    let data = req.body;
    let query = connectDB.query(`SELECT * FROM usuarios WHERE Usuario = ? and Contraseña = ?`,
        [data.user, data.password]);

    if (query == null) {
        req.session.errorMessage = 'Algo salio mal';
        res.redirect('/formulario');
    } else {
        res.redirect('/asist');
    }

});
connectDB.end();
module.exports = router;