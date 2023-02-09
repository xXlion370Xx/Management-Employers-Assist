async function dateExist(url, idUser) {
    const response = await fetch(url + "?user=" + idUser);
    return await response.json();
}

const url = "http://localhost:3000/users/userUpdate";
const idUser = "28";

dateExist(url, idUser).then(data => {
    console.log(data);
    console.log(data.entrada);
    console.log(data.salida);

    if (data.entrada) {
        console.log("Entrada exist");
    }
    if (data.salida) {
        console.log("Salida exist");
    }
}).catch(err => {
    console.log("Error in the query fetch");
    console.log(err);
});


// TODO: Finish the validation of the last date input on db
const buttonIn = document.getElementById('buttonIn');
buttonIn.addEventListener("click", () => { alert('Presionaste') })
buttonIn.removeAttribute("hidden");