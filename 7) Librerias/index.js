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
}
let cartItem = document.querySelector(".carrito");
let divBar = document.querySelector("#total");
let stockControl = document.querySelectorAll(".mostrarStock");
let enviar = document.querySelector(".form-container");

const DOMcarrito = document.querySelector(".carrito");
const DOMTOTAL = document.querySelector("#total");
const DOMFormulario = document.querySelector(".form-container");

let navbar = document.querySelector(".navbar");
document.querySelector("#menu-icon").onclick = () => {
  navbar.classList.toggle("active");
};


function getProduct(id, nombreCafe) {
  let objID;
  switch (id) {
    case 0:
      objID = { id: id + 1 };
      return new Producto(id, nombreCafe, getPricing(objID));

    case 1:
      objID = { id: id + 1 };
      return new Producto(id, nombreCafe, getPricing(objID));

    case 2:
      objID = { id: id + 1 };
      return new Producto(id, nombreCafe, getPricing(objID));

    case 3:
      objID = { id: id + 1 };
      return new Producto(id, nombreCafe, getPricing(objID));

    case 4:
      objID = { id: id + 1 };
      return new Producto(id, nombreCafe, getPricing(objID));

    case 5:
      objID = { id: id + 1 };
      return new Producto(id, nombreCafe, getPricing(objID));
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
  renderizar();
}

const guardarLocal = (clave, valor) => {
  localStorage.setItem(clave, valor);
};

const sacarLocal = (clave, valor) => {
  localStorage.removeItem(clave, valor);
};

async function crearCard() {
  const respuesta = await fetch("https://api.sampleapis.com/coffee/hot");
  const data = await respuesta.json();

  const productArray = data.filter((elemento) => elemento.id <= 6);

  const DOMCard = document.querySelector(
    ".products .heading .products-container"
  );

  productArray.forEach((elemento) => {
    let boxProducts = document.createElement("div");
    boxProducts.className = "box box-products";

    let imgProducts = document.createElement("img");
    imgProducts.setAttribute("src", "assets/img/product1.jpg");
    imgProducts.setAttribute("alt", "product1");

    let hProducts = document.createElement("h3");
    hProducts.innerHTML = elemento.title;

    let spanProducts = document.createElement("span");
    spanProducts.innerHTML = getPricing(elemento);

    let buttonBox = document.createElement("div");
    buttonBox.className = "button";

    let mButton = document.createElement("button");
    let mainButton = document.createElement("button");
    let pButton = document.createElement("button");

    mButton.className = "minusBtn btn";
    mainButton.className = "mainBtn btn";
    pButton.className = "plusBtn btn";

    mButton.innerHTML = "-";
    mainButton.innerHTML = "AÑADIR A CARRITO";
    pButton.innerHTML = "+";

    let stockProducts = document.createElement("p");
    stockProducts.className = "mostrarStock";

    DOMCard.append(boxProducts);
    boxProducts.append(imgProducts);
    boxProducts.append(hProducts);
    boxProducts.append(spanProducts);
    boxProducts.append(buttonBox);
    buttonBox.append(mButton);
    buttonBox.append(mainButton);
    buttonBox.append(pButton);
    boxProducts.append(stockProducts);
  });
  addToCart();
}

function getPricing(array) {
  switch (array.id) {
    case 1:
      return 200;

    case 2:
      return 350;

    case 3:
      return 300;

    case 4:
      return 250;

    case 5:
      return 150;

    case 6:
      return 400;
  }
}

function addToCart() {
  let btn = document.querySelectorAll(".mainBtn");
  let mBtn = document.querySelectorAll(".minusBtn");
  let pBtn = document.querySelectorAll(".plusBtn");

  let nombreCafe = document.querySelectorAll(
    ".products-container .box-products h3"
  );

  let buttonClass = document.querySelectorAll(".button");

  for (let i = 0; i < buttonClass.length; i++) {
    btn[i].addEventListener("click", () => {
      btn[i].innerText = 1;
      guardarProducto(i, nombreCafe[i].textContent);
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
      guardarProducto(i, nombreCafe[i].textContent);
      contarStock(i);
      renderizar();
    });
  }
}

function guardarProducto(id, nombreCafe) {
  let productsArray = JSON.parse(localStorage.getItem("carrito")) || [];
  productsArray.push(getProduct(id, nombreCafe));
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

  index != -1
    ? array.splice(index, 1)
    : console.log("No existe stock del producto elegido");
}

function removerRenderizar(id) {
  removerProducto(id);
  contarStock(id);
  renderizar();
}

function agregarRenderizar(id, nombre) {
  guardarProducto(id, nombre);
  contarStock(id);
  renderizar();
}

function renderizar() {
  DOMcarrito.textContent = "";
  DOMTOTAL.textContent = "";
  stockControl.textContent = "";

  let listaProductos = JSON.parse(localStorage.getItem("carrito")) || [];
  let listaIDs = listaProductos.map((elem) => elem.id);
  const listaIDSinDuplicados = [...new Set(listaIDs)];

  listaIDSinDuplicados.forEach((itemIDSinDuplicar) => {
    const miItem = listaProductos.filter((itemListaProducto) => {
      return itemListaProducto.id === parseInt(itemIDSinDuplicar);
    });

    const numeroUnidadesItem = listaProductos.reduce((total, itemId) => {
      return itemId.id === itemIDSinDuplicar ? (total += 1) : total;
    }, 0);

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
      agregarRenderizar(miItem[0].id, miItem[0].nombre);
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

  let pagarButton = document.createElement("button");
  pagarButton.textContent = "Pagar";
  pagarButton.className = "btn-cart-total";

  /*
  pagarButton.addEventListener("click", () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "¿Estas seguro",
        text: "Estás por pagar tu pedido",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Si, pagar!",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            "Felicitaciones!",
            "Compra exitosa",
            "success"
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelado",
            "Tus productos fueron devueltos al carrito",
            "error"
          );
        }
      });
  }); */

  pagarButton.addEventListener("click", () => {
    pagar();
  });

  DOMTOTAL.append(pagarButton);
}

function bienvenida() {
  let userLogged = JSON.parse(localStorage.getItem("currentlyLogged"));
  console.log(userLogged);
  if (userLogged != null) {
    let loginElement = document.querySelector("#login a");
    console.log(loginElement);
    let nodoPadre = loginElement.parentNode;
    console.log(nodoPadre);

    let bienvenidaElement = document.createElement("a");
    bienvenidaElement.textContent = `Bienvenido ${userLogged.nombre}!`;

    let logOut = document.createElement("a");
    logOut.textContent = "Cerrar sesion";
    nodoPadre.append(logOut);

    nodoPadre.replaceChild(bienvenidaElement, loginElement);

    logOut.addEventListener("click", () => {
      localStorage.removeItem("currentlyLogged");
      location.reload();
    });
  }
}

let formularioDOM = document.getElementsByClassName("form-container");

formularioDOM[0].addEventListener("submit", (e) => {
  console.log(formularioDOM);
  e.preventDefault();
  let formulario = JSON.parse(localStorage.getItem("formulario")) || [];

  let nombre = document.getElementById("name").value;
  let numero = document.getElementById("number").value;
  let email = document.getElementById("email").value;
  let textArea = document.getElementById("textArea").value;

  let datos = [];

  datos = [nombre, numero, email, textArea];
  console.log(datos);
  formulario.push(datos);
  let formularioJSON = JSON.stringify(formulario);
  localStorage.setItem("formulario", formularioJSON);
});

document.querySelector("#icon-cart").onclick = () => {
  cartItem.classList.toggle("active");
  divBar.classList.toggle("active");
  renderizar();
};

const pagar = async () => {
  let productsArray = JSON.parse(localStorage.getItem("carrito")) || [];

  const productosToMap = productsArray.map((elem) => {
    let nuevoElemento = {
      title: elem.nombre,
      category_id: elem.id,
      quantity: 1,
      currency_id: "ARS",
      unit_price: elem.precio,
    };
    return nuevoElemento;
  });
  let response = await fetch(
    "https://api.mercadopago.com/checkout/preferences",
    {
      method: "POST",
      headers: {
        Authorization:
          "Bearer TEST-7273697920934677-061709-bb26a8872dfa57958b250444e9cc25a2-47692184",
      },
      body: JSON.stringify({
        items: productosToMap,
      }),
    }
  );
  let data = await response.json();
  console.log(data);
  window.open(data.init_point, "_blank");
};
bienvenida();
crearCard();
