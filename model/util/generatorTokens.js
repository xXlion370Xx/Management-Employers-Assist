const jwt = require('jsonwebtoken');
require('dotenv').config();
const generateTokenUser = async (data, duration) => {
    const payload = {
        id: data.id,
        name: data.name,
        password: data.password,
        rol: data.rol
    }


    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: duration });
}

const generateTokenAsist = async (data, duration) => {
    const payload = {
        id_asist: data.id_asist,
        id_user: data.id_user,
        time_in: data.time_out,
        date: data.date
    }

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: duration });
}

module.exports = {
    generateTokenUser: generateTokenUser,
    generateTokenAsist: generateTokenAsist
}