async function dateExist(url) {
    const response = await fetch(url);
    return await response.json();
}

const url = "http://localhost:3000/users/asist";

dateExist(url)
    .then(data => {
        // TODO Validate data not exist
        console.log(data);
        handleButtonsAssist(data);
    })
    .catch(err => {
        console.log("Error in the query fetch");
        console.log(err);
    });

function handleButtonsAssist(dateExist) {

    if (dateExist["entrada"] != null) {
        const buttonOut = document.getElementById('buttonOut');
        buttonOut.removeAttribute("hidden");

        return;
    }
    if (dateExist["salida"] != null) {
        const buttonIn = document.getElementById('buttonIn');
        buttonIn.removeAttribute("hidden");

        return;
    }

    const buttonIn = document.getElementById('buttonIn');
    buttonIn.removeAttribute("hidden");
}