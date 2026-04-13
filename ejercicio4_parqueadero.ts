export interface RegistroVehiculo {
    tipo: number;
    horas: number;
}

export interface CobroVehiculo {
    registro: RegistroVehiculo;
    nombreTipo: string;
    tarifa: number;
    costo: number;
    descuento: number;
    total: number;
}

export interface ResumenParqueadero {
    cobros: CobroVehiculo[];
    motos: number;
    carros: number;
    camionetas: number;
    totalDinero: number;
    promedioHoras: number;
}

export const MOTO = 1;
export const CARRO = 2;
export const CAMIONETA = 3;

export const TARIFA_MOTO = 2000;
export const TARIFA_CARRO = 4000;
export const TARIFA_CAMIONETA = 6000;

const tipos = [1, 2, 3, 1, 3, 2, 1];
const horas = [3, 9, 5, 10, 2, 8, 6];

export const registros: RegistroVehiculo[] = tipos.map((tipo, index) => ({ tipo, horas: horas[index] ?? 0 }));

export function obtenerTarifaYNombre(tipo: number): { tarifa: number; nombreTipo: string } | null {
    if (tipo === MOTO) return { tarifa: TARIFA_MOTO, nombreTipo: "Moto" };
    if (tipo === CARRO) return { tarifa: TARIFA_CARRO, nombreTipo: "Carro" };
    if (tipo === CAMIONETA) return { tarifa: TARIFA_CAMIONETA, nombreTipo: "Camioneta" };
    return null;
}

export function calcularCobroVehiculo(registro: RegistroVehiculo): CobroVehiculo | null {
    const tipoInfo = obtenerTarifaYNombre(registro.tipo);
    if (!tipoInfo) return null;

    const costo = tipoInfo.tarifa * registro.horas;
    const descuento = registro.horas >= 8 ? costo * 0.2 : 0;
    const total = costo - descuento;

    return {
        registro,
        nombreTipo: tipoInfo.nombreTipo,
        tarifa: tipoInfo.tarifa,
        costo,
        descuento,
        total
    };
}

export function calcularResumenParqueadero(listaRegistros: RegistroVehiculo[]): ResumenParqueadero {
    const cobros = listaRegistros
        .map((registro) => calcularCobroVehiculo(registro))
        .filter((cobro): cobro is CobroVehiculo => cobro !== null);

    const motos = cobros.filter((cobro) => cobro.registro.tipo === MOTO).length;
    const carros = cobros.filter((cobro) => cobro.registro.tipo === CARRO).length;
    const camionetas = cobros.filter((cobro) => cobro.registro.tipo === CAMIONETA).length;

    const totalDinero = cobros.reduce((acc, cobro) => acc + cobro.total, 0);
    const totalHoras = cobros.reduce((acc, cobro) => acc + cobro.registro.horas, 0);
    const promedioHoras = cobros.length > 0 ? totalHoras / cobros.length : 0;

    return { cobros, motos, carros, camionetas, totalDinero, promedioHoras };
}

export function reportarParqueadero(resumen: ResumenParqueadero, listaRegistros: RegistroVehiculo[]): void {
    for (const registro of listaRegistros) {
        const cobro = calcularCobroVehiculo(registro);

        if (!cobro) {
            console.log("Tipo inválido");
            continue;
        }

        console.log("----------------------");
        console.log("Vehículo: " + cobro.nombreTipo);
        console.log("Horas: " + registro.horas);
        console.log("Total: $" + cobro.total);
    }

    console.log("======================");
    console.log("RESUMEN");
    console.log("Motos: " + resumen.motos);
    console.log("Carros: " + resumen.carros);
    console.log("Camionetas: " + resumen.camionetas);
    console.log("----------------------");
    console.log("Total ganado: $" + resumen.totalDinero);
    console.log("Promedio horas: " + resumen.promedioHoras);
    console.log("======================");
}

export function ejecutarEjercicio4(): void {
    const resumen = calcularResumenParqueadero(registros);
    reportarParqueadero(resumen, registros);
}

ejecutarEjercicio4();
