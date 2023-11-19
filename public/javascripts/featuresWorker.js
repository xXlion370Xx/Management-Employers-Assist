async function getUserAssist(url) {
    const response = await fetch(url);
    return await response.json();
}

let url = "https://confeccioneslyz.onrender.com/users/asist";

if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    url = "http://localhost:3000/users/asist";
}

getUserAssist(url)
    .then(data => {
        showUserAssist(data);
        filterDataAssist("tableAssist");
        handleButtonsAssist(data);
    })
    .catch(err => {
        console.log("Error in the query fetch");
        console.log("Err: ");
        console.log(err);
    });

function handleButtonsAssist(dateExist) {
    console.log(dateExist);

    const lastItemData = dateExist[dateExist.length - 1];
    const buttonDateRegister = document.getElementById('buttonRegisterDate');
    buttonDateRegister.innerText = "Entrada";
    if (lastItemData["time_in"] != null && lastItemData["time_out"] != null) {
        console.log("Show entry")
        return;
    }

    //if entry exist, show the button exit
    if (lastItemData["time_in"] != null) {
        buttonDateRegister.setAttribute("name", "exit");
        buttonDateRegister.setAttribute("value", "exit");
        buttonDateRegister.innerText = "Salida";
        console.log("Show exit");
    }



}

const showUserAssist = (dataAsist) => {

    const tbody = document.getElementById("tbody");
    const documentFragment = document.createDocumentFragment();
    let count = 1;

    for (const element of dataAsist) {
        const trElement = document.createElement("tr");
        const timeIn = element["time_in"];
        const dateIn = element["date_in"];
        const timeOut = element["time_out"];
        const dateOut = element["date_out"];

        const tdElement1 = document.createElement("td");
        tdElement1.textContent = count;
        trElement.appendChild(tdElement1);

        const tdElement2 = document.createElement("td");
        tdElement2.textContent = timeIn;
        trElement.appendChild(tdElement2);

        const tdElement3 = document.createElement("td");
        tdElement3.textContent = dateIn;
        trElement.appendChild(tdElement3);

        const tdElement4 = document.createElement("td");
        tdElement4.textContent = timeOut;
        trElement.appendChild(tdElement4);

        const tdElement5 = document.createElement("td");
        tdElement5.textContent = dateOut;
        trElement.appendChild(tdElement5);

        documentFragment.appendChild(trElement);
        count++;
    }
    tbody.appendChild(documentFragment);
}

function filterDataAssist(tableId) {
    $(document).ready(function () {
        $('#' + tableId).DataTable({
            language: {
                lengthMenu: "Mostrar _MENU_ registros por página",
                zeroRecords: "No hay registros",
                info: "Mostrando página _PAGE_ de _PAGES_",
                infoEmpty: "No se encontró información",
                infoFiltered: "(filtrado de _MAX_ total registros)",
                paginate: {
                    "first": "Primero",
                    "last": "Último",
                    "next": "Siguiente",
                    "previous": "Anterior"
                },
            },
            lengthMenu: [5, 10, 25, 50, 75, 100],
            searching: false,
            ordering: false,
        });
    });
    $('#tableAssist').show();
}