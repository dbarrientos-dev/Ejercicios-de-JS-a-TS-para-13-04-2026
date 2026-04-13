/**
 * Estructura de datos para representar a un cliente.
 */
interface Cliente {
    nombre: string;
    horas: number;
}

// Configuración
const PRECIO_HORA = 5000;
const UMBRAL_DESCUENTO = 12;
const PORCENTAJE_DESCUENTO = 0.30;

/**
 * Base de datos ficticia
 */
const clientes: Cliente[] = [
    { nombre: "pangolin", horas: 15 },
    { nombre: "marulete", horas: 10 },
    { nombre: "amy", horas: 14 },
    { nombre: "robtob", horas: 8 },
    { nombre: "tio gilipollas de cj", horas: 13 }
];

// Acumuladores
let totalDia = 0;
let clientesConDescuento = 0;

/**
 * Función para calcular factura
 */
function calcularFactura(cliente: Cliente, index: number): number {
    const { nombre, horas } = cliente;

    const subtotal = horas * PRECIO_HORA;
    const aplicaDescuento = horas >= UMBRAL_DESCUENTO;

    const descuento = aplicaDescuento
        ? subtotal * PORCENTAJE_DESCUENTO
        : 0;

    const total = subtotal - descuento;

    if (aplicaDescuento) {
        clientesConDescuento++;
    }

    // Salida
    console.log(`\n--- CLIENTE ${index + 1}: ${nombre.toUpperCase()} ---`);
    console.log(`Horas alquiladas: ${horas}`);
    console.log(`Subtotal: $${subtotal.toLocaleString("es-CO")}`);
    console.log(`Descuento (${PORCENTAJE_DESCUENTO * 100}%): $${descuento.toLocaleString("es-CO")}`);
    console.log(aplicaDescuento ? "Estado: [CON DESCUENTO]" : "Estado: [SIN DESCUENTO]");
    console.log(`Total a pagar: $${total.toLocaleString("es-CO")}`);

    return total;
}

/**
 * Procesamiento
 */
clientes.forEach((cliente, index) => {
    totalDia += calcularFactura(cliente, index);
});

/**
 * Reporte final
 */
console.log("\n" + "=".repeat(25));
console.log("   RESUMEN DEL DÍA");
console.log("=".repeat(25));
console.log(`Total de clientes:       ${clientes.length}`);
console.log(`Clientes beneficiados:   ${clientesConDescuento}`);
console.log(`Ingreso total de caja:   $${totalDia.toLocaleString("es-CO")}`);
console.log("=".repeat(25));

mero console.error();
cdbbhbh