const jwt = require("jsonwebtoken");
require("dotenv").config();
const logOut = (req, res) => {
    const token = req.cookies.token;

    req.getConnection((err, conn) => {
        if (err) {
            console.log("Can't connect to database due to" + err);

            return;
        }
        const sql = 'INSERT INTO blacklisted_tokens (token) VALUES(?)';
        conn.query(sql, [token], (err, rows) => {
            if (err) {
                console.log(sql)
                console.log("Can't insert the black list token due to: " + err)
                res.clearCookie('token').redirect({ errorMessage: 'Something went wrong' }, '/');

                return;
            }
            console.log("logout successful");
        })
    })

    res.clearCookie('token').redirect('/');
}

const restorePassword = (req, res) => {
    res.send("Esta funcionalidad está deshabilitada.")

}

const authMiddleware = (req, res, next) => {
    const userToken = req.cookies.token;

    if (userToken) {
        jwt.verify(userToken, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log("Error while verifying the token: " + err);
                res.status(401).redirect('/');

                return;
            }

            next();
        })
        return;
    }

    res.status(401).redirect('/');

}

module.exports = {
    logOut: logOut,
    restorePassword: restorePassword,
    authMiddleware: authMiddleware,
}