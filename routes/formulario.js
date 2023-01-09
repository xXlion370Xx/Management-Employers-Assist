let express = require('express');
let router = express.Router();
let connectDB = require('../connection');
router.post("/", (req, res) => {
    let data = req.body;

    connectDB.connect();

    connectDB.query(`INSERT INTO usuarios (Usuario, Contraseña) VALUES( ?, ?)`,
        [data.user, data.password],
        function (err, result) {
            if (err) {
                console.log("Algo salio mal", err)
            };
            console.log(result);
        });

    connectDB.end();

    res.render('index', {
        status: 'Todo salio bien'
    });


})

module.exports = router;