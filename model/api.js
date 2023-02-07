const getCurrentLocalTime = async () => {
    try {
        const url = "https://www.timeapi.io/api/TimeZone/zone?timeZone=America/Bogota";
        const data = await fetch(url);
        return data.json();
    } catch (error) {
        console.log(error);
    }
}

getCurrentLocalTime().then(respuesta => console.log(respuesta)).catch(err => {
    console.log("Este es el error: " + err)
});

module.exports = getCurrentLocalTime;