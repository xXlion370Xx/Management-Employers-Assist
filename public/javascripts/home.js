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

    if (dateExist["time_in"] === null) {
        const buttonIn = document.getElementById('buttonIn');
        buttonIn.removeAttribute("hidden");
        console.log("Se cumple la primera");

        return;
    }
    if (dateExist["time_out"] === null) {
        const buttonOut = document.getElementById('buttonOut');
        buttonOut.removeAttribute("hidden");
        console.log("Se cumple la segundda");

        return;
    }

    const buttonIn = document.getElementById('buttonIn');
    buttonIn.removeAttribute("hidden");
}