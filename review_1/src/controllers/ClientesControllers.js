import { GetAll, GetReservaPendientes, GetDNI , getClientResvas , GetClientesAlquiler } from "../models/Clientes.js";

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

    }
}

const GetClienteRservasId =  async (req, res) => {
    try {
        
        const result = await getClientResvas(req.params.id);

        res.status(200).json(result);

    } catch (error) {
        console.log(error);
        res.status(404).json({
            message : "Error Al traer los clientes"
        });

    }
}

const GetAllClientsAlquiler =  async (req, res) => {
    try {
        console.log('holsa');
        
        const result = await GetClientesAlquiler();

        res.status(200).json(result);

    } catch (error) {
        console.log(error);
        res.status(404).json({
            message : "Error Al traer los clientes"
        });

    }
}

export { GetAllClients , GetReservaPendientesCliente , GetClienteDni , GetClienteRservasId , GetAllClientsAlquiler }