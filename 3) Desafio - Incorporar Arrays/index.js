class Producto {
  constructor(nombre, precio) {
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
    comprasRealizadas
  ) {
    this.usuario = usuario;
    this.contrasenia = contrasenia;
    this.metodoPago = metodoPago;
    this.dineroDisponible = dineroDisponible;
    this.dineroGastado = 0;
    this.comprasRealizadas = [];
  }
  /*anadirCarrito(nombreCafe, cantidad) {
    if (stockCafe > 0 && stockCafe >= cantidad) {
      switch (nombreCafe) {
        case "Americano":
          stockCafe = stockCafe - cantidad;
          costoEnCarrito = costoEnCarrito + 200 * cantidad;
          alert(`Compraste ${cantidad} cafe/s` + nombreCafe +". El stock ahora es de: " + stockCafe);
          break;

        case "Latte":
          stockCafe = stockCafe - cantidad;
          costoEnCarrito = costoEnCarrito + 250 * cantidad;
          alert(`Compraste ${cantidad} cafe/s` + nombreCafe +". El stock ahora es de: " + stockCafe);
          break;

        case "Doble":
          stockCafe = stockCafe - cantidad;
          costoEnCarrito = costoEnCarrito + 150 * cantidad;
          alert(`Compraste ${cantidad} cafe/s` + nombreCafe +". El stock ahora es de: " + stockCafe);
          break;
          
        case "Puro":
          stockCafe = stockCafe - cantidad;
          costoEnCarrito = costoEnCarrito + 100 * cantidad;
          alert(`Compraste ${cantidad} cafe/s` + nombreCafe +". El stock ahora es de: " + stockCafe);
          break;
          
        case "Irlandes":
          stockCafe = stockCafe - cantidad;
          costoEnCarrito = costoEnCarrito + 400 * cantidad;
          alert(`Compraste ${cantidad} cafe/s` + nombreCafe +". El stock ahora es de: " + stockCafe);
          break;

        case "Cortado":
          stockCafe = stockCafe - cantidad;
          costoEnCarrito = costoEnCarrito + 200 * cantidad;
          alert(`Compraste ${cantidad} cafe/s` + nombreCafe +". El stock ahora es de: " + stockCafe);
          break;

        default:
          alert("No ingresaste un cafe valido");
          break;
      }
    } else alert("No hay stock de productos. Vuelva en otro momento");
  }*/

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
      vaciarCarrito(carrito, this.comprasRealizadas); //desarrollar mostrar qué y cuantos productos
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

const stock = [];
const carrito = [];

/*FUNCIONES DE MANIPULACION DE ARRAYS*/

function reponerMercaderia(cantidad, cafe) {
  switch (cafe) {
    case "Americano":
      for (let i = 0; i < cantidad; i++) {
        stock.push(new Producto(cafe, 200));
      }
      break;
    case "Latte":
      for (let i = 0; i < cantidad; i++) {
        stock.push(new Producto(cafe, 250));
      }
      break;
    case "Doble":
      for (let i = 0; i < cantidad; i++) {
        stock.push(new Producto(cafe, 150));
      }
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
  arrayOrigen.forEach((element) => arrayDestino.push(element));
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
  return new Cliente(usuario, contrasenia, "TC - VISA", dinero);
}

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