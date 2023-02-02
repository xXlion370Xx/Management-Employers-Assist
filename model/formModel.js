const register = (req, res) => {
    const data = req.body;
    let sql = 'INSERT INTO usuarios (Usuario, Contraseña) VALUES(?, ?)';

    req.getConnection((err, conn) => {
        if (err) {
            console.log("No se pudo conectar a la base de datos debido a " + err);
        }
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
    let sql = "SELECT * FROM usuarios WHERE Usuario = ? and Contraseña = ?";

    req.getConnection((err, conn) => {
        if (err) {
            console.log("No se pudo conectar a la base de datos debido a " + err);
        }
        conn.query(sql, [reqData.user, reqData.password], (err, data) => {
            if (data.length > 0) {
                res.status(200).render('home', { user: data[0].Usuario, rol: data[0].Tipo });
                // console.log("Este es el param err: " + err);
                // console.log("Este es el param data: " + data.Usuario);
                // console.log("Este es el param data: " + data[0].Usuario);
                // console.log("tamaño del data: " + data.length);

                console.log("Inicio de sesion correctamente");
                console.log("Rol" + data[0].Tipo);
                //res.send("Inicio de sesion correctamente " + "Bienvenido " + data[0].Usuario);
            } else {
                console.log("No se pudo iniciar sesión");
                res.render('login', { title: 'Error iniciar sesion', errorMessage: 'Algo salio mal' });
            }
        })
    });

}

module.exports = {
    register: register,
    login: login,
}