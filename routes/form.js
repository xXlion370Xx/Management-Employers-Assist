const { render } = require('ejs');
let express = require('express');
let router = express.Router();
const register = require('./../model/register');

router.get('/register', (req, res) => {
    res.render('register');
});
router.post('/register', register.register);

// router.post('form/login', (req, res) => {
//     let data = req.body;
//     let sql = "SELECT * FROM usuarios WHERE Usuario = ? and Contraseña = ?";

//     let query = connectDB.query(sql,
//         [data.user, data.password], (err, result) => {
//             if (err) throw err;
//             console.log("Resultado: " + result + " Error?: " + err);

//             if (result.lenght === 0) {
//                 res.send("No vino nada de la consultar")
//             }
//         });

// });

module.exports = router;