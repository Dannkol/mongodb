var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
}
__decorate([
    Expose({ name: "cantidad" }),
    Transform(({ obj }) => {
        return Math.floor(obj.cantidad) ? obj.cantidad : false;
    })
], TrasladoPost.prototype, "cantidad", void 0);
__decorate([
    Expose({ name: "producto" }),
    Transform(({ obj }) => {
        return Math.floor(obj.producto) ? obj.producto : false;
    })
], TrasladoPost.prototype, "producto", void 0);
__decorate([
    Expose({ name: "idBodegaOrigen" }),
    Transform(({ obj }) => {
        return Math.floor(obj.idBodegaOrigen) ? obj.idBodegaOrigen : false;
    })
], TrasladoPost.prototype, "idBodegaOrigen", void 0);
__decorate([
    Expose({ name: "idBodegaDestino" }),
    Transform(({ obj }) => {
        return Math.floor(obj.idBodegaDestino) ? obj.idBodegaDestino : false;
    })
], TrasladoPost.prototype, "idBodegaDestino", void 0);
