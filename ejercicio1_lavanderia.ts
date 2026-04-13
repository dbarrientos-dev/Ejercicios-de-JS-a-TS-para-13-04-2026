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

// Variables
let totalDia = 0;
let clientesConDescuento = 0;
let numeroCliente = 0;

// Recorrer clientes
for (const cliente of clientes) {
    numeroCliente++;

    const subtotal = cliente.horas * PRECIO_HORA;
    let descuento = 0;

    // Si tiene más de 12 horas → descuento
    if (cliente.horas >= 12) {
        descuento = subtotal * 0.30;
        clientesConDescuento++;
    }

    const total = subtotal - descuento;
    totalDia += total;

    // Mostrar info
    console.log("------ CLIENTE " + numeroCliente + " ------");
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
console.log("Con descuento: " + clientesConDescuento);
console.log("Total ganado: $" + totalDia);
