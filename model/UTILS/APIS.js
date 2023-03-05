const jwt = require('jsonwebtoken');

const getCurrentLocalTime = async () => {
    try {
        const url = "https://www.timeapi.io/api/Time/current/zone?timeZone=America/Bogota";
        const data = await fetch(url);
        return data.json();
    } catch (err) {
        console.log(err);
    }
}

const generateToken = async (payload = {}, duration) => {
    try {
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: duration });
    } catch (error) {
        console.log("Can't generate token in generateToken due to: " + error);
    }

}
module.exports = {
    getCurrentLocalTime: getCurrentLocalTime,
    generateToken: generateToken
}