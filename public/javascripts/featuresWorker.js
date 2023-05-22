async function getUserAsist(url) {
    const response = await fetch(url);
    return await response.json();
}

const url = "http://localhost:3000/users/asist";

getUserAsist(url)
    .then(data => {
        showUserAsist(data);
        filterDataAsist("tableAsist");
        handleButtonsAssist(data);
    })
    .catch(err => {
        console.log("Error in the query fetch");
        console.log("Err: ");
        console.log(err);
    });

function handleButtonsAssist(dateExist) {
    const lastItemData = dateExist[dateExist.length - 1];
    console.log(lastItemData);

    if (lastItemData["time_in"] != null && lastItemData["time_out"] != null) {
        const buttonIn = document.getElementById('buttonIn');
        console.log("show entry");
        buttonIn.removeAttribute("hidden");
        return;
    }

    if (lastItemData["time_in"] != null) {
        const buttonOut = document.getElementById('buttonOut');
        buttonOut.removeAttribute("hidden");
        console.log("Show exit");
        return;
    }
    if (lastItemData["time_out"] != null) {
        const buttonIn = document.getElementById('buttonIn');
        buttonIn.removeAttribute("hidden");

        console.log("show entry");
    }
}

const showUserAsist = (dataAsist) => {

    const tbody = document.getElementById("tbody");
    const documentFragment = document.createDocumentFragment();
    let count = 1;

    for (const element of dataAsist) {
        const trElement = document.createElement("tr");
        const timeIn = element["time_in"];
        const timeOut = element["time_out"];
        const date = element["date"];

        const tdElement1 = document.createElement("td");
        tdElement1.textContent = count;
        trElement.appendChild(tdElement1);

        const tdElement2 = document.createElement("td");
        tdElement2.textContent = timeIn;
        trElement.appendChild(tdElement2);

        const tdElement3 = document.createElement("td");
        tdElement3.textContent = timeOut;
        trElement.appendChild(tdElement3);

        const tdElement4 = document.createElement("td");
        tdElement4.textContent = date;
        trElement.appendChild(tdElement4);

        documentFragment.appendChild(trElement);
        count++;
    }
    tbody.appendChild(documentFragment);
}

function filterDataAsist(tableId) {
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
            searching: false,
        });
    });
    $('#tableAsist').show();
}