export interface Cliente {
    nombre: string;
    horas: number;
}

export interface FacturaCliente {
    cliente: Cliente;
    subtotal: number;
    descuento: number;
    total: number;
}

export interface ResumenLavanderia {
    facturas: FacturaCliente[];
    clientes: number;
    clientesConDescuento: number;
    totalGanado: number;
}

export const PRECIO_HORA = 5000;

export const clientes: Cliente[] = [
    { nombre: "pangolin", horas: 15 },
    { nombre: "marulete", horas: 10 },
    { nombre: "amy", horas: 14 },
    { nombre: "robtob", horas: 8 },
    { nombre: "tio gilipollas de cj", horas: 13 }
];

export function calcularFacturaCliente(cliente: Cliente, precioHora: number): FacturaCliente {
    const subtotal = cliente.horas * precioHora;
    const descuento = cliente.horas >= 12 ? subtotal * 0.3 : 0;
    const total = subtotal - descuento;

    return { cliente, subtotal, descuento, total };
}

export function calcularResumenLavanderia(listaClientes: Cliente[], precioHora: number): ResumenLavanderia {
    const facturas = listaClientes.map((cliente) => calcularFacturaCliente(cliente, precioHora));
    const clientesConDescuento = facturas.filter((factura) => factura.descuento > 0).length;
    const totalGanado = facturas.reduce((acc, factura) => acc + factura.total, 0);

    return {
        facturas,
        clientes: listaClientes.length,
        clientesConDescuento,
        totalGanado
    };
}

export function reportarLavanderia(resumen: ResumenLavanderia): void {
    for (const [i, factura] of resumen.facturas.entries()) {
        console.log("------ CLIENTE " + (i + 1) + " ------");
        console.log("Nombre: " + factura.cliente.nombre);
        console.log("Horas: " + factura.cliente.horas);
        console.log("Subtotal: $" + factura.subtotal);
        console.log("Descuento: $" + factura.descuento);
        console.log("Total: $" + factura.total);
        console.log("");
    }

    console.log("===== RESUMEN =====");
    console.log("Clientes: " + resumen.clientes);
    console.log("Con descuento: " + resumen.clientesConDescuento);
    console.log("Total ganado: $" + resumen.totalGanado);
}

export function ejecutarEjercicio1(): void {
    const resumen = calcularResumenLavanderia(clientes, PRECIO_HORA);
    reportarLavanderia(resumen);
}

ejecutarEjercicio1();
