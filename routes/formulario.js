const { render } = require('ejs');
let express = require('express');
let router = express.Router();
let connectDB = require('../connection');


let status = "Error";

router.post("/", (req, res) => {
    let data = req.body;

    connectDB.connect();

    connectDB.query(`INSERT INTO usuarios (Usuario, Contraseña) VALUES( ?, ?)`,
        [data.user, data.password],
        function (err, result) {
            if (err) {
                res.render('index', { tittle: 'Inicio', status })
            };
            console.log(result);
        });

    connectDB.end();

    res.render('users', { title: 'user' });
});

module.exports = router;