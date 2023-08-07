import express from "express";


// Middleware



// Rutas

const router = express.Router();

router.get(
  "/", (req , res) => {
    res.status(200).json({
        menssage: "Hello World!"
    })
  }
);

export default router;
