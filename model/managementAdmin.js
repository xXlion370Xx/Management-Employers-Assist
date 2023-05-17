const jwt = require('jsonwebtoken');
const { query } = require('express');
const generatorTokens = require('./UTILS/generatorTokens');

const getdataEmployee = (req, res) => {
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
module.exports = {
    getdataEmployee: getdataEmployee,
   
}