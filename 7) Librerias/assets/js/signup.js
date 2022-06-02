

let form = document.getElementById("form")
form.addEventListener("submit", signUp);

function signUp(event){
    event.preventDefault();
    let username = document.getElementById("username").value;
    let name = document.getElementById("name").value;
    let lastname = document.getElementById("lastname").value;
    let password = document.getElementById("password").value;
    let email = document.getElementById("email").value;
  
    let user = {
      usuario: username,
      nombre: name,
      apellido: lastname,
      contrasenia: password,
      mail: email,
      
    };
  
    let userJSON = JSON.stringify(user);
    localStorage.setItem(username,userJSON);
    console.log("usuario añadido");
    window.location.replace('../../index.html');
  }


  

