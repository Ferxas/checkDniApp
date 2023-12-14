const axios = require('axios');
const sqlite3 = require('sqlite3');
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'datos.db'));

async function consultarDNI() {
    const dniInput = document.getElementById('dniInput').value;

    try {
        const response = await axios.post(
            'https://apiperu.dev/api/dni',
            {},
            {
                params: { dni: dniInput },
                headers: {
                    Authorization:
                        'Bearer f20de7740e4b926895529ed7392b740fdc06cd37e43df1afaca97b21c5ab464d',
                },
            }
        );

        const data = response.data.data;

        // Guardar en la base de datos

        const currentTime = new Date().toISOString();
        db.run(
            `INSERT INTO consultas (numero, nombre_completo, hora_registro) VALUES (?, ?, ?)`,
            [data.numero, data.nombre_completo, currentTime],
            (err) => {
                if (err) {
                    console.error(err.message);
                } else {
                    console.log('Datos guardados en la base de datos.');
                }
            }
        );

        // Mostrar resultados en la interfaz
        const resultadosDiv = document.getElementById('resultados');
        resultadosDiv.innerHTML = `
            <p>Número: ${data.numero}</p>
            <p>Nombre Completo: ${data.nombre_completo}</p>
            <p>Hora de Registro: ${currentTime}</p>
        `;

        document.getElementById('paginaConsulta').style.display = 'none';
        const paginaSaludoDiv = document.getElementById('paginaSaludo');
        const mensajeP = document.getElementById('mensaje');
        mensajeP.textContent = `Hola ${data.nombres}`;
        paginaSaludoDiv.style.display = 'block';
    } catch (error) {
        console.error('Error al consultar DNI:', error.message);
        // alert('Error al consultar el DNI. Por favor intente nuevamente más tarde.');
    }
}

function volverAtras() {
    document.getElementById('paginaSaludo').style.display = 'block';
    document.getElementById('paginaVideo').style.display = 'none';
}





module.exports = { consultarDNI };
