import { GetAllActivo , GetId } from "../models/Alquiler.js";

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

const GetAlquilerId = async (req, res) =>{
    try {
        const result = await GetId(req.params.id);

        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message : "Error Al traer los Alquileres Activos"
        });
        throw new Error;
    }
}

export { GetAllAlquilerActivo , GetAlquilerId };