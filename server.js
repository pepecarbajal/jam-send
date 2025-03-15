require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const messageRoutes = require('./routes/message');

const app = express();
const port = 3000;

app.use((req, res, next) => {
    const allowedOrigins = ["https://www.jamsoftware.dev"];
    const origin = req.headers.origin;

    if (origin && allowedOrigins.includes(origin)) {
        next();
    } else {
        res.status(403).json({ message: "Acceso denegado" });
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

app.use('/', messageRoutes);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});