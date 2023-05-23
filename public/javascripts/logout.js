const statusError = document.getElementById("status");
const value = statusError.getAttribute("value");

if (value == "noRol") {
    fetch("http://localhost:3000/users/logout");
}
