// Tipo de dato para cliente
interface Cliente {
    nombre: string;
    horas: number;
}

// Datos
const clientes: Cliente[] = [
    { nombre: "pangolin", horas: 15 },
    { nombre: "marulete", horas: 10 },
    { nombre: "amy", horas: 14 },
    { nombre: "robtob", horas: 8 },
    { nombre: "tio gilipollas de cj", horas: 13 }
];

// Configuración
const PRECIO_HORA = 5000;
const HORAS_MIN_DESCUENTO = 12;

// Variables
let totalDia = 0;
let clientesConDescuento = 0;

// Recorrer clientes
for (let i = 0; i < clientes.length; i++) {
    let cliente = clientes[i];

    let subtotal = cliente.horas * PRECIO_HORA;
    let descuento = 0;

    // Si tiene 12 horas o más → descuento
    if (cliente.horas >= HORAS_MIN_DESCUENTO) {
        descuento = subtotal * 0.30;
        clientesConDescuento++;
    }

    let total = subtotal - descuento;
    totalDia += total;

    // Mostrar info
    console.log("------ CLIENTE " + (i + 1) + " ------");
    console.log("Nombre: " + cliente.nombre);
    console.log("Horas: " + cliente.horas);
    console.log("Subtotal: $" + subtotal);
    console.log("Descuento: $" + descuento);
    console.log("Total: $" + total);
    console.log("");
}

// Resumen final
console.log("===== RESUMEN =====");
console.log("Clientes: " + clientes.length);
console.log("Con descuento (12 h o más): " + clientesConDescuento);
console.log("Total ganado: $" + totalDia);
