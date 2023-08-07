import { GetAllActivo , GetId, pay , GetAlquilerFecha , GetCantidad , GetAlquilerFechaInicioFinal} from "../models/Alquiler.js";

const GetAllAlquilerActivo =  async (req, res) => {
    try {
        
        const result = await GetAllActivo();

        res.status(200).json(result);

    } catch (error) {
        console.log(error);
        res.status(404).json({
            message : "Error Al traer los Alquileres Activos"
        });

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

    }
}

const GetAlquilerPay = async (req, res) =>{
    try {
        const result = await pay(req.params.id);

        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message : "Error Al traer los Alquileres Activos"
        });
        
    }
}

const GetAlquilerFechaInicial = async (req, res) => { 
    try {
        const result = await GetAlquilerFecha(req.params.date);

        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message : "Error Al traer los Alquileres Activos"
        });
        
    }
}

const GetAllCantidadAlquiler = async (req, res) => { 
    try {
        const result = await GetCantidad();

        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message : "Error Al traer los Alquileres Activos"
        });
        
    }
}

const GetAllFechas = async (req, res) => { 
    try {
        const result = await GetAlquilerFechaInicioFinal(req.params.inicio , req.params.final);

        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message : "Error Al traer los Alquileres Activos"
        });
        
    }
}

export { GetAllAlquilerActivo , GetAlquilerId , GetAlquilerPay , GetAlquilerFechaInicial , GetAllCantidadAlquiler , GetAllFechas };