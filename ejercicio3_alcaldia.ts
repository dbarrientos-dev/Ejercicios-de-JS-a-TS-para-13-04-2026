export interface Persona {
    nombre: string;
    edad: number;
}

export interface ResultadoSubsidio {
    persona: Persona;
    subsidio: number;
}

export interface ResumenAlcaldia {
    resultados: ResultadoSubsidio[];
    totalPersonas: number;
    cont60a80: number;
    cont80mas: number;
    contNo: number;
    totalDinero: number;
}

export const SALARIO_MINIMO = 1300000;
export const SUBSIDIO_12 = SALARIO_MINIMO * 0.12;
export const SUBSIDIO_15 = SALARIO_MINIMO * 0.15;

const nombres = ["Carlos Pérez", "María López", "Juan Torres", "Rosa Gómez", "Luis Herrera"];
const edades = [65, 82, 45, 78, 91];

export const personas: Persona[] = nombres.map((nombre, index) => ({ nombre, edad: edades[index] ?? 0 }));

export function calcularSubsidioPorEdad(edad: number, subsidio12: number, subsidio15: number): number {
    if (edad >= 60 && edad <= 80) {
        return subsidio12;
    }

    if (edad > 80) {
        return subsidio15;
    }

    return 0;
}

export function calcularResumenAlcaldia(listaPersonas: Persona[], subsidio12: number, subsidio15: number): ResumenAlcaldia {
    const resultados = listaPersonas.map((persona) => ({
        persona,
        subsidio: calcularSubsidioPorEdad(persona.edad, subsidio12, subsidio15)
    }));

    const cont60a80 = resultados.filter((r) => r.persona.edad >= 60 && r.persona.edad <= 80).length;
    const cont80mas = resultados.filter((r) => r.persona.edad > 80).length;
    const contNo = resultados.filter((r) => r.subsidio === 0).length;
    const totalDinero = resultados.reduce((acc, r) => acc + r.subsidio, 0);

    return {
        resultados,
        totalPersonas: listaPersonas.length,
        cont60a80,
        cont80mas,
        contNo,
        totalDinero
    };
}

export function reportarAlcaldia(resumen: ResumenAlcaldia): void {
    console.log("=== SUBSIDIOS ===");

    for (const resultado of resumen.resultados) {
        if (resultado.subsidio > 0) {
            console.log("------------------");
            console.log("Nombre: " + resultado.persona.nombre);
            console.log("Edad: " + resultado.persona.edad);
            console.log("Subsidio: $" + resultado.subsidio);
        }
    }

    console.log("==================");
    console.log("RESUMEN");
    console.log("Total personas: " + resumen.totalPersonas);
    console.log("60 a 80 años: " + resumen.cont60a80);
    console.log("Más de 80: " + resumen.cont80mas);
    console.log("No aplican: " + resumen.contNo);
    console.log("------------------");
    console.log("Total dinero: $" + resumen.totalDinero);
    console.log("==================");
}

export function ejecutarEjercicio3(): void {
    const resumen = calcularResumenAlcaldia(personas, SUBSIDIO_12, SUBSIDIO_15);
    reportarAlcaldia(resumen);
}

ejecutarEjercicio3();
