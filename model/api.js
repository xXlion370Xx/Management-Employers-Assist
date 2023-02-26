const getCurrentLocalTime = async () => {
    try {
        const url = "https://www.timeapi.io/api/Time/current/zone?timeZone=America/Bogota";
        const data = await fetch(url);
        return data.json();
    } catch (err) {
        console.log(err);
    }
}

// getCurrentLocalTime().then(respuesta => console.log(respuesta)).catch(err => {
//     console.log("Este es el error: " + err)
// });

module.exports = {
    getCurrentLocalTime: getCurrentLocalTime
}