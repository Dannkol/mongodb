import { GetAllActivo } from "../models/Alquiler.js";

const GetAllAlquilerActivo =  async (req, res) => {
    try {
        
        const result = await GetAllActivo();

        res.status(200).json(result);

    } catch (error) {
        console.log(error);
        res.status(404).json({
            message : "Error Al traer los Alquileres Activos"
        });
        throw new Error;
    }
}

export { GetAllAlquilerActivo };