import { Expose, Transform, Type } from "class-transformer";
import { IsDefined } from 'class-validator';

export class Cliente {

    @Expose({ name: 'nombre' })
    @IsDefined({ message: () => { throw { status: 422, message: `La nombre es obligatoria` } } })
    @Transform(({ value }) => value ? value : '')
    nombre_cliente: string;

    @Expose({ name: 'apellido' })
    @IsDefined({ message: () => { throw { status: 422, message: `La apellido es obligatoria` } } })
    @Transform(({ value }) => value ? value : '')
    apellido_cliente: string;

    @Expose({ name: 'dni' })
    @Type(() => Number) 
    @IsDefined({ message: () => { throw { status: 422, message: `La intentificador es obligatoria` } } })
    @Transform(({ value }) => value ? value : 0)
    intentificador: number;

    @Expose({ name: 'direccion' })
    @IsDefined({ message: () => { throw { status: 422, message: `La direccion es obligatoria` } } })
    @Transform(({ value }) => value ? value : '') 
    direccion: string;

    @Expose({ name: 'telefono' })
    @IsDefined({ message: () => { throw { status: 422, message: `La telefono es obligatoria` } } })
    @Type(() => Number) 
    @Transform(({ value }) => value ? value : '') 
    telefono_cliente: string;

    @Expose({ name: 'email' })
    @IsDefined({ message: () => { throw { status: 422, message: `La email es obligatoria` } } })
    @Type(() => Number) 
    @Transform(({ value }) => value ? value : '') 
    email_cliente: string;

    constructor(data: Partial<Cliente>) {
        Object.assign(this, data);

        this.nombre_cliente = '';
        this.apellido_cliente = '';
        this.intentificador = 0;
        this.direccion = '';
        this.telefono_cliente = '';
        this.email_cliente = '';

    }
}
