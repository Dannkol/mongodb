import express from "express";

// Controllers
import { ControllerBodegas } from "../controllers/BodegaController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    menssage: "ok",
  });
});

router.get("/todos", ControllerBodegas.getAll);

router.post("/create", ControllerBodegas.createBodega);

router.get("/inventory", ControllerBodegas.listInventoryGroupBodegas);

export { router };
