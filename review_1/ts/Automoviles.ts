import { Expose, Transform, Type } from "class-transformer";
import { IsDefined } from 'class-validator';

export class Automovil {

    @Expose({ name: 'marca' })
    @IsDefined({ message: () => { throw { status: 422, message: `La marca es obligatoria` } } })
    @Transform(({ value }) => value ? value : "")
    marca: string;

    @Expose({ name: 'modelo' })
    @Type(() => Number) 
    @IsDefined({ message: () => { throw { status: 422, message: `La modelo es obligatoria` } } })
    @Transform(({ value }) => value ? value : 0)
    modelo: number;

    @Expose({ name: 'anio' })
    @Type(() => Number) 
    @IsDefined({ message: () => { throw { status: 422, message: `La year es obligatoria` } } })
    @Transform(({ value }) => value ? value : 0)
    year: number;

    @Expose({ name: 'tipo' })
    @IsDefined({ message: () => { throw { status: 422, message: `La tipo es obligatoria` } } })
    @Transform(({ value }) => value ? value : '') 
    tipo: string;

    @Expose({ name: 'capacidad' })
    @Type(() => Number) 
    @IsDefined({ message: () => { throw { status: 422, message: `La capacidad es obligatoria` } } })
    @Transform(({ value }) => value ? value : 0) 
    capacidad: number;

    @Expose({ name: 'precio_diario' })
    @Type(() => Number) 
    @IsDefined({ message: () => { throw { status: 422, message: `La precio_diario es obligatoria` } } })
    @Transform(({ value }) => value ? value : 0) 
    precio_diario: number;


    constructor(data: Partial<Automovil>) {
        Object.assign(this, data);

        this.marca = '';
        this.modelo = 0;
        this.year = 0;
        this.tipo = '';
        this.capacidad = 0;
        this.precio_diario = 0;

    }
}
