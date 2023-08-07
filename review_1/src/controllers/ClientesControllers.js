import { GetAll, GetReservaPendientes, GetDNI } from "../models/Clientes.js";

const GetAllClients =  async (req, res) => {
    try {
        
        const result = await GetAll();

        res.status(200).json(result);

    } catch (error) {
        console.log(error);
        res.status(404).json({
            message : "Error Al traer los clientes"
        });
    }
}

const GetReservaPendientesCliente =  async (req, res) => {
    try {
        
        const result = await GetReservaPendientes();

        res.status(200).json(result);

    } catch (error) {
        console.log(error);
        res.status(404).json({
            message : "Error Al traer los clientes"
        });
    }
}

const GetClienteDni =  async (req, res) => {
    try {
        
        const result = await GetDNI(req.params.dni);

        res.status(200).json(result);

    } catch (error) {
        console.log(error);
        res.status(404).json({
            message : "Error Al traer los clientes"
        });
        throw Error;
    }
}

export { GetAllClients , GetReservaPendientesCliente , GetClienteDni }