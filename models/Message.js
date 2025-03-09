const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    telefono: { type: String, required: true },
    asunto: { type: String, required: true },
    descripcion: { type: String, required: true },
    fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', MessageSchema);