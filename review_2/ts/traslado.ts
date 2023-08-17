import { Expose, Transform } from "class-transformer";

/* 

    {
        "cantidad"  : 2,
        "producto" : 12,
        "idBodegaOrigen" : 11,
        "idBodegaDestino" : 12
    }

*/

export class TrasladoPost {

    @Expose({ name: "cantidad" })
    @Transform(({ obj }) => {
      return Math.floor(obj.cantidad) ? obj.cantidad : false;
    })
    cantidad: number;
  
    @Expose({ name: "producto" })
    @Transform(({ obj }) => {
      return Math.floor(obj.producto) ? obj.producto : false;
    })
    producto: number;
  
    @Expose({ name: "idBodegaOrigen" })
    @Transform(({ obj }) => {
      return Math.floor(obj.idBodegaOrigen) ? obj.idBodegaOrigen : false;
    })
    idBodegaOrigen: number;

    @Expose({ name: "idBodegaDestino" })
    @Transform(({ obj }) => {
      return Math.floor(obj.idBodegaDestino) ? obj.idBodegaDestino : false;
    })
    idBodegaDestino: number;
    
}