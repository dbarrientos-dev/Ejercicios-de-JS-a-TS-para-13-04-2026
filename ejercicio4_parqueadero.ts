// Tipos de vehículo (simple)
const MOTO = 1;
const CARRO = 2;
const CAMIONETA = 3;

// Tarifas
const TARIFA_MOTO = 2000;
const TARIFA_CARRO = 4000;
const TARIFA_CAMIONETA = 6000;

// Datos
const tipos = [1, 2, 3, 1, 3, 2, 1];
const horas = [3, 9, 5, 10, 2, 8, 6];

// Contadores
let motos = 0;
let carros = 0;
let camionetas = 0;

let totalDinero = 0;
let totalHoras = 0;

for (let i = 0; i < tipos.length; i++) {

    let tipo = tipos[i];
    let tiempo = horas[i];

    let tarifa = 0;
    let nombre = "";

    // Determinar tipo
    if (tipo === MOTO) {
        tarifa = TARIFA_MOTO;
        nombre = "Moto";
        motos++;
    } 
    else if (tipo === CARRO) {
        tarifa = TARIFA_CARRO;
        nombre = "Carro";
        carros++;
    } 
    else if (tipo === CAMIONETA) {
        tarifa = TARIFA_CAMIONETA;
        nombre = "Camioneta";
        camionetas++;
    } 
    else {
        console.log("Tipo inválido");
        continue;
    }

    let costo = tarifa * tiempo;
    let descuento = 0;

    // Descuento si >= 8 horas
    if (tiempo >= 8) {
        descuento = costo * 0.20;
    }

    let total = costo - descuento;

    console.log("----------------------");
    console.log("Vehículo: " + nombre);
    console.log("Horas: " + tiempo);
    console.log("Total: $" + total);

    totalDinero = totalDinero + total;
    totalHoras = totalHoras + tiempo;
}

// Promedio
let promedio = 0;
if (tipos.length > 0) {
    promedio = totalHoras / tipos.length;
}

// Resumen
console.log("======================");
console.log("RESUMEN");

console.log("Motos: " + motos);
console.log("Carros: " + carros);
console.log("Camionetas: " + camionetas);

console.log("----------------------");
console.log("Total ganado: $" + totalDinero);
console.log("Promedio horas: " + promedio);

console.log("======================");