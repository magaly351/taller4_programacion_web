const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'El API está funcionando correctamente' });
});

app.get('/api/info', (req, res) => {
    res.json({
        integrantes: [
            { nombre: "Magaly Aguilar", carnet: "00209425", ciudad: "La Libertad", carrera: "Ingenieria Informatica" }
        ],
        cantidadProyectos: 4
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});