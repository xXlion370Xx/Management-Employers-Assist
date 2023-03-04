const logOut = (req, res) => {
    const token = req.cookies.token;

    req.getConnection((err, conn) => {
        if (err) {
            console.log("Can´t connect to database due to" + err);

            return;
        }
        const sql = 'INSERT INTO blacklisted_tokens (token) VALUES(?)';
        conn.query(sql, [token], (err, rows) => {
            if (err) {
                console.log(sql)
                console.log("Can´t insert the black list token due to: " + err)
                res.redirect('/', { errorMessage: 'Something went wrong' });

                return;
            }
            console.log("logout successful");
        })
    })

    res.clearCookie('token');
    res.redirect('/');
}

module.exports = {
    logOut: logOut
}