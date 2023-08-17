import { Expose, Transform, Type } from "class-transformer";
import { IsDefined } from 'class-validator';

export class DTOBodegas {

    @Expose({ name: 'nombre' })
    @IsDefined({ message: "El nombre es obligatorio" }) // Mensaje personalizado
    nombre: string;
    
    @Expose({ name: 'id_responsable' })
    @IsDefined({ message: "El id_responsable es obligatorio" }) // Mensaje personalizado

    id_responsable: number;
    
    @Expose({ name: 'estado' })
    @Type(() => Number) 
    @IsDefined({ message: "El estado es obligatorio" }) // Mensaje personalizado
    @Transform(({ value }) => value ? value : 1)
    estado: number;
    

}
