const jwt = require('jsonwebtoken');
const { query } = require('express');
const generatorTokens = require('./UTILS/generatorTokens');
const currentLocalTime = require('./UTILS/APIS');

const getUserAsist = (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        console.log("Don't provide an authentication token!");
        return res.status(401).send({ message: `Don't provide an authentication token!` });
    }
    console.log(token);
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
                        id_asist: null,
                        id_user: null,
                        time_in: null,
                        time_out: null,
                        date: null
                    }]
                res.json(objResponse);

                return;
            }
            const lastItemData = data[data.length - 1];

            generatorTokens.generateToken('1h', lastItemData).then(tokenAsist => {
                res.cookie('tokenAsist', tokenAsist, {
                    httpOnly: true,
                    maxAge: 3600000, // 1 hour
                }).send(data);
            })

        });
    });


}


const insertDate = (req, res) => {
    const tokenUser = req.cookies.token;
    const tokenAsist = req.cookies.tokenAsist;
    const { entry, exit } = req.body;

    if (!tokenUser) {
        return res.status(401).send({ message: "Don't provide an authentication tokenUser!" });
    }
    if (!tokenAsist) {
        return res.status(401).send({ message: "Don't provide an authentication tokenAsist!" });
    }

    try {
        const decodedTokenUser = jwt.verify(tokenUser, process.env.JWT_SECRET);
        console.log("Decoded token user info: ");
        console.log(decodedTokenUser);
        const idUser = decodedTokenUser.id;

        const decodedTokenAsit = jwt.verify(tokenAsist, process.env.JWT_SECRET);
        console.log("Decoded token asist info: ");
        console.log(decodedTokenAsit);
        const tokenAsistId = decodedTokenAsit.id_asist;

        currentLocalTime.getCurrentLocalTime().then(response => {
            const timeNow = response.time;
            const dateNow = response.date;

            req.getConnection((err, conn) => {
                if (err) throw err;

                if (entry) {
                    updateEntry(conn, res, idUser, timeNow, dateNow);
                }
                if (exit) {
                    updateExit(conn, res, tokenAsistId, timeNow);
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

const updateExit = (conn, res, idAsist, timeNow) => {
    const sql = "UPDATE asist SET time_out = ? WHERE id_asist = ?";
    conn.query(sql, [timeNow, idAsist], (err, data) => {
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