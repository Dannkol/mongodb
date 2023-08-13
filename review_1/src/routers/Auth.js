import express from "express";

// Middleware

import { MiddlewareCreateToken , MiddlewareVerifyToken } from "../middleware/AccesToken.js";

const router = express.Router();


router.get('/prueba', MiddlewareVerifyToken , (req, res) => {
    res.status(200).json({
        message : "OK"
    })
})
router.get('/:colleccion', MiddlewareCreateToken)

export default router 