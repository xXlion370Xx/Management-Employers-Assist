async function dateExist(url, idUser) {
    const response = await fetch(url + "?user=" + idUser);
    return await response.json();
}

const url = "http://localhost:3000/users/userUpdate";
const idUser = "43";


dateExist(url, idUser)
    .then(data => {
        // TODO Validate data not exist
        console.log(data)
        handleButtonsAssist(data);
    })
    .catch(err => {
        console.log("Error in the query fetch");
        console.log(err);
    });

function handleButtonsAssist(dateExist) {
    for (const prop in dateExist) {
        /*
        * Validate if exist the data in the JSON
        */
        if ((prop == "entrada" && dateExist[prop] != null) && (dateExist["salida"] != null)) {
            console.log("Ambos")
            const buttonIn = document.getElementById('buttonIn');
            buttonIn.removeAttribute("hidden");

            return;
        }
        if (prop == "entrada" && dateExist[prop] != null) {
            const buttonOut = document.getElementById('buttonOut');
            buttonOut.removeAttribute("hidden");
            console.log("Entrada");

            return;
        }
        if (prop == "salida" && dateExist[prop] != null) {
            console.log("salida");
            const buttonIn = document.getElementById('buttonIn');
            buttonIn.removeAttribute("hidden");

            return;
        }

    }
}