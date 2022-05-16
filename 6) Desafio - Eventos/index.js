class Producto {
  constructor(id, nombre, precio) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
  }
}
class Cliente {
  constructor(usuario, contrasenia, metodoPago, dineroDisponible) {
    this.usuario = usuario;
    this.contrasenia = contrasenia;
    this.metodoPago = metodoPago;
    this.dineroDisponible = dineroDisponible;
    this.dineroGastado = 0;
    this.comprasRealizadas = [];
  }

  comprar() {}
  pagar() {
    let deuda = costoTotal(carrito);

    if (this.dineroDisponible >= deuda && carrito.length > 0) {
      let decision = prompt(
        `Vas a pagar la suma de $${deuda}. ¿Estás de acuerdo? Escriba sí para pagar.`
      );

      if (decision != "si") {
        vaciarCarrito(carrito, stock);

        return alert("El usuario rechazo la compra. Se vaciará el carrito.");
      }

      alert("Compraste los productos por un total de: $" + deuda);

      vaciarCarrito(carrito, this.comprasRealizadas); //desarrollar mostrar qué y cuantos productos (proximo desarollo)
    } else if (this.dineroDisponible >= deuda) {
      alert("No hay nada qué pagar. El carrito está vacio");
    } else {
      alert(
        "Compra rechazada, no tenés fondos suficientes. Se vaciará el carrito"
      );

      vaciarCarrito(carrito, stock);
    }
  }
}

function getProduct(id) {
  switch (id) {
    case 0:
      return new Producto(id, "Americano", 200);

    case 1:
      return new Producto(id, "Latte", 250);

    case 2:
      return new Producto(id, "Doble", 150);

    case 3:
      return new Producto(id, "Doble", 150);

    case 4:
      return new Producto(id, "Doble", 150);

    case 5:
      return new Producto(id, "Doble", 150);
  }
}

function stockSeleccionado(array, id) {
  return array.filter((elemento) => elemento.id === id);
}

function cantidadStock(id) {
  return stockSeleccionado(id).length;
}

/*function sumarCarrito(cafe, cantidad) {

  if (cantidad <= stockSeleccionado(cafe).length) {

    for (let i = 0; i < cantidad; i++) {

      carrito.push(stockSeleccionado(cafe)[i]);

      eliminarStock(stockSeleccionado(cafe)[i]);
    }


  } else
    alert(
      "Stock insuficiente. " +

        `El stock de ${cafe} es de ${stockSeleccionado(cafe).length} unidades.`
    );
}*/

function vaciarCarrito(arrayOrigen, arrayDestino) {
  //esta funcion puede cambiarse el nombre y sirve para transportar de un array a otro y ya. Sea para incrementar o decrementar el carrito
  arrayOrigen.forEach((elemento) => arrayDestino.push(elemento));

  arrayOrigen.splice(0, arrayOrigen.length);
}

function mover(arrayOrigen, arrayDestino) {
  //se usará para cuando queremos "deshacer la compra".

  let ultimoElemento = arrayOrigen.pop();

  arrayDestino.push(ultimoElemento);
}

function costoTotal(producto) {
  return producto.reduce((acum, elem) => acum + elem.precio, 0);
}

function logIn() {
  let usuario = prompt("Bienvenido. Ingrese su usuario");

  let contrasenia = prompt("Ingrese su contraseña");

  let dinero = parseInt(prompt("¿Cual es tu presupuesto?"));

  agregarNombre(usuario);

  return new Cliente(usuario, contrasenia, "TC - VISA", dinero);
}

function agregarNombre(nombre) {
  let homeTexts = document.getElementsByClassName("home-text");

  let bienvenida = document.createElement("h1");

  bienvenida.innerHTML = "¡Bienvenido " + nombre + "!";

  for (const homeText of homeTexts) {
    homeText.insertAdjacentElement("afterbegin", bienvenida);
  }
}

/*function contarStock(id) {
  let boxs = document.getElementsByClassName("box-products");
  
  let productsArray = JSON.parse(localStorage.getItem("carrito")) || [];
  let cantidad = stockSeleccionado(productsArray,id).length;
  //let elemento = document.createElement("a");
  //elemento.innerHTML = "Productos en carrito: "+cantidad;
  
  for (const box of boxs){
    let elemento = document.createElement("a");
    if (cantidad == undefined){
      elemento.innerHTML = "Producto en stock: "+0;
    }
    else elemento.innerHTML = "Producto en stock: "+cantidad;
    box.append(elemento);
  }
}*/


const guardarLocal = (clave, valor) => {
  localStorage.setItem(clave, valor);
};
const sacarLocal = (clave, valor) => {
  localStorage.removeItem(clave, valor);
};

function addToCart() {
  let btn = document.querySelectorAll(".mainBtn");
  let mBtn = document.querySelectorAll(".minusBtn");
  let pBtn = document.querySelectorAll(".plusBtn");

  let buttonClass = document.querySelectorAll(".button");

  for (let i = 0; i < buttonClass.length; i++) {
    btn[i].addEventListener("click", () => {
      btn[i].innerText = 1;
      guardarProducto(i);
      //contarStock(i);
      btn[i].style.display = "none";
      pBtn[i].style.display = "inline-block";
      mBtn[i].style.display = "inline-block";
    });

    mBtn[i].addEventListener("click", () => {
      removerProducto(i);
      //contarStock(i)
      console.log("removi un producto del carrito");
    });

    pBtn[i].addEventListener("click", () => {
      guardarProducto(i);
      //contarStock(i)
      console.log("añadi un producto a carrito");
    });
  }
}

function guardarProducto(id) {
  let productsArray = JSON.parse(localStorage.getItem("carrito")) || [];
  productsArray.push(getProduct(id));
  let productsArrayJSON = JSON.stringify(productsArray);
  localStorage.setItem("carrito", productsArrayJSON);
}
function removerProducto(id) {
  let productsArray = JSON.parse(localStorage.getItem("carrito")) || [];
  let elemento = productsArray.find((product) => product.id === id);

  if (elemento !== undefined) {
    eliminar(productsArray, elemento);
  }

  let productsArrayJSON = JSON.stringify(productsArray);
  localStorage.setItem("carrito", productsArrayJSON);
}

function eliminar(array, elemento) {
  let index = array.indexOf(elemento);

  if (index != -1) {
    array.splice(index, 1);
  } else alert("No existe stock del producto elegido");
}

addToCart();
