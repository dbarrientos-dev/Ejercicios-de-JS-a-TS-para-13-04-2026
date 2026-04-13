interface Combo {
    nombre: string;
    precio: number;
}

const combos: Combo[] = [
    { nombre: "Clásica", precio: 15000 },
    { nombre: "Doble Poder", precio: 22000 },
    { nombre: "Mega Fest", precio: 35000 }
];

// Pedido más seguro (clave = nombre)
const pedidos: Record<string, number> = {
    "Clásica": 2,
    "Doble Poder": 1,
    "Mega Fest": 3
};

let totalDinero = 0;
let cantidadTotalCombos = 0;

console.log("\n" + "=".repeat(40));
console.log("   BIENVENIDO A BURGER PALACE");
console.log("=".repeat(40));

for (const combo of combos) {
    const { nombre, precio } = combo;

    // Si no existe el pedido, toma 0
    const cantidad = pedidos[nombre] ?? 0;

    const subtotal = precio * cantidad;

    totalDinero += subtotal;
    cantidadTotalCombos += cantidad;

    console.log(`\nProducto:   ${nombre}`);
    console.log(`Unitario:   $${precio.toLocaleString("es-CO")}`);
    console.log(`Cantidad:   ${cantidad}`);
    console.log(`Subtotal:   $${subtotal.toLocaleString("es-CO")}`);
}

console.log("\n" + "=".repeat(40));
console.log("          RESUMEN FINAL");
console.log("=".repeat(40));

for (const combo of combos) {
    const cantidad = pedidos[combo.nombre] ?? 0;
    console.log(`${combo.nombre.padEnd(15)}: ${cantidad} unidades`);
}

console.log("-".repeat(40));
console.log(`TOTAL PRODUCTOS:  ${cantidadTotalCombos}`);
console.log(`TOTAL A PAGAR:    $${totalDinero.toLocaleString("es-CO")}`);
console.log("=".repeat(40));
console.log("   ¡Gracias por su compra!");