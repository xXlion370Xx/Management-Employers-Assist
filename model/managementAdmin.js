const { query } = require('express');
const bcrypt = require('bcrypt');


const getAdminList = (req, res) =>{

    req.getConnection((err, conn) => {
        if (err) {
            console.log("Error in get connection");
            console.log(err);
        }
    
        const sql = "SELECT * FROM users WHERE rol= 'worker'";
        conn.query(sql, (err, data) => {
            if (err) {
                console.log("Query error");
                console.log(err);
            }else{
                res.render('workers' , {worker:data});
            }
    
        });
    });
}

const insertWorker = (req, res) => {
    const { usuario, password } = req.body;

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.log("Can't encrypt due to" + err);
            return;
        }

        req.getConnection((err, conn) => {
            if (err) {
                console.log("Can't connect to database due to" + err);
                return;
            }

            const sql = 'INSERT INTO users (name, password, rol, status) VALUES (?, ?, "worker", "Active")';
            conn.query(sql, [usuario, hash], (err, rows) => {
                if (err) {
                    console.log(sql);
                    console.log("Can't insert the user due to: " + err);
                    res.redirect('/admin?messageError=Something went wrong');
                } else {
                    console.log("Insertion successful");
                    res.redirect('/admin?message=ok');
                }
            });
        });
    });
};

module.exports = {
    getAdminList: getAdminList,
    insertWorker: insertWorker

}