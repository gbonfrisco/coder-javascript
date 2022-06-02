


let form = document.getElementById("form")
form.querySelector("button").addEventListener("click", login);



function login(e) {
  e.preventDefault();
  console.log(123);

  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let resultado = document.getElementById("result");

  console.log(username);
  console.log(password);
  console.log(resultado.innerHTML);

  let user = JSON.parse(localStorage.getItem(username)) || "";
  
  console.log(user);
  
  if ((username = user.username)) {
    console.log("loggin ok");
  }
}
