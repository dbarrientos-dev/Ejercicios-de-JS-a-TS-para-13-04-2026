/**
 * SISTEMA DE GESTIÓN DE MULTAS - BIBLIOTECH
 * Calcula sanciones por préstamos que exceden el límite de 7 días.
 */

export interface UsuarioPrestamos {
    nombre: string;
    prestamos: number[];
}

export interface MultaLibro {
    indiceLibro: number;
    diasPrestamo: number;
    diasRetraso: number;
    multa: number;
}

export interface ReporteUsuario {
    nombre: string;
    multasPorLibro: MultaLibro[];
    acumuladoUsuario: number;
    estadoUsuario: string;
}

export interface ResumenBiblioteca {
    reportesUsuario: ReporteUsuario[];
    usuariosAuditados: number;
    totalLibros: number;
    devolucionesATiempo: number;
    devolucionesTarde: number;
    totalRecaudacion: number;
}

export const DIAS_GRACIA = 7;
export const MULTA_DIARIA = 1500;
export const RECARGO_GRAVE = 10000;
export const UMBRAL_RECARGO = 15;

const usuarios = ["Ana Garcia", "Pedro Ramirez", "Lucia Torres"];
const prestamosPorUsuario = [
    [5, 10, 20],
    [3, 8],
    [7, 15, 6]
];

export const datosUsuarios: UsuarioPrestamos[] = usuarios.map((nombre, i) => ({
    nombre,
    prestamos: prestamosPorUsuario[i] ?? []
}));

export function calcularMultaLibro(diasPrestamo: number): { diasRetraso: number; multa: number } {
    const diasRetraso = Math.max(0, diasPrestamo - DIAS_GRACIA);
    let multa = 0;

    if (diasRetraso > 0) {
        multa = diasRetraso * MULTA_DIARIA;
        if (diasRetraso > UMBRAL_RECARGO) {
            multa += RECARGO_GRAVE;
        }
    }

    return { diasRetraso, multa };
}

export function calcularResumenBiblioteca(usuariosConPrestamos: UsuarioPrestamos[]): ResumenBiblioteca {
    let devolucionesATiempo = 0;
    let devolucionesTarde = 0;

    const reportesUsuario = usuariosConPrestamos.map((usuario) => {
        const multasPorLibro = usuario.prestamos.map((diasPrestamo, indiceLibro) => {
            const resultado = calcularMultaLibro(diasPrestamo);
            if (resultado.diasRetraso === 0) {
                devolucionesATiempo++;
            } else {
                devolucionesTarde++;
            }

            return {
                indiceLibro,
                diasPrestamo,
                diasRetraso: resultado.diasRetraso,
                multa: resultado.multa
            };
        });

        const acumuladoUsuario = multasPorLibro.reduce((acc, item) => acc + item.multa, 0);
        const estadoUsuario = acumuladoUsuario > 0 ? "⚠️ DEUDOR" : "✅ AL DÍA";

        return {
            nombre: usuario.nombre,
            multasPorLibro,
            acumuladoUsuario,
            estadoUsuario
        };
    });

    const totalRecaudacion = reportesUsuario.reduce((acc, r) => acc + r.acumuladoUsuario, 0);

    return {
        reportesUsuario,
        usuariosAuditados: usuariosConPrestamos.length,
        totalLibros: devolucionesATiempo + devolucionesTarde,
        devolucionesATiempo,
        devolucionesTarde,
        totalRecaudacion
    };
}

export function reportarBiblioteca(resumen: ResumenBiblioteca): void {
    for (const reporteUsuario of resumen.reportesUsuario) {
        console.log(`\n--- EXPEDIENTE: ${reporteUsuario.nombre.toUpperCase()} ---`);
        console.log(`Libros procesados: ${reporteUsuario.multasPorLibro.length}`);

        for (const detalle of reporteUsuario.multasPorLibro) {
            if (detalle.diasRetraso === 0) {
                console.log(`  Libro ${detalle.indiceLibro + 1}: [PUNTUAL] (${detalle.diasPrestamo} días)`);
            } else {
                console.log(`  Libro ${detalle.indiceLibro + 1}: [RETRASO] ${detalle.diasRetraso} días extra - Multa: $${detalle.multa.toLocaleString("es-CO")}`);
            }
        }

        console.log(`SUBTOTAL USUARIO: $${reporteUsuario.acumuladoUsuario.toLocaleString("es-CO")} - ${reporteUsuario.estadoUsuario}`);
    }

    console.log("\n" + "=".repeat(45));
    console.log("          RESUMEN EJECUTIVO BIBLIOTECH");
    console.log("=".repeat(45));
    console.log(`Usuarios auditados:    ${resumen.usuariosAuditados}`);
    console.log(`Total libros:          ${resumen.totalLibros}`);
    console.log(`Devoluciones a tiempo: ${resumen.devolucionesATiempo}`);
    console.log(`Devoluciones tarde:    ${resumen.devolucionesTarde}`);
    console.log("-".repeat(45));
    console.log(`TOTAL RECAUDACIÓN:     $${resumen.totalRecaudacion.toLocaleString("es-CO")}`);
    console.log("=".repeat(45));
}

export function ejecutarEjercicio5(): void {
    const resumen = calcularResumenBiblioteca(datosUsuarios);
    reportarBiblioteca(resumen);
}

ejecutarEjercicio5();
