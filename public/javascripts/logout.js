const statusError = document.getElementById("status");
const value = statusError.getAttribute("value");

if (value == "noRol") {
    fetch("https://confeccioneslyz.onrender.com/users/logout");
}
