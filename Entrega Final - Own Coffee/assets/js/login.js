let form = document.getElementById("form");
let account = document.querySelector("#form a");
form.addEventListener("submit", login);

function login(e) {
  e.preventDefault();

  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let resultado = document.getElementById("result");

  let userStorageArray = JSON.parse(localStorage.getItem("usuarios")) || [];
  let userStorage = userStorageArray.find((user) => user.usuario == username);

  if (userStorage == undefined || userStorage.contrasenia != password) {
    resultado.textContent = "Usuario o contraseña incorrectos";
  } else {
    resultado.textContent = "Bienvenido " + userStorage.nombre + "!";
    account.remove();
    saveLogin(userStorage);
    window.location.replace("../../index.html");
  }
}

function saveLogin(userStorage) {
  let userStorageJSON = JSON.stringify(userStorage);
  localStorage.setItem("currentlyLogged", userStorageJSON);
}
