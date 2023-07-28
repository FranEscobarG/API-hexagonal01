import express from "express";
import cors from "cors"; // Importar el paquete cors
import { Signale } from "signale";

import { loadRouter } from "./event/LoadRouter";
import { userRouter } from "./product/infrastructure/UserRouter";

const app = express();

const signale = new Signale();

// Habilitar CORS en la API
app.use(cors());

app.use(express.json());
app.use("/users", userRouter);
app.use("/event", loadRouter);

app.listen(3000, () => {
  signale.success("Server online in port 3000");
});
