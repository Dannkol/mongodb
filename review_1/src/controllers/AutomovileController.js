import { GetAllDisp , GetCantidad, GetAllCap5 } from "../models/automoviles.js";

const GetAllAutoDisp =  async (req, res) => {
    try {
        
        const result = await GetAllDisp();

        res.status(200).json(result);

    } catch (error) {
        console.log(error);
        res.status(404).json({
            message : "Error Al traer los Autos disponibles"
        });

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

    }
}

const GetAllCapacidad5 = async (req, res) => {
    try {
        
        const result = await GetAllCap5();

        res.status(200).json(result);

    } catch (error) {
        console.log(error);
        res.status(404).json({
            message : "Error Al traer los Autos disponibles"
        });

    }
};

export { GetAllAutoDisp , GetSucursalCantidad, GetAllCapacidad5 };