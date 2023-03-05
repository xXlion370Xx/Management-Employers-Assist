const jwt = require('jsonwebtoken');
const currentLocalTime = require('./api');
const { query } = require('express');

const dateExist = (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).send({ message: "Don't provide an authentication token!" });
    }
    const idUser = token.id;

    req.getConnection((err, conn) => {
        if (err) {
            console.log("Error in get connection");
            console.log(err);
        }

        const sql = "SELECT * FROM asist WHERE id_user = ?";
        conn.query(sql, [idUser], (err, data) => {
            if (err) {
                console.log("Query error");
                console.log(err);

                return;
            }
            if (data.length === 0) {
                const objResponse =
                {
                    id: null,
                    id_usuario: null,
                    entrada: null,
                    salida: null,
                    fecha: null
                }
                res.json(objResponse);

                return;
            }

            res.send(data[data.length - 1]);
        });
    });
}

const insertDate = (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).send({ message: 'No se proporcionó un token de autenticación.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const idUser = decoded.id;

        currentLocalTime.getCurrentLocalTime().then(response => {
            const timeNow = response.time;
            const dateNow = response.date;

            req.getConnection((err, conn) => {
                if (err) throw err;

                const sql = "INSERT INTO asist (id_user, time_in, date) VALUES (?,?,?)"
                conn.query(sql, [idUser, timeNow, dateNow], (err, data) => {
                    if (err) {
                        console.log("query error");
                        console.log(err);

                        return;
                    }

                    let querySql = query.sql;

                    console.log("Este es el query " + querySql);

                    if (data.length != 0) {
                        res.redirect('/users/');

                        return;
                    }

                    res.send("Something went wrong");
                })
            });
        }).catch(err => {
            res.send(err);
        })


    } catch (err) {
        res.status(400).send("Token invalid");
        console.log("Token invalid! due to :" + err);
        console.log(err);
    }
}
module.exports = {
    dateExist: dateExist,
    insertDate: insertDate
}