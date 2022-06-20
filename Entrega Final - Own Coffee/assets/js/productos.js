const getProducts = async () => {
  const container = document.querySelector(".products-container");
  console.log(container);
  const respuesta = await fetch("https://api.sampleapis.com/coffee/hot");
  console.log(respuesta);
  const data = await respuesta.json();
  console.log(data);

  data.forEach((product) => {
    const box = document.createElement("div");
    box.className = "product box box-products";
    box.style.margin = "5%";
    box.style.textAlign = "center";
    box.innerHTML = `
                <span>${product.title}</span>
                
                <h4>${product.ingredients}</h4>
                <h5>${product.description}</h5>
                `;
    container.append(box);
  });
};
getProducts();
