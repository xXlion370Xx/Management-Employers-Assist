const dateExist = (req, res) => {
    const userId = req.query.user;
    // const userId = 5;
    req.getConnection((err, conn) => {
        if (err) {
            console.log("Error in get connection");
            console.log(err);
        }

        const sql = "SELECT * FROM asistencia WHERE id_usuario = ?";
        conn.query(sql, [userId], (err, data) => {
            if (err) {
                console.log("Query error");
                console.log(err);
            }
            res.send(data[data.length - 1]);
        });
    });
}

module.exports = {
    dateExist: dateExist,
}