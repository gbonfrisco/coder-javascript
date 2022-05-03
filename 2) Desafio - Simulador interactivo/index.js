
class Cliente {
  constructor(usuario, contrasenia, metodoPago, dineroDisponible) {
    this.usuario = usuario;
    this.contrasenia = contrasenia;
    this.metodoPago = metodoPago;
    this.dineroDisponible = dineroDisponible;
    this.dineroGastado = 0;
  }
  anadirCarrito(nombreCafe, cantidad) {
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
  }
  pagar() {
    if (cliente.dineroDisponible > costoEnCarrito) {
      cliente.dineroGastado = costoEnCarrito;
      costoEnCarrito = 0;
      alert("Compraste todo tu pedido. Gastaste: " + cliente.dineroGastado);
    } else alert("No tenes dinero suficiente. Reorganiza tu compra.");
  }
}

let stockCafe = 20;
let costoEnCarrito = 0;

function logIn(){
  let usuario = prompt("Bienvenido. Ingrese su usuario");
  let contrasenia = prompt("Ingrese su contraseña");
  let dinero = parseInt(prompt("¿Cual es tu presupuesto?"));
  return new Cliente(usuario, contrasenia, "TC - VISA", dinero);
}

function comprar(cliente){
let seguirComprando = "si";
while (seguirComprando == "si") {


  let cafe = prompt(`Bienvenido ${cliente.usuario}.` + "¿Qué café querés comprar?");
  let cantidad = parseInt(prompt("¿Cuantos querés comprar?"));
  cliente.anadirCarrito(cafe, cantidad);
  if(stockCafe>0){
  seguirComprando = prompt("¿Queres seguir comprando? Escribi 'si' para seguir, o cualquier otra palabra para salir.");
}
else{
alert("Costo total de la operacion: "+costoEnCarrito);
return cliente;
}
}

alert("Costo total de la operacion: "+costoEnCarrito);
return cliente;
}

const cliente = logIn();
comprar(cliente);
cliente.pagar();
