import "reflect-metadata";

import jwt from "jsonwebtoken";
import jwtconfig from "../config/JWT.js";

import { plainToClass, classToPlain } from "class-transformer";
import { Alquiler } from "../DTO/Alquiler.js";
import { Automovil } from "../DTO/Automoviles.js";
import { Cliente } from "../DTO/Cliente.js";

const secretKey = jwtconfig.secret_key;

const parseClass = (className, obj = {}) => {
  const inst = plainToClass(className, obj, { ignoreDecorators: true });
  return {
    inst: inst,
    obj: classToPlain(inst),
  };
};

const verifyClass = (req, res, next, className, schema) => {
  !(JSON.stringify(schema) === JSON.stringify(parseClass(className).inst))
    ? res.status(403).json({ error: "No tienes permisos para esta acción" })
    : next();
};

const MiddlewareCreateToken = (req, res) => {
  const colleccion = req.params.colleccion;
  try {
    let schema;
    switch (colleccion) {
      case "Alquiler":
        schema = parseClass(Alquiler).inst;
        break;
      case "Automovil":
        schema = parseClass(Automovil).inst;
        break;
      case "Cliente":
        schema = parseClass(Cliente).inst;
        break;
      default:
        throw new Error("Colección no reconocida");
    }
    const token = jwt.sign({ schema }, secretKey, {
      expiresIn: "1h",
    });
    res.status(200).json({
      token: token,
    });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
    console.error(error);
  }
};

const MiddlewareVerifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res
      .status(401)
      .json({ error: "Token de autorización no proporcionado" });
  } else {
    jwt.verify(token, jwtconfig.secret_key, (err, schema) => {
      if (err) {
        return res
          .status(403)
          .json({ error: "Token de autorización inválido" });
      }
      try {
        switch (req.url.split("/")[1]) {
          case "alquiler":
            verifyClass(req, res, next, Alquiler, schema.schema);
            break;
          case "auto":
            verifyClass(req, res, next, Automovil, schema.schema);
            break;
          case "clients":
            verifyClass(req, res, next, Cliente, schema.schema);
            break;

          default:
            throw new Error("Colección no reconocida");
        }
      } catch (error) {
        res.status(401).json({
          error: error.message,
        });
        console.log(error);
      }
    });
  }
};

export { MiddlewareCreateToken, MiddlewareVerifyToken };
