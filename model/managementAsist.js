const dateExist = (req, res) => {
    const userId = req.query.user;
    // const userId = 5;
    let lastDataResult = ""
    req.getConnection((err, conn) => {
        if (err) {
            console.log("Este es el error de con: " + err);
            console.log(err);
        }

        const sql = "SELECT * FROM asistencia WHERE id_usuario = ?";
        conn.query(sql, [userId], (err, data) => {
            if (err) {
                console.log("Error en la consulta" + err);
            }

            res.send('ok!');
            console.log("Este es el ultimo registro: ");
            console.log(data[data.length - 1]);
            lastDataResult = data[data.length - 1];
        });

    });

    return lastDataResult;
}

module.exports = {
    dateExist: dateExist,
}