const express = require('express');
const router = express.Router();
const twilio = require('twilio');
const Message = require('../models/Message');
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const toPhoneNumber = process.env.TO_PHONE_NUMBER;
const client = twilio(accountSid, authToken);

router.post('/send', async (req, res) => {
    const { nombre, telefono, asunto, descripcion } = req.body;

    if (!nombre || !telefono || !asunto || !descripcion) {
        return res.status(400).send('Todos los campos son obligatorios');
    }

    const mensaje = `Nuevo mensaje de formulario:\n\nNombre: ${nombre}\nTeléfono: ${telefono}\nAsunto: ${asunto}\nDescripción: ${descripcion}`;

    try {
        // Guardar el mensaje en la base de datos
        const newMessage = new Message({ nombre, telefono, asunto, descripcion });
        await newMessage.save();

        // Enviar el mensaje con Twilio
        // const message = await client.messages.create({
        //     body: mensaje,
        //     from: twilioPhoneNumber,
        //     to: toPhoneNumber
        // });

        // console.log(`Mensaje enviado: ${message.sid}`);
        res.status(200).send('Mensaje enviado y guardado correctamente');
    } catch (error) {
        console.error(`Error al enviar el mensaje: ${error}`);
        res.status(500).send('Error al enviar el mensaje');
    }
});

module.exports = router;