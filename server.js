require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const messageRoutes = require('./routes/message');

const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors({
    origin: "https://www.jamsoftware.dev/",
  }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

app.use('/', messageRoutes);
app.get('/', (req, res) => {
    res.send("JAM Desarrollo de Software")
});
app.get('/a', (req, res) => {
    res.send('a');
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});