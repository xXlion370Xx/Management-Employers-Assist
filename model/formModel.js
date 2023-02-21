const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

const login = (req, res) => {
    const reqData = req.body;

    req.getConnection((err, conn) => {
        if (err) {
            console.log("No se pudo conectar a la base de datos debido a " + err);
            console.log(err);
        }

        const sql = "SELECT * FROM users WHERE name = ? and password = ?";
        conn.query(sql, [reqData.user, reqData.password], (err, data) => {
            if (err) throw err;

            if (data.length === 0) {
                res.render('login', { title: 'Iniciar Sesión', errorMessage: 'Algo salio mal' });
                console.log("No se encontro registro con esa data: Obj-> " + data.length);
                return;
            }
            if (data[0].Usuario == reqData.user && data[0].Contraseña == reqData.password) {
                res.render('home', { user: data[0].Usuario, rol: data[0].Tipo });
            }
        });
    });

}

const generateToken = (data) => {
    const payload = {
        id: data.id,
        user: data.user,
        password: data.password
    }
}
module.exports = {
    register: register,
    login: login,
}