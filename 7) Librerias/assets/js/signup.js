console.log(localStorage.length);

let form = document.getElementById("form");
let result = document.getElementById("result");
form.addEventListener("submit", signUp);

function signUp(event) {
  event.preventDefault();
  let username = document.getElementById("username").value;
  let name = document.getElementById("name").value;
  let lastname = document.getElementById("lastname").value;
  let password = document.getElementById("password").value;
  let email = document.getElementById("email").value;

  const user = {
    usuario: username,
    nombre: name,
    apellido: lastname,
    contrasenia: password,
    mail: email,
  };

  let userStorage = JSON.parse(localStorage.getItem("usuarios")) || [];
  console.log("usuarios");
  console.log(user);
  let userExist = userStorage.some(
    (elemento) => elemento.usuario === user.usuario
  );
  if (userExist == false) {
    let mailExist = userStorage.some((elemento) => elemento.mail === user.mail);
    mailExist
      ? (result.textContent = "Este correo está siendo usado por otro usuario")
      : guardarUsuario(user);
  } else result.textContent = "Usuario existente";
}

function guardarUsuario(user) {
  let userStorageArray = JSON.parse(localStorage.getItem("usuarios")) || [];
  userStorageArray.push(user);
  let userStorageArrayJSON = JSON.stringify(userStorageArray);
  localStorage.setItem("usuarios", userStorageArrayJSON);
  window.location.replace("../../index.html");
}
