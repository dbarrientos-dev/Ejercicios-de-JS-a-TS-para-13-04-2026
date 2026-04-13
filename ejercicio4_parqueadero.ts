/**
 * SISTEMA DE GESTIÓN DE PARQUEADERO - VERSIÓN ROBUSTA
 */

enum TipoVehiculo {
    MOTO = 1,
    CARRO = 2,
    CAMIONETA = 3
}

// Tarifas tipadas correctamente
const TARIFAS: Record<TipoVehiculo, number> = {
    [TipoVehiculo.MOTO]: 2000,
    [TipoVehiculo.CARRO]: 4000,
    [TipoVehiculo.CAMIONETA]: 6000
};

// Nombres de tipos (evita switch)
const NOMBRES: Record<TipoVehiculo, string> = {
    [TipoVehiculo.MOTO]: "Moto",
    [TipoVehiculo.CARRO]: "Carro",
    [TipoVehiculo.CAMIONETA]: "Camioneta"
};

const HORAS_MIN_DESCUENTO = 8;
const PORCENTAJE_DESCUENTO = 0.20;

// Datos de entrada
const tiposEntrada: number[] = [1, 2, 3, 1, 3, 2, 1];
const horasEntrada: number[] = [3, 9, 5, 10, 2, 8, 6];

// Validación básica
if (tiposEntrada.length !== horasEntrada.length) {
    throw new Error("❌ Error: Datos inconsistentes (tipos vs horas)");
}

// Contadores
interface IContadores {
    motos: number;
    carros: number;
    camionetas: number;
}

let contadores: IContadores = { motos: 0, carros: 0, camionetas: 0 };
let ingresoTotal = 0;
let sumaHoras = 0;
let totalVehiculos = 0;

for (let i = 0; i < tiposEntrada.length; i++) {
    const tipoRaw = tiposEntrada[i];
    const horas = horasEntrada[i];

    const tipo = tipoRaw as TipoVehiculo;

    // Validación correcta
    if (!(tipo in TARIFAS)) {
        console.log(`⚠️ Registro ${i + 1}: Tipo ${tipoRaw} inválido. Saltando...`);
        continue;
    }

    const tarifaHora = TARIFAS[tipo];
    const tipoTexto = NOMBRES[tipo];

    // Contadores
    if (tipo === TipoVehiculo.MOTO) contadores.motos++;
    if (tipo === TipoVehiculo.CARRO) contadores.carros++;
    if (tipo === TipoVehiculo.CAMIONETA) contadores.camionetas++;

    const costoBase = tarifaHora * horas;

    // ✅ CORRECCIÓN CLAVE
    const aplicaDescuento = horas >= HORAS_MIN_DESCUENTO;

    const valorDescuento = aplicaDescuento
        ? costoBase * PORCENTAJE_DESCUENTO
        : 0;

    const totalPagar = costoBase - valorDescuento;

    console.log(`\n--- VEHÍCULO ${i + 1} REGISTRADO ---`);
    console.log(`Tipo:      ${tipoTexto}`);
    console.log(`Tiempo:    ${horas} horas`);
    console.log(`Estado:    ${aplicaDescuento ? "CON DESCUENTO" : "SIN DESCUENTO"}`);
    console.log(`Total:     $${totalPagar.toLocaleString("es-CO")}`);

    ingresoTotal += totalPagar;
    sumaHoras += horas;
    totalVehiculos++;
}

// Promedio seguro
const promedioHoras = totalVehiculos > 0
    ? sumaHoras / totalVehiculos
    : 0;

// Resumen
console.log("\n" + "=".repeat(40));
console.log("         RESUMEN GENERAL");
console.log("=".repeat(40));
console.log(`Motos:        ${contadores.motos}`);
console.log(`Carros:       ${contadores.carros}`);
console.log(`Camionetas:   ${contadores.camionetas}`);
console.log("-".repeat(40));
console.log(`TOTAL INGRESO: $${ingresoTotal.toLocaleString("es-CO")}`);
console.log(`PROMEDIO:      ${promedioHoras.toFixed(1)} horas`);
console.log("=".repeat(40));