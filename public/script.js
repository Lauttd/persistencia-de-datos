// Al cargar la página, pedimos los datos al servidor
window.onload = cargarDatosDelServidor;

// Escuchar el clic del botón
document.getElementById('btnCargar').addEventListener('click', enviarAlServidor);

async function enviarAlServidor() {
    const inputNombre = document.getElementById('nombre');
    const inputEdad = document.getElementById('edad');
    const inputNota = document.getElementById('nota');

    const alumno = {
        nombre: inputNombre.value,
        edad: Number(inputEdad.value),
        nota: Number(inputNota.value)
    };

    // Validación básica
    if (!alumno.nombre || !alumno.nota) return alert("Faltan datos");

    // Enviamos el alumno al Backend usando POST
    await fetch('/api/alumnos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alumno)
    });

    // Recargamos la página como pidió el ejercicio
    location.reload();
}

async function cargarDatosDelServidor() {
    // Pedimos la lista al Backend usando GET
    const respuesta = await fetch('/api/alumnos');
    const alumnos = await respuesta.json();

    // ORDENAR: 1° por nota (Mayor a Menor) y 2° por nombre (A-Z)
    alumnos.sort((a, b) => {
        if (b.nota !== a.nota) {
            return b.nota - a.nota; 
        }
        return a.nombre.localeCompare(b.nombre);
    });

    // Dibujar los datos en la tabla
    const tabla = document.getElementById('tablaAlumnos');
    alumnos.forEach(al => {
        const fila = `<tr>
            <td>${al.nombre}</td>
            <td>${al.edad}</td>
            <td>${al.nota}</td>
        </tr>`;
        tabla.innerHTML += fila;
    });
}