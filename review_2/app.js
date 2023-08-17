import express from "express";
import dotenv from "dotenv";

//Modulos propios
import configureApp from "./src/config/express.js";

//Routers
import { router as Bodegas_Router } from "./src/routes/Bodegas_Router.js";
import { router as Inventarios_Router } from "./src/routes/Inventarios_Router.js";
import { router as Productos_Routes } from "./src/routes/Productos_Routes.js";
import { routes as Translado_Router } from "./src/routes/Translado_Router.js";


dotenv.config();

const app = express();

// Configurar la aplicación Express
configureApp(app);

// Definir rutas

app.use('/api/bodegas', Bodegas_Router);
app.use('/api/inventario', Inventarios_Router);
app.use('/api/producto', Productos_Routes);
app.use('/api/translado', Translado_Router);





app.post('/create', async (req, res, next) => {
  const result = await Bodegas.createBodega("Daniel", "1" , "2");
  res.status(200).json(result)
})

// Variables de entorno
const PORT = process.env.PORT || 8080;

//Get all employees from the database

app.listen(PORT, async () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
