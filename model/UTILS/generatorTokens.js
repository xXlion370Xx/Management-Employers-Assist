const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = async (duration, data) => {
    const payload = JSON.parse(JSON.stringify(data));

    try {
        delete payload["exp"];
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: duration });
    } catch (error) {
        console.log("Can't generate token in generateToken due to: " + error);
        console.log(error);
    }
}

module.exports = {
    generateToken: generateToken
}