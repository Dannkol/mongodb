import express from "express";

import { configGET } from "../middleware/rate-limite.js";

import { authenticateToken } from "../middleware/auth_token.js"

import { router as Auth_Router } from "../routes/Auth_Router.js";

const configureApp = (app) => {
  // Configuraciones de Express
  app.use(express.json()); // Para manejar solicitudes JSON
  app.use(express.urlencoded({ extended: true })); // Para manejar solicitudes URL-encoded

  // Otros middlewares y configuraciones de Express
  app.use('/api/auth', Auth_Router);
  app.use(configGET);
  app.use(authenticateToken);
  // ...

  // Manejador de errores global
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Error interno del servidor");
  });
};

export default configureApp;
