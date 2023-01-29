const register = (req, res) => {
    const data = req.body;
    let sql = 'INSERT INTO usuarios (id, Usuario, Contraseña) VALUES(3, ?, ?)';


    req.getConnection((err, conn) => {
        conn.query(sql, [data.user, data.password], (err, rows) => {
            if (err) {
                console.log("No se pudo insertar el usuario a la base de datos debido a: " + err)
                res.send('No se pudo registrar el usuario');
            } else {
                console.log("Registro exitoso");
                res.send('Registro exitorsamente')
            }
        })
    })
}

module.exports = {
    register: register,
}