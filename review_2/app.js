import express from "express";
import dotenv from "dotenv";

//Modulos propios
import configureApp from "./src/config/express.js";

import { Bodegas } from "./src/models/Bodegas.js";

//Routers


dotenv.config();

const app = express();

// Configurar la aplicación Express
configureApp(app);

// Definir rutas

app.use('/', async (req, res, next) => {
    const result = await Bodegas.getAll();
    res.status(200).json(result)
})

// Variables de entorno
const PORT = process.env.PORT || 8080;

//Get all employees from the database

app.listen(PORT, async () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
