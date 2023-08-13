import { Expose, Transform, Type } from "class-transformer";
import { IsDefined } from 'class-validator';

export class Alquiler {

    @Expose({ name: 'fecha_inicio' })
    @IsDefined({ message: () => { throw { status: 422, message: `La fecha_inicio es obligatoria` } } })
    @Transform(({ value }) => value ? value : new Date("2023-08-12T21:47:26.006Z"))
    fecha_inicio: Date;

    @Expose({ name: 'fecha_fin' })
    @IsDefined({ message: () => { throw { status: 422, message: `La fecha_fin es obligatoria` } } })
    @Transform(({ value }) => value ? value : new Date("2023-08-12T21:47:26.006Z"))
    fecha_fin: Date;

    @Expose({ name: 'costo_total' })
    @Type(() => Number) 
    @IsDefined({ message: () => { throw { status: 422, message: `La costo_total es obligatoria` } } })
    @Transform(({ value }) => value ? value : 0)
    total: number;

    @Expose({ name: 'estado' })
    @IsDefined({ message: () => { throw { status: 422, message: `La estado es obligatoria` } } })
    @Transform(({ value }) => value ? value : 0) 
    estado: number;

    @Expose({ name: 'id_cliente' })
    @Type(() => Number) 
    @Transform(({ value }) => value ? value : 0) 
    cliente: number;

    @Expose({ name: 'id_automovil' })
    @Type(() => Number) // Indicar que es de tipo Number
    @Transform(({ value }) => value ? value : 0) 
    automovil: number;

    constructor(data: Partial<Alquiler>) {
        Object.assign(this, data);

        this.fecha_inicio = new Date("2023-08-12T21:47:26.006Z");
        this.fecha_fin = new Date("2023-08-12T21:47:26.006Z");
        this.total = 0;
        this.estado = 0;
        this.cliente = 0;
        this.automovil = 0;

    }
}
