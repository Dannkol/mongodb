import { Expose, Transform } from "class-transformer";

/* 

{
  "nombre": "arroz", String
  "descripcion": "Arroz Blanco", String
  "estado": 1, number
  "cantidad": 10 numbers
}

*/

export class ProductosPost {
    
  @Expose({ name: "nombre" })
  @Transform(({ obj }) => {
    return /^[a-z A-Z]+$/.test(obj.nombre) ? obj.nombre : false;
  })
  nombre: string;

  @Expose({ name: "descripcion" })
  @Transform(({ obj }) => {
    return obj.descripcion.toString() ? obj.descripcion : false;
  })
  descripcion: string;

  @Expose({ name: "estado" })
  @Transform(({ obj }) => {
    return Math.floor(obj.estado) ? obj.estado : 1 ;
  })
  estado: number;

  @Expose({ name: "cantidad" })
  @Transform(({ obj }) => {
    return Math.floor(obj.cantidad) ? obj.cantidad : false;
  })
  cantidad: number;

}