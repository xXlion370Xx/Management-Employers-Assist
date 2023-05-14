const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const generatorToken = require('./util/generatorTokens');
require('dotenv').config();

const register = async (req, res) => {
    const { user, password } = req.body;

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.log("Can't encrypt due to" + err);

            return;
        }
        req.getConnection((err, conn) => {
            if (err) {
                console.log("Can't connect to database due to" + err);

                return;
            }
            const sql = 'INSERT INTO users (name, password) VALUES(?, ?)';
            conn.query(sql, [user, hash], (err, rows) => {
                if (err) {
                    console.log(sql)
                    console.log("Can't insert the user due to: " + err)
                    res.render('register', { errorMessage: 'Something went wrong' })
                } else {
                    console.log("Update succesful");
                    res.send('Update succesful')
                }
            })
        })
    })

}

const getHomePage = (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        console.log("The client doesn't have a token");

        return res.render('login', { title: 'Inicio de sesión', status: '' });
    }

    // Check if the token is in the black list tonkens database
    req.getConnection((err, conn) => {
        if (err) {
            console.log("Can't connect to db due to: " + err);
            return;
        }

        const sql = "SELECT * FROM blacklisted_tokens WHERE token = ?";
        conn.query(sql, [token], (err, rows) => {
            if (err) {
                console.log("Can't query the black list token due to: " + err);
                console.log(err);
                return;
            }
            console.log(rows);
            if (rows.length == 0) {

                jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                    if (err) {
                        console.log("An error ocurred while verifying the token!");
                        return res.render('login', { title: 'Inicio de sesión', errorMessage: '' })
                    }

                    console.log("Decoded token info: ");
                    console.log(decoded);

                    generatorToken.generateTokenUser(decoded, '1h').then(token => {
                        console.log("The client have a token!");
                        const view = userView(decoded["rol"]);
                        console.log("This is the view that will be send " + view);

                        res.cookie('token', token, {
                            httpOnly: true,
                            maxAge: 3600000 // 1 hour
                        }).render(view, {
                            title: token.name,
                            user: token.name,
                            rol: token.rol
                        });
                    })

                });
                return;
            }
            console.log("Token in black listed tokens!");
            res.render('login', { title: 'Login', errorMessage: 'Debes iniciar sesion primero' });
        })
    })

}

const login = async (req, res) => {
    const { user, password } = req.body;

    req.getConnection((err, conn) => {
        if (err) {
            console.log("Can't connect to databsae due to: " + err);
            console.log(err);
        }
        console.log("Connection satisfactory!");
        const sql = "SELECT * FROM users WHERE name = ?";
        conn.query(sql, [user], (err, data) => {
            console.log("Quering the user in the database");
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
                    res.render('login', { title: 'Inicio de Sesión', errorMessage: 'Contraseña incorrecta', restorePwdMessage: '¿Olvidaste tu contraseña?', userRestore: user });

                    return;
                }
                generatorToken.generateTokenUser(data[0], '1h').then(token => {

                    const view = userView(data[0].rol);
                    console.log("This is the view that will be send " + view);
                    res.cookie('token', token, {
                        httpOnly: true,
                        maxAge: 3600000 // 1 hour
                    }).render(view, {
                        title: data[0].user,
                        user: data[0].user,
                        rol: data[0].rol
                    });

                }).catch(err => {
                    console.log("Can't generate token due to: " + err);
                })
            });
        });
    });

}

// Returns a string depending of the user rol passed in parameters
const userView = (userRol) => {
    const views = {
        "admin": "admin",
        "worker": "worker"
    }

    return views[userRol] || "rolNotFound";
}

module.exports = {
    register: register,
    login: login,
    getHomePage: getHomePage
}