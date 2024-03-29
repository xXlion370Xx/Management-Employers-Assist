const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');
const generatorTokens = require('./UTILS/generatorTokens');
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
    const tokenUser = req.cookies.token;

    if (!tokenUser) {
        console.log("The client doesn't have a token");

        return res.render('login', { title: 'Inicio de sesión', status: '' });
    }
    console.log("The client have a token!");

    // Check if the token is in the black list tonkens database
    req.getConnection((err, conn) => {
        if (err) {
            console.log("Can't connect to db due to: " + err);
            return;
        }

        const sql = "SELECT * FROM blacklisted_tokens WHERE token = ?";
        conn.query(sql, [tokenUser], (err, rows) => {
            if (err) {
                console.log("Can't query the black list token due to: " + err);
                console.log(err);
                return;
            }
            console.log(rows);
            if (rows.length == 0) {

                jwt.verify(tokenUser, process.env.JWT_SECRET, (err, decodedTokenUser) => {
                    if (err) {
                        console.log("An error ocurred while verifying the token!");
                        return res.render('login', { title: 'Inicio de sesión', errorMessage: '' })
                    }

                    console.log("Decoded token user info: ");
                    console.log(decodedTokenUser);

                    generatorTokens.generateToken('1h', decodedTokenUser)
                        .then(tokenUser => {
                            console.log("token user generated: " + tokenUser);

                            const view = userView(decodedTokenUser["rol"]);
                            console.log("This is the view that will be send: " + view);

                            res.cookie('token', tokenUser, {
                                httpOnly: true,
                                maxAge: 3600000 // 1 hour
                            }).render(view, {
                                title: "Registros " + decodedTokenUser["name"],
                                user: decodedTokenUser["name"],
                                rol: decodedTokenUser["rol"],
                                message: "No se encontró un rol en el sistema.",
                                error: {
                                    status: "noRol",
                                    message: "Contacte con el administrador para asignarle un rol."
                                }
                            });
                        }).catch(error => {
                            console.log("Something went wrong while generating and sending the token user info due to: " + error);
                            console.log(error);
                        })

                });
                return;
            }
            console.log("Token in black listed tokens!");
            res.render('login', { title: 'Login', errorMessage: 'Debes iniciar sesión primero' });
        })
    })

}

const login = async (req, res) => {
    const { user, password } = req.body;

    if (!validator.isAlphanumeric(user) && !validator.isAlphanumeric(password)) {
        res.render('login', { title: 'Iniciar Sesión', errorMessage: 'No se aceptan caracteres especiales' })
        return;
    }
    req.getConnection((err, conn) => {
        if (err) {
            console.log("Can't connect to database due to: " + err);
            console.log(err);
        }
        console.log("Connection satisfactory!");
        const sql = "SELECT * FROM users WHERE name = ?";
        conn.query(sql, [user], (err, data) => {
            console.log("Database response querying the user to login");
            console.log(data);
            console.log("Quering the user in the database");
            if (err) throw err;

            if (data.length === 0) {
                res.render('login', { title: 'Iniciar Sesión', errorMessage: 'Usuario no existe' });
                console.log("No data with that info: " + data.length);

                return;
            }

            if (data[0].status == "Inactive") {
                res.render('login', { title: 'Inicio de Sesión', errorMessage: 'Usuario desactivado' })
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

                generatorTokens.generateToken('1h', data[0]).then(token => {

                    const view = userView(data[0].rol);
                    console.log("This is the view that will be send: " + view);

                    res.cookie('token', token, {
                        httpOnly: true,
                        maxAge: 3600000 // 1 hour
                    }).render(view, {
                        title: "Registros" + data[0].name,
                        user: data[0].name,
                        rol: data[0].rol,
                        message: "No se encontro un rol en el sistema.",
                        error: {
                            status: "noRol",
                            message: "Contacte con el administrador para asignarle un rol."
                        }
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
        "worker": "worker",
        "adminWorker": "adminWorker"
    }

    return views[userRol] || "error";
}

module.exports = {
    register: register,
    login: login,
    getHomePage: getHomePage
}