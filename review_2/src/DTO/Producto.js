var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
}
__decorate([
    Expose({ name: "nombre" }),
    Transform(({ obj }) => {
        return /^[a-z A-Z]+$/.test(obj.nombre) ? obj.nombre : false;
    })
], ProductosPost.prototype, "nombre", void 0);
__decorate([
    Expose({ name: "descripcion" }),
    Transform(({ obj }) => {
        return obj.descripcion.toString() ? obj.descripcion : false;
    })
], ProductosPost.prototype, "descripcion", void 0);
__decorate([
    Expose({ name: "estado" }),
    Transform(({ obj }) => {
        return Math.floor(obj.estado) ? obj.estado : 1;
    })
], ProductosPost.prototype, "estado", void 0);
__decorate([
    Expose({ name: "cantidad" }),
    Transform(({ obj }) => {
        return Math.floor(obj.cantidad) ? obj.cantidad : false;
    })
], ProductosPost.prototype, "cantidad", void 0);
