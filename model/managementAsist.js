const jwt = require('jsonwebtoken');
const currentLocalTime = require('./api');
const { query } = require('express');

const getUserAsist = (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        console.log("Don't provide an authentication token!");
        return res.status(401).send({ message: `Don't provide an authentication token!` });
    }

    const decodedToken = jwt.decode(token);
    console.log("Token decoded info");
    console.log(decodedToken);
    console.log(decodedToken.id);
    req.getConnection((err, conn) => {
        if (err) {
            console.log("Error in get connection");
            console.log(err);
        }

        const sql = "SELECT * FROM asist WHERE id_user = ?";
        conn.query(sql, [decodedToken.id], (err, data) => {
            if (err) {
                console.log("Query error");
                console.log(err);

                return;
            }

            //if data is null, response with null res
            if (data.length === 0) {
                const objResponse =
                    [{
                        id: null,
                        id_user: null,
                        time_in: null,
                        time_out: null,
                        date: null
                    }]
                res.json(objResponse);

                return;
            }

            res.send(data);
        });
    });
}

const insertDate = (req, res) => {
    const token = req.cookies.token;
    const { entry, exit } = req.body;
    console.log(entry);
    console.log(exit);

    if (!token) {
        return res.status(401).send({ message: "Don't provide an authentication token!" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Token asist?");
        console.log(decoded);
        const idUser = decoded.id;

        currentLocalTime.getCurrentLocalTime().then(response => {
            const timeNow = response.time;
            const dateNow = response.date;

            req.getConnection((err, conn) => {
                if (err) throw err;

                if (entry) {
                    updateEntry(conn, res, idUser, timeNow, dateNow);
                }
                if (exit) {
                    updateExit(conn, res, idUser, timeNow);
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

const updateEntry = (conn, res, idUser, timeNow, dateNow) => {
    const sql = "INSERT INTO asist (id_user, time_in, date) VALUES (?,?,?)";
    conn.query(sql, [idUser, timeNow, dateNow], (err, data) => {
        if (err) {
            console.log("query error");
            console.log(err);

            return;
        }
        if (data.length != 0) {
            res.redirect("/");

            return;
        }
        res.send("Oops, something went wrong!")
    })
}

const updateExit = (conn, res, idUser, timeNow) => {
    const sql = "UPDATE asist SET time_out = ? WHERE id_user = ?";
    conn.query(sql, [timeNow, idUser], (err, data) => {
        if (err) {
            console.log("query error");
            console.log(err);

            return false;
        }
        if (data.length != 0) {
            res.redirect("/");
            return;
        }

        res.send("Oops, something went wrong!");
    })
}
module.exports = {
    getUserAsist: getUserAsist,
    insertDate: insertDate
}