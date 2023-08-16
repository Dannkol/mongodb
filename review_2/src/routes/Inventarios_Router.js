import express from 'express';

// Controllers

import { ControllerInventario } from '../controllers/InventarioController.js';

const router = express.Router();

router.post('/create', ControllerInventario.getById)

export { router }