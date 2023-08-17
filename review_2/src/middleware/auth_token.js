import jwt from "jsonwebtoken";

import jwtconfig from "../config/jwtconfig.js";

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ error: "Token de autorización no proporcionado" });
  }

  jwt.verify(token, jwtconfig.secret_key, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Token de autorización inválido" });
    }

    // El token es válido, se guarda el usuario en el objeto req para su posterior uso
    req.user = user;
    
    next();
  });
 
};

export { authenticateToken };