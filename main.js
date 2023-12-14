const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    // win.setMenu(null);
    win.loadFile('index.html');
}

app.whenReady().then(() => {
    createDatabase();
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

function createDatabase() {
    const userDataPath = app.getPath('userData');
    const dbPath = path.join(userDataPath, 'datos.db');

    if (!fs.existsSync(userDataPath)) {
        fs.mkdirSync(userDataPath);
    }

    const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            return console.error(err.message);
        }


        // Crear la tabla consultas si no existe
        db.run(`
            CREATE TABLE IF NOT EXISTS consultas (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                numero TEXT,
                nombre_completo TEXT,
                hora_registro TEXT
            )
        `, (err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Tabla consultas creada correctamente.');
        });

        db.close((err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Base de datos cerrada correctamente.');
        });
    });
}