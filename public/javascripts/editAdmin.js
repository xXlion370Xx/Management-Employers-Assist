const buttonEditUser = document.getElementById("button-edit-user");
const buttonEditPassword = document.getElementById("button-edit-password");

//Get html inputs
const inputUser = document.getElementById("user-edit");
const inputPassword = document.getElementById("password-edit");

// get html update button
const buttonUpdate = document.getElementById("button-update");

// Manage the event if the client wants change the user or password
buttonEditUser.addEventListener("click", () => {
    inputUser.removeAttribute("readonly");
    inputUser.classList.toggle("ready");
});
buttonEditPassword.addEventListener("click", () => {
    inputPassword.removeAttribute("readonly");
    inputPassword.classList.toggle("ready");
});

inputUser.addEventListener("input", () => {
    buttonUpdate.removeAttribute("disabled");
    buttonUpdate.classList.remove("bg-secondary");
});
inputPassword.addEventListener("input", () => {
    buttonUpdate.removeAttribute("disabled");
    buttonUpdate.classList.remove("bg-secondary");
});