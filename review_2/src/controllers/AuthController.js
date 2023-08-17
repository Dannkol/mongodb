import jwt from 'jsonwebtoken';

import {User} from "../models/User.js";
import jwtconfig from '../config/jwtconfig.js';
import { useContainer } from 'class-validator';

const authorization = async (req, res) => {
  const secretKey = jwtconfig.secret_key;

  try {
    const { nombre, password } = req.body;

    const user = await User.getUser(nombre, password);

    console.log(user);

    const auth = user.nombre === nombre && user.password == password;
    if (!auth) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    } else {
      // Generar el token JWT
      const token = jwt.sign({ id: user.id, nombre: user.nombre }, secretKey, {
        expiresIn: "1h",
      });

      // Responder con el token
      res.json({ token });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
        message : "Imposible crear un token pruebe más tarde"
    })
  }
};

export { authorization };