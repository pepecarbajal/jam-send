require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const messageRoutes = require('./routes/message');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

app.use('/', messageRoutes);
app.get('/', (req, res) => {
    res.send("JAM Desarrollo de Software")
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});