
const DOMcarrito = document.querySelector('#cart-products');
const DOMTOTAL = document.querySelector('#total');

function removerRenderizar(id){
  removerProducto(id);
  renderizar();
}
function agregarRenderizar(id){
  guardarProducto(id);
  renderizar();
}

function renderizar(){

    DOMcarrito.textContent = '';
    DOMTOTAL.textContent = '';

    let listaProductos = JSON.parse(localStorage.getItem("carrito"));
    let listaIDs = listaProductos.map((elem) => elem.id);
    const  listaIDSinDuplicados = [...new Set(listaIDs)];
   
    listaIDSinDuplicados.forEach((itemIDSinDuplicar) =>{
        
        const miItem = listaProductos.filter((itemListaProducto) => {
        
        return itemListaProducto.id === parseInt(itemIDSinDuplicar);
        
    });
    const numeroUnidadesItem = listaProductos.reduce((total, itemId) => {
        
      return itemId.id === itemIDSinDuplicar ? total += 1 : total;
    }, 0);
    
    miNodo = document.createElement('div');
    miNodo.className="cart";
    miNodo.innerHTML  =     
                            `<a>${miItem[0].nombre}</a>
                             <a>x${numeroUnidadesItem}</a>
                             <a>$${miItem[0].precio * numeroUnidadesItem }</a>`;         
    const mBoton = document.createElement("button");
    mBoton.textContent = '-';
    mBoton.className ="btn-cart"
    mBoton.style.marginLeft = '1rem';

    mBoton.addEventListener("click", () => { removerRenderizar(miItem[0].id);});

    const pBoton = document.createElement("button");
    pBoton.textContent = '+';
    pBoton.className ="btn-cart"
    pBoton.style.marginLeft = '1rem';
    pBoton.addEventListener("click", () => {agregarRenderizar(miItem[0].id);});
      
    miNodo.appendChild(mBoton);
    miNodo.appendChild(pBoton);
    DOMcarrito.appendChild(miNodo);});

                let total = document.createElement("div");
                total.classList = "cart-total";
                total.innerHTML =  `<a></a>
                                    <a></a>
                                    <a></a>
                                    <a>${ listaProductos.map((elemento)=> elemento.precio).reduce((
                                  acum, elemento) => acum + elemento, 0)
                                  }</a>`;
                                  DOMTOTAL.append(total);
};





renderizar();
