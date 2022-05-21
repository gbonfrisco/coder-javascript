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

  comprar() {

  }
}
let cartItem = document.querySelector(".carrito");
let divbar = document.querySelector("#total");
let stockControl = document.querySelectorAll(".mostrarStock");

const DOMcarrito = document.querySelector(".carrito");
const DOMTOTAL = document.querySelector("#total");

function getProduct(id) {

  switch (id) {
    case 0:
      return new Producto(id, "Americano", 200);

    case 1:
      return new Producto(id, "Latte", 250);

    case 2:
      return new Producto(id, "Doble", 300);

    case 3:
      return new Producto(id, "Mocca", 350);

    case 4:
      return new Producto(id, "Moka Belga", 450);

    case 5:
      return new Producto(id, "Capuccino", 150);
  }
}

function stockSeleccionado(array, id) {

  return array.filter((elemento) => elemento.id === id);
}

function cantidadStock(array, id) {

  return array.filter((elemento) => elemento.id === id).length;
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

function contarStock(id) {

  stockControl.textContent = "";

  let stock = document.querySelectorAll(".mostrarStock");

  let carritoArray = JSON.parse(localStorage.getItem("carrito")) || [];
  let cantidad = cantidadStock(carritoArray, id);

  stock[id].textContent = "Producto en carrito: " + parseInt(cantidad);

  console.log(stock);

  console.log(cantidad);

  renderizar();
}

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
      contarStock(i);
      renderizar();
      btn[i].style.display = "none";
      pBtn[i].style.display = "inline-block";
      mBtn[i].style.display = "inline-block";


    });

    mBtn[i].addEventListener("click", () => {

      removerProducto(i);
      contarStock(i);
      renderizar();

    });

    pBtn[i].addEventListener("click", () => {

      guardarProducto(i);
      contarStock(i);
      renderizar();

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

  elemento !== undefined && eliminar(productsArray, elemento);

  let productsArrayJSON = JSON.stringify(productsArray);
  localStorage.setItem("carrito", productsArrayJSON);
}

function eliminar(array, elemento) {
  let index = array.indexOf(elemento);

  index != -1 ? array.splice(index, 1) : console.log("No existe stock del producto elegido");
  
}

function removerRenderizar(id) {

  removerProducto(id);
  contarStock(id);
  renderizar();
}

function agregarRenderizar(id) {

  guardarProducto(id);
  contarStock(id);
  renderizar();
}

function renderizar() {

  DOMcarrito.textContent = "";
  DOMTOTAL.textContent = "";
  stockControl.textContent = "";

  let listaProductos = JSON.parse(localStorage.getItem("carrito"));
  let listaIDs = listaProductos.map((elem) => elem.id);
  const listaIDSinDuplicados = [...new Set(listaIDs)];

  listaIDSinDuplicados.forEach((itemIDSinDuplicar) => {

    const miItem = listaProductos.filter((itemListaProducto) => {

      return itemListaProducto.id === parseInt(itemIDSinDuplicar);
    });

    const numeroUnidadesItem = listaProductos.reduce((total, itemId) => {

      return itemId.id === itemIDSinDuplicar ? (total += 1) : total;}, 0);


    miNodo = document.createElement("div");
    miNodo.className = "cart";
    miNodo.innerHTML = `<a>${miItem[0].nombre}</a>
                        <a>x${numeroUnidadesItem}</a>
                        <a>$${miItem[0].precio * numeroUnidadesItem}</a>`;


    const mBoton = document.createElement("button");
    mBoton.textContent = "-";
    mBoton.className = "btn-cart";
    mBoton.style.marginLeft = "1rem";

    mBoton.addEventListener("click", () => {
      removerRenderizar(miItem[0].id);

    });

    const pBoton = document.createElement("button");
    pBoton.textContent = "+";
    pBoton.className = "btn-cart";
    pBoton.style.marginLeft = "1rem";

    pBoton.addEventListener("click", () => {
      agregarRenderizar(miItem[0].id);

    });

    miNodo.appendChild(mBoton);
    miNodo.appendChild(pBoton);
    DOMcarrito.appendChild(miNodo);

  });

  let total = document.createElement("div");
  total.classList = "cart-total";
  total.innerHTML = `<a>Total: $${listaProductos
    .map((elemento) => elemento.precio)
    .reduce((acum, elemento) => acum + elemento, 0)}</a>`;
  DOMTOTAL.append(total);

  let pagar = document.createElement("button");
  pagar.textContent = "Pagar";
  pagar.className = "btn-cart-total";

  DOMTOTAL.append(pagar);
}

document.querySelector("#icon-cart").onclick = () => {
  cartItem.classList.toggle("active");
  divbar.classList.toggle("active");
  renderizar();
};

addToCart();
