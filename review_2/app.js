import express from "express";
import dotenv from "dotenv";

//Modulos propios
import configureApp from "./src/config/express.js";

//Routers
import { router as Bodegas_Router } from "./src/routes/Bodegas_Router.js";

dotenv.config();

const app = express();

// Configurar la aplicación Express
configureApp(app);

// Definir rutas

app.use('/api', Bodegas_Router)

app.post('/create', async (req, res, next) => {
  console.log('create');
  const result = await Bodegas.createBodega("Daniel", "1" , "2");
  res.status(200).json(result)
})

// Variables de entorno
const PORT = process.env.PORT || 8080;

//Get all employees from the database

app.listen(PORT, async () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
