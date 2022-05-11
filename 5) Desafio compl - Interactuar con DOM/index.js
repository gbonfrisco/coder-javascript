class Producto {
  constructor(id, nombre, precio) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
  }
}
class Cliente {
  constructor(
    usuario,
    contrasenia,
    metodoPago,
    dineroDisponible,
  ) {
    this.usuario = usuario;
    this.contrasenia = contrasenia;
    this.metodoPago = metodoPago;
    this.dineroDisponible = dineroDisponible;
    this.dineroGastado = 0;
    this.comprasRealizadas = [];
  }

  comprar() {
    
    let cafe = prompt("¿Que café queres comprar?");

    let cantidad = prompt(`Ok, ${cafe}. ¿Cuantos?`);

    sumarCarrito(cafe, cantidad);
  }
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


/*FUNCIONES DE MANIPULACION DE ARRAYS*/

function reponerMercaderia(cantidad, cafe) {

  let i;

  switch (cafe) {

    case "Americano":

      for (i = 0; i < cantidad; i++) {

        stock.push(new Producto(0, cafe, 200));

      }

      agregarStock(0,i);

      actualizarStock(0,i);  

      break;

    case "Latte":

      for (i = 0; i < cantidad; i++) {

        stock.push(new Producto(1, cafe, 250));

      }

      agregarStock(1,i);

      actualizarStock(1,i); 

      break;

    case "Doble":

      for (i = 0; i < cantidad; i++) {

        stock.push(new Producto(2, cafe, 150));
      }

      agregarStock(2,i);

      actualizarStock(2,i);

      break;

    default:

      alert("Producto incorrecto");
      
      break;
  }
}

function eliminarStock(producto) {

  let index = stock.indexOf(producto);

  if (index != -1) {

    stock.splice(index, 1);

  } else alert("No existe stock del producto elegido");

}

function stockSeleccionado(nombreCafe) {

  return stock.filter((elemento) => elemento.nombre === nombreCafe);
}

function cantidadStock(nombreCafe){
  
  return stockSeleccionado(nombreCafe).length;

}

function sumarCarrito(cafe, cantidad) {

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
}

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

const stock = [];

const carrito = [];


reponerMercaderia(3, "Americano");

reponerMercaderia(3, "Latte");

reponerMercaderia(3, "Doble");



const cliente = logIn();

cliente.comprar();

cliente.pagar();


/***** TEST ***********
alert(carrito);
console.log(carrito);
alert(cliente.comprasRealizadas);
console.log(cliente.comprasRealizadas);
alert(carrito);
console.log(carrito);
alert(stock);
console.log(stock);
*/
/********** INTERACCION CON DOM ************/

function agregarNombre(nombre){
  
  let homeTexts = document.getElementsByClassName("home-text");

  let bienvenida = document.createElement("h1");

  bienvenida.innerHTML = "¡Bienvenido "+ nombre+"!";

  for(const homeText of homeTexts){

    homeText.insertAdjacentElement("afterbegin",bienvenida);

  }

}

/* function controlStock(stock){
  let controlStock = document.getElementsByClassName("box content")
  console.log(controlStock)
  
} */
function agregarStock(id, cantidad){

let contents = document.getElementsByClassName("content");

let controlStock = document.createElement("a");

if(cantidad == undefined){
  
  controlStock.innerHTML = "Producto en stock: "+ 0;

}

else controlStock.innerHTML = "Producto en stock: "+ cantidad;

contents[id].insertAdjacentElement("afterend",controlStock);

}

function actualizarStock(id, max){

let formStocks = document.getElementsByClassName("cantidadStockDeseada");

console.log(formStocks);

let elementoA = document.createElement("input");

elementoA.type ="number";

elementoA.min = 0;

elementoA.max =max;

formStocks[id].append(elementoA);

}

