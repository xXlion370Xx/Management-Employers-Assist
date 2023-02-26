const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const register = async (req, res) => {
    const { user, password } = req.body;

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.log("Can´t encrypt due to" + err);

            return;
        }
        req.getConnection((err, conn) => {
            if (err) {
                console.log("Can´t connect to database due to" + err);

                return;
            }
            const sql = 'INSERT INTO users (name, password) VALUES(?, ?)';
            conn.query(sql, [user, hash], (err, rows) => {
                if (err) {
                    console.log(sql)
                    console.log("Can´t insert the user due to: " + err)
                    res.render('register', { errorMessage: 'Something went wrong' })
                } else {
                    console.log("Update succesful");
                    res.send('Update succesful')
                }
            })
        })
    })

}

const login = async (req, res) => {
    const { user, password } = req.body;

    req.getConnection((err, conn) => {
        if (err) {
            console.log("Can´t connect to databsae due to: " + err);
            console.log(err);
        }

        const sql = "SELECT * FROM users WHERE name = ?";
        conn.query(sql, [user], (err, data) => {
            if (err) throw err;

            if (data.length === 0) {
                res.render('login', { title: 'Iniciar Sesión', errorMessage: 'Usuario no existe' });
                console.log("No data with that info: " + data.length);

                return;
            }

            bcrypt.compare(password, data[0].password, (err, same) => {
                if (err) {
                    console.log("Something went wrong to compare the password with the hash due to: " + err);

                    return;
                }
                if (!same) {
                    res.render('login', { title: 'Inicio de Sesión', errorMessage: 'Contraseña incorrecta' });

                    return;
                }
                generateToken(data[0], '1h').then(token => {

                    res.cookie('token', token, {
                        httpOnly: true,
                        maxAge: 3600000 // 1 hour
                    }).render('home', {
                        user: data[0], user,
                        rol: data[0].rol
                    });
                }).catch(err => {
                    console.log("Can´t generate token due to: " + err);
                })
            });
        });
    });

}

const generateToken = async (data, duration) => {
    const payload = {
        id: data.id,
        user: data.name,
        password: data.password,
        rol: data.rol
    }

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: duration });
}
module.exports = {
    register: register,
    login: login,
}