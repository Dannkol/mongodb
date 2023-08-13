import express from "express";
import dotenv from "dotenv";

//Modulos propios
import configureApp from "./src/config/express.js";

//Routers
import routes_main from "./src/routers/main.js"
import routes_auth from "./src/routers/Auth.js"


dotenv.config();

const app = express();

// Configurar la aplicación Express
configureApp(app);

// Definir rutas
app.use('/api', routes_main);
app.use('/api/auth', routes_auth);

// Variables de entorno
const PORT = process.env.PORT || 8080;

//Get all employees from the database

app.listen(PORT, async () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
