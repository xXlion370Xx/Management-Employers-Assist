const dateExist = (url, idUser) => {
    return result = fetch(url + "?user=" + idUser);
}

const url = "http://localhost:3000/users/userUpdate";
const idUser = "3";

dateExist(url, idUser);

// TODO: Finish the validation of the last date input on db
const buttonIn = document.getElementById('buttonIn');
buttonIn.addEventListener("click", () => { alert('Presionaste') })
buttonIn.removeAttribute("hidden");