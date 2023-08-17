import { Translado } from "../models/translado.js";

export class ControllerTranslado extends Translado {
    static async PostTranslado(req , res) {
        const result = await Translado.Translado(req.body);
        res.status(200).json(result);
    }
}