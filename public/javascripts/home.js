async function getUserAsist(url) {
    const response = await fetch(url);
    return await response.json();
}

const url = "http://localhost:3000/users/asist";

getUserAsist(url)
    .then(data => {
        const lastItemData = data[data.length - 1];
        console.log(lastItemData);
        handleButtonsAssist(lastItemData);
        showUserAsist(data);
    })
    .catch(err => {
        console.log("Error in the query fetch");
        console.log("Err: " + err);
    });

function handleButtonsAssist(dateExist) {

    if (dateExist["time_in"] != null && dateExist["time_out"] != null) {
        const buttonIn = document.getElementById('buttonIn');
        console.log("show entry");
        buttonIn.removeAttribute("hidden");
        return;
    }

    if (dateExist["time_in"] != null) {
        const buttonOut = document.getElementById('buttonOut');
        buttonOut.removeAttribute("hidden");
        console.log("Show exit");
        return;
    }
    if (dateExist["time_out"] != null) {
        const buttonIn = document.getElementById('buttonIn');
        buttonIn.removeAttribute("hidden");

        console.log("show entry");
        return;
    }
}

const showUserAsist = (dataAsist) => {

    const tbody = document.getElementById("tbody");
    const documentFragment = document.createDocumentFragment();

    for (const element of dataAsist) {
        const trElement = document.createElement("tr");

        for (let e = 0; e < 4; e++) {
            const tdElement = document.createElement("td");
            if (e == 0) {
                tdElement.innerText = "*";
            }
            if (e == 1) {
                tdElement.innerText = element["time_in"];
            }
            if (e == 2) {
                tdElement.innerText = element["time_out"];
            }
            if (e == 3) {
                tdElement.innerText = element["date"];
            }

            trElement.appendChild(tdElement);
        }
        documentFragment.appendChild(trElement);
    }
    tbody.appendChild(documentFragment);
}