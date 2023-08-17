import { Expose, Transform } from "class-transformer";

/* 

    {
        "id_producto": 62,
        "id_bodega": 13,
        "cantidad": 2
    }

*/

export class InventarioPost {

  @Expose({ name: "id_producto" })
  @Transform(({ obj }) => {
    return Math.floor(obj.id_producto) ? obj.id_producto : false;
  })
  id_producto: number;

  @Expose({ name: "id_bodega" })
  @Transform(({ obj }) => {
    return Math.floor(obj.id_bodega) ? obj.id_bodega : false;
  })
  id_bodega: number;


  @Expose({ name: "cantidad" })
  @Transform(({ obj }) => {
    return Math.floor(obj.cantidad) ? obj.cantidad : false;
  })
  cantidad: number;


  
}