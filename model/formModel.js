const jwt = require('jsonwebtoken');

const register = (req, res) => {
    const data = req.body;

    req.getConnection((err, conn) => {
        if (err) {
            console.log("No se pudo conectar a la base de datos debido a " + err);
        }

        const sql = 'INSERT INTO usuarios (Usuario, Contraseña) VALUES(?, ?)';
        conn.query(sql, [data.user, data.password], (err, rows) => {
            if (err) {
                console.log(sql)
                console.log("No se pudo insertar el usuario a la base de datos debido a: " + err)
                res.render('register', { errorMessage: 'Algo salio mal' })
            } else {
                console.log("Registro exitoso");
                res.send('Registro exitorsamente')
            }
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

        const sql = "SELECT * FROM usuarios WHERE Usuario = ? and Contraseña = ?";
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