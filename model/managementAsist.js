const jwt = require('jsonwebtoken');
const util = require('./UTILS/APIS');
const { query } = require('express');
require('dotenv').config();

const dateExist = (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).send({ message: "Don't provide an authentication token!" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            res.send("Error verify token");
            return;
        }
        const idUser = decodedToken.userData.id;
        console.log(decodedToken);
        console.log("Este es el id del usuario: " + idUser);

        req.getConnection((err, conn) => {
            if (err) {
                console.log("Error in get connection");
                console.log(err);
            }

            const sql = "SELECT * FROM asist WHERE id_user = ? LIMIT 50";
            conn.query(sql, [idUser], (err, data) => {
                if (err) {
                    console.log("Query error");
                    console.log(err);

                    return;
                }
                if (data.length === 0) {
                    const asistData =
                    {
                        id_asist: null,
                        id_user: null,
                        time_in: null,
                        time_out: null,
                        date: null
                    }

                    util.generateToken({ asistData }, '1h').then(tokenAsist => {
                        res.cookie('tokenAsist', tokenAsist, {
                            httpOnly: true,
                            maxAge: 3600000 // 1 hour
                        }).json(asistData);
                    });

                    return;
                }

                const asistData = getLastItem(data);
                console.log("Este es el last");
                console.log(asistData);
                util.generateToken({ asistData }, '1h').then(tokenAsist => {
                    res.cookie('asistData', tokenAsist, {
                        httpOnly: true,
                        maxAge: 3600000 // 1 hour
                    }).send(asistData);
                });

            });
        });
    });


}

const getLastItem = (rows) => rows[rows.length - 1];

const insertDate = (req, res) => {
    const token = req.cookies.token;
    const tokenAsist = req.cookies.asistData;
    const timeType = req.body.timeType;

    if (!token && !tokenAsist) {
        return res.status(401).send({ message: 'No se proporcionó un token de autenticación.' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const decodedTokenAsist = jwt.verify(tokenAsist, process.env.JWT_SECRET);
        const idUser = decodedToken.userData.id;
        const idAsist = decodedTokenAsist.asistData.id_asist;

        console.log("Este es el id asis" + idAsist);
        util.getCurrentLocalTime().then(response => {
            const timeNow = response.time;
            const dateNow = response.date;

            req.getConnection((err, conn) => {
                if (err) throw err;

                let sql = "";
                if (timeType == "time_in") {
                    sql = "INSERT INTO asist (id_user, time_in, date) VALUES (?,?,?)";
                    conn.query(sql, [idUser, timeNow, dateNow], (err, data) => {
                        if (err) {
                            console.log("query error");
                            console.log(err);

                            return;
                        }

                        if (data.length != 0) {
                            res.redirect('/users/');

                            return;
                        }

                        res.send("Something went wrong");
                    })
                } else {
                    sql = "UPDATE asist SET time_out = ?, date = ? WHERE id_user = ? AND id_asist = ?";
                    conn.query(sql, [timeNow, dateNow, idUser, idAsist], (err, data) => {
                        if (err) {
                            console.log("query error");
                            console.log(err);

                            return;
                        }

                        if (data.length != 0) {
                            res.redirect('/users/');

                            return;
                        }

                        res.send("Something went wrong");
                    })
                }


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