import { GetAllDisp , GetCantidad } from "../models/automoviles.js";

const GetAllAutoDisp =  async (req, res) => {
    try {
        
        const result = await GetAllDisp();

        res.status(200).json(result);

    } catch (error) {
        console.log(error);
        res.status(404).json({
            message : "Error Al traer los Autos disponibles"
        });
        throw new Error;
    }
}

const GetSucursalCantidad = async (req, res) => {
    try {
        
        const result = await GetCantidad();

        res.status(200).json(result);

    } catch (error) {
        console.log(error);
        res.status(404).json({
            message : "Error Al traer los Autos disponibles"
        });
        throw new Error;
    }
}

export { GetAllAutoDisp , GetSucursalCantidad };