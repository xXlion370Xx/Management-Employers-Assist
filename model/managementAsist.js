const jwt = require('jsonwebtoken');
const { query } = require('express');
const generatorTokens = require('./UTILS/generatorTokens');
const currentLocalTime = require('./UTILS/APIS');

const getUserAsist = (req, res) => {
    const tokenUser = req.cookies.token;

    if (!tokenUser) {
        console.log("Don't provide an authentication token!");
        return res.status(401).send({ message: `Don't provide an authentication token!` });
    }
    console.log("This is the token user: " + tokenUser);
    const decodedTokenUser = jwt.decode(tokenUser);
    console.log("Token user decoded info");
    console.log(decodedTokenUser);
    console.log("id user: " + decodedTokenUser.id);
    req.getConnection((err, conn) => {
        if (err) {
            console.log("Error in get connection");
            console.log(err);
        }

        const sql = "SELECT * FROM asist WHERE id_user = ?";
        conn.query(sql, [decodedTokenUser.id], (err, data) => {
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
                generatorTokens.generateToken('1h', objResponse[0])
                    .then(tokenAssist => {
                        console.log("Generating and creating token assist");
                        res.cookie('tokenAsist', tokenAssist, {
                            httpOnly: true,
                            maxAge: 3600000 // 1 hour
                        }).send(objResponse);
                    })
                    .catch(error => {
                        console.log("Something went wrong sending the token assist due to: " + error);
                        console.log(error);
                        res.status(500);
                    });

                return;
            }

            const lastItemData = data[data.length - 1];
            generatorTokens.generateToken('1h', lastItemData)
                .then(tokenAssist => {
                    console.log("Generating and creating token assist");
                    res.cookie('tokenAsist', tokenAssist, {
                        httpOnly: true,
                        maxAge: 3600000, // 1 hour
                    }).send(data);
                }).catch(error => {
                    console.log("Something went wrong sending the token assist due to: " + error);
                    console.log(error);
                    res.status(500);
                })

        });
    });


}


const insertDate = (req, res) => {
    const tokenUser = req.cookies.token;
    const tokenAssist = req.cookies.tokenAsist;
    const { entry, exit } = req.body;
    console.log("This is the token assist: " + tokenAssist);

    if (!tokenUser) {
        return res.status(401).send({ message: "Don't provide an authentication tokenUser!" });
    }
    if (!tokenAssist) {
        return res.status(401).send({ message: "Don't provide an authentication tokenAsist!" });
    }

    try {
        const decodedTokenUser = jwt.verify(tokenUser, process.env.JWT_SECRET);
        console.log("Decoded token user info: ");
        console.log(decodedTokenUser);
        const idUser = decodedTokenUser.id;

        const decodedTokenAssist = jwt.verify(tokenAssist, process.env.JWT_SECRET);
        console.log("Decoded token assist info: ");
        console.log(decodedTokenAssist);
        const tokenAssistId = decodedTokenAssist.id_asist;

        currentLocalTime.getCurrentLocalTime()
            .then(response => {
                const timeNow = response.time;
                const dateNow = response.date;

                req.getConnection((err, conn) => {
                    if (err) throw err;

                    if (entry) {
                        updateEntry(conn, res, idUser, timeNow, dateNow);
                    }
                    if (exit) {
                        updateExit(conn, res, tokenAssistId, timeNow);
                    }
                });
            }).catch(err => {
                res.send(err);
            })


    } catch (err) {
        res.status(400).render('error',
            {
                message: "Ha ocurrido un error, intente mas tarde",
                error: {
                    status: "404"
                }
            });
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