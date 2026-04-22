// Importamos librerías estándar
const express = require('express');
const path = require('path');
const app = express();

// IMPORTACIÓN: Traemos las funciones del archivo datos.js
const logicaDatos = require('./datos');

// Configuración para entender JSON y servir la carpeta "public"
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// RUTA GET: El navegador pide la lista
app.get('/api/alumnos', (req, res) => {
    const ip = req.ip;
    // Usamos la función del módulo exportado
    const lista = logicaDatos.obtenerAlumnosPorIP(ip);
    res.json(lista);
});

// RUTA POST: El navegador envía un nuevo alumno
app.post('/api/alumnos', (req, res) => {
    const ip = req.ip;
    const nuevoAlumno = req.body;

    // Usamos la función del módulo exportado
    logicaDatos.guardarAlumno(ip, nuevoAlumno);

    res.json({ status: "OK", mensaje: "Alumno guardado en el servidor" });
});

// Encendemos el servidor
const PUERTO = 3000;
app.listen(PUERTO, '0.0.0.0', () => {
    console.log(`>>> Servidor corriendo en http://localhost:${PUERTO}`);
});