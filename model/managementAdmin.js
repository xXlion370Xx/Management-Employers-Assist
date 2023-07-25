const { query } = require('express');
const bcrypt = require('bcrypt');


const getAdminList = (req, res) =>{

    req.getConnection((err, conn) => {
        if (err) {
            console.log("Error in get connection");
            console.log(err);
        }
    
        const sql = "SELECT id, name,CASE WHEN rol = 'worker' THEN 'Trabajador' ELSE rol END AS rol, CASE \
            WHEN status = 'Active' THEN 'Activo' WHEN status = 'Inactive' THEN 'Inactivo' \
            ELSE status END AS status FROM (SELECT id, name, rol, status FROM users WHERE rol = 'worker') AS subquery";

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
                    res.redirect('/admin');
                } else {
                    console.log("Insertion successful");
                    res.redirect('/admin');
                }
            });
        });
    });
};

const inactiveWorker = (req, res) =>{
    const id = req.params.id;
    const status = req.params.status;

    if (status == 'Activo') {
        req.getConnection((err, conn) => {
            if (err) {
                console.log("Error in get connection");
                console.log(err);
            }
        
            const sql = "UPDATE users SET status = 'Inactive' WHERE id = ?";
            conn.query(sql, [id], (err, data) => {
                if (err) {
                    console.log("Query error");
                    console.log(err);
                }else{
                    console.log('Registro Incativo');

                    res.redirect('/admin');
                }
        
            });
        });
    }else{
        req.getConnection((err, conn) => {
            if (err) {
                console.log("Error in get connection");
                console.log(err);
            }
        
            const sql = "UPDATE users SET status = 'Active' WHERE id = ?";
            conn.query(sql, [id], (err, data) => {
                if (err) {
                    console.log("Query error");
                    console.log(err);
                }else{
                    console.log('Registro Activado');

                    res.redirect('/admin');
                }
        
            });
        });
    }
}

const getDataWorkers = (req, res) =>{

    const id = req.params.id;
    req.getConnection((err, conn) => {
        if (err) {
            console.log("Error in get connection");
            console.log(err);
        }
    
        const sql =`SELECT a.id_asist as Id, b.name as Nombre, a.time_in as Ingreso, a.time_out as Salida, a.date as Fecha
        FROM asist a 
        JOIN users b ON a.id_user = b.id
        WHERE b.id = ?` ;
        conn.query(sql, [id], (err, data) => {
            if (err) {
                console.log("Query error");
                console.log(err);
            }else{
                console.log('Consulta Exitosa');
                console.log(data);

                res.render('workersData' , {workerData:data});
            }
    
        });
    });

}

const updateWorker = (req, res) =>{
    const id = req.params.id;
    const usuario = req.params.usuario;
    const rol = req.params.rol;

    req.getConnection((err, conn) => {
        if (err) {
            console.log("Error in get connection");
            console.log(err);
        }
    
        const sql =`UPDATE users SET name=?, rol=?  WHERE id= ?` ;
        conn.query(sql, [usuario,rol,id], (err, data) => {
            if (err) {
                console.log("Query error");
                console.log(err);
            }else{
                console.log('Consulta Exitosa');
                console.log(data);

                res.redirect('/admin/workers');
            }
    
        });
    });
}

module.exports = {
    getAdminList: getAdminList,
    insertWorker: insertWorker,
    inactiveWorker: inactiveWorker,
    getDataWorkers: getDataWorkers,
    updateWorker : updateWorker

}