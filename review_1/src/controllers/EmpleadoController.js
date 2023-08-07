import { GetVendedor , GetGerenAssi} from "../models/Empleados.js";

const GetEmpleadoVendedor =  async (req, res) => {
    try {
        
        const result = await GetVendedor();

        res.status(200).json(result);

    } catch (error) {
        console.log(error);
        res.status(404).json({
            message : "Error Al traer los Alquileres Activos"
        });

    }
}

const GetEmpleadoGerenteAssistente =  async (req, res) => {
    try {
        
        const result = await GetGerenAssi();

        res.status(200).json(result);

    } catch (error) {
        console.log(error);
        res.status(404).json({
            message : "Error Al traer los Alquileres Activos"
        });

    }
}

export { GetEmpleadoVendedor , GetEmpleadoGerenteAssistente }