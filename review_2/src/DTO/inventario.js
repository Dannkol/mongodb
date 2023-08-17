var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Expose, Transform } from "class-transformer";
/*

    {
        "id_producto": 62,
        "id_bodega": 13,
        "cantidad": 2
    }

*/
export class InventarioPost {
}
__decorate([
    Expose({ name: "id_producto" }),
    Transform(({ obj }) => {
        return Math.floor(obj.id_producto) ? obj.id_producto : false;
    })
], InventarioPost.prototype, "id_producto", void 0);
__decorate([
    Expose({ name: "id_bodega" }),
    Transform(({ obj }) => {
        return Math.floor(obj.id_bodega) ? obj.id_bodega : false;
    })
], InventarioPost.prototype, "id_bodega", void 0);
__decorate([
    Expose({ name: "cantidad" }),
    Transform(({ obj }) => {
        return Math.floor(obj.cantidad) ? obj.cantidad : false;
    })
], InventarioPost.prototype, "cantidad", void 0);
