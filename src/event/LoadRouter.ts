import amqp from "amqplib";
import bodyParser from "body-parser";
import express from "express";

const config = {
  protocol: "amqp",
  hostname: "23.22.218.241",
  port: 5672,
  username: "guest",
  password: "guest",
};

export const loadRouter = express.Router();

// Usamos bodyParser para analizar el cuerpo de las solicitudes POST en formato JSON
loadRouter.use(bodyParser.json());

loadRouter.post("/create", async function loadEvent(req, res) {
  try {
    // Obtén los datos del nuevo usuario desde el cuerpo de la solicitud
    const user = req.body;

    // Si el cuerpo no contiene los datos esperados, responde con un error
    if (!user.name && !user.lastname && !user.email && !user.password) {
      return res.status(400).json({ error: "Datos de usuario incompletos" });
    }

    const conn = await amqp.connect(config);
    console.log("Conexión exitosa");

    const channel = await conn.createChannel();
    console.log("Canal creado exitosamente");

    const message = JSON.stringify(user);

    await channel.sendToQueue("newUser", Buffer.from(message));
    console.log("Mensaje enviado:");
    console.log(message);

    await channel.close();
    await conn.close();

    res.status(201).send({
      status: "success",
      message: "Usuario enviado"
    });
    // res.status(200).send("OK --> Usuario enviado");
  } catch (error) {
    // Manejar cualquier error que ocurra durante las operaciones asíncronas
    console.error("Error en la operación:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});


loadRouter.post("/login", async function loadEvent(req, res) {
  try {
    const userLogged = req.body;

    if (!userLogged.email && !userLogged.password) {
      return res.status(400).json({ error: "Datos de usuario incompletos" });
    }

    const conn = await amqp.connect(config);
    console.log("Conexión exitosa");

    const channel = await conn.createChannel();
    console.log("Canal creado exitosamente");

    const message = JSON.stringify(userLogged);

    await channel.sendToQueue("login", Buffer.from(message));
    console.log("Mensaje enviado:");
    console.log(message);

    await channel.close();
    await conn.close();

    res.status(201).send({
      status: "success",
      message: "Datos enviados para login"
    });
  } catch (error) {
    console.error("Error en la operación:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
