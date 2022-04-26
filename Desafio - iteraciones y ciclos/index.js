
let hambre = 0;
let comida;


while(hambre<100){
comida = prompt("¿Qué queres comer? Tenes 3 opciones: Pizza, Empanadas, Sushi");
  switch(comida){
    case "Pizza":
        hambre = hambre+20;
        alert("Comiste una porcion de pizza. Nivel de satisfecho:"+hambre);
        break;

    case "Empanadas":
        alert("Comiste una empanada");
        hambre = hambre+10;
        alert("Comiste una porcion de pizza. Nivel de satisfecho:"+hambre);
        break;

    case "Sushi":
        alert("Comiste 20 rolls de sushi");
        hambre = hambre+50;
        alert("Comiste una porcion de pizza. Nivel de satisfecho:"+hambre);
        break;

    default:
        alert("Eso no es comida. Nivel de satisfecho: "+(hambre));
  }  
}
alert("Satisfecho. No quiero comer mas por favor.");