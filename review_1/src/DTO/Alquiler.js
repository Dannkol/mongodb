var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Expose, Transform, Type } from "class-transformer";
import { IsDefined } from 'class-validator';
export class Alquiler {
    constructor(data) {
        Object.assign(this, data);
        this.fecha_inicio = new Date("2023-08-12T21:47:26.006Z");
        this.fecha_fin = new Date("2023-08-12T21:47:26.006Z");
        this.total = 0;
        this.estado = 0;
        this.cliente = 0;
        this.automovil = 0;
    }
}
__decorate([
    Expose({ name: 'fecha_inicio' }),
    IsDefined({ message: () => { throw { status: 422, message: `La fecha_inicio es obligatoria` }; } }),
    Transform(({ value }) => value ? value : new Date("2023-08-12T21:47:26.006Z"))
], Alquiler.prototype, "fecha_inicio", void 0);
__decorate([
    Expose({ name: 'fecha_fin' }),
    IsDefined({ message: () => { throw { status: 422, message: `La fecha_fin es obligatoria` }; } }),
    Transform(({ value }) => value ? value : new Date("2023-08-12T21:47:26.006Z"))
], Alquiler.prototype, "fecha_fin", void 0);
__decorate([
    Expose({ name: 'costo_total' }),
    Type(() => Number),
    IsDefined({ message: () => { throw { status: 422, message: `La costo_total es obligatoria` }; } }),
    Transform(({ value }) => value ? value : 0)
], Alquiler.prototype, "total", void 0);
__decorate([
    Expose({ name: 'estado' }),
    IsDefined({ message: () => { throw { status: 422, message: `La estado es obligatoria` }; } }),
    Transform(({ value }) => value ? value : 0)
], Alquiler.prototype, "estado", void 0);
__decorate([
    Expose({ name: 'id_cliente' }),
    Type(() => Number),
    Transform(({ value }) => value ? value : 0)
], Alquiler.prototype, "cliente", void 0);
__decorate([
    Expose({ name: 'id_automovil' }),
    Type(() => Number) // Indicar que es de tipo Number
    ,
    Transform(({ value }) => value ? value : 0)
], Alquiler.prototype, "automovil", void 0);
