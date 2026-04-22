// Memoria volátil del servidor (se borra si reinicias el servidor)
let baseDeDatos = {};

// Función para guardar un alumno según la IP
const guardarAlumno = (ip, alumno) => {
    if (!baseDeDatos[ip]) {
        baseDeDatos[ip] = [];
    }
    baseDeDatos[ip].push(alumno);
};

// Función para obtener la lista de una IP
const obtenerAlumnosPorIP = (ip) => {
    return baseDeDatos[ip] || [];
};

// EXPORTACIÓN: Hacemos que estas funciones sean visibles para otros archivos
module.exports = {
    guardarAlumno,
    obtenerAlumnosPorIP
};