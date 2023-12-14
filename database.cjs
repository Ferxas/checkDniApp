const sqlite3 = require("sqlite3");

const db = new sqlite3.Database('data.db');

db.run(`
CREATE TABLE IF NOT EXISTS registros (
    dni TEXT,
    nombre_completo TEXT,
    hora_registro TEXT
)
`);

process.on('message', data => {
    db.run('INSERT INTO registros (dni, nombre_completo, hora_registro) VALUES (?, ?, ?)', [data.numero, data.nombre_completo, new Date().toLocaleString()]);

});

process.on('exit', () => {
    db.close();
});