const fetch = require('node-fetch');

const getCurrentLocalTime = async () => {
    try {
        const url = "https://www.timeapi.io/api/Time/current/zone?timeZone=America/Bogota";
        const data = await fetch(url);
        return data.json();
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getCurrentLocalTime: getCurrentLocalTime,
}