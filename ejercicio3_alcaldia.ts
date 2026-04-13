// Salario mínimo
const SALARIO_MINIMO = 1300000;

// Subsidios
const SUBSIDIO_12 = SALARIO_MINIMO * 0.12;
const SUBSIDIO_15 = SALARIO_MINIMO * 0.15;

interface Persona {
    nombre: string;
    edad: number;
}

// Datos
const personas: Persona[] = [
    { nombre: "Carlos Pérez", edad: 65 },
    { nombre: "María López", edad: 82 },
    { nombre: "Juan Torres", edad: 45 },
    { nombre: "Rosa Gómez", edad: 78 },
    { nombre: "Luis Herrera", edad: 91 }
];

// Contadores
let cont60a80 = 0;
let cont80mas = 0;
let contNo = 0;
let totalDinero = 0;

console.log("=== SUBSIDIOS ===");

// Recorrer personas
for (const persona of personas) {
    const { nombre, edad } = persona;
    let subsidio = 0;

    if (edad >= 60 && edad <= 80) {
        subsidio = SUBSIDIO_12;
        cont60a80++;
    }
    else if (edad > 80) {
        subsidio = SUBSIDIO_15;
        cont80mas++;
    }
    else {
        contNo++;
    }

    // Solo mostrar si tiene subsidio
    if (subsidio > 0) {
        totalDinero = totalDinero + subsidio;

        console.log("------------------");
        console.log("Nombre: " + nombre);
        console.log("Edad: " + edad);
        console.log("Subsidio: $" + subsidio);
    }
}

// Resumen
console.log("==================");
console.log("RESUMEN");

console.log("Total personas: " + personas.length);
console.log("60 a 80 años: " + cont60a80);
console.log("Más de 80: " + cont80mas);
console.log("No aplican: " + contNo);

console.log("------------------");
console.log("Total dinero: $" + totalDinero);
console.log("==================");
