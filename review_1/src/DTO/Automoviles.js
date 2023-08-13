var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Expose, Transform, Type } from "class-transformer";
import { IsDefined } from 'class-validator';
export class Automovil {
    constructor(data) {
        Object.assign(this, data);
        this.marca = '';
        this.modelo = 0;
        this.year = 0;
        this.tipo = '';
        this.capacidad = 0;
        this.precio_diario = 0;
    }
}
__decorate([
    Expose({ name: 'marca' }),
    IsDefined({ message: () => { throw { status: 422, message: `La marca es obligatoria` }; } }),
    Transform(({ value }) => value ? value : "")
], Automovil.prototype, "marca", void 0);
__decorate([
    Expose({ name: 'modelo' }),
    Type(() => Number),
    IsDefined({ message: () => { throw { status: 422, message: `La modelo es obligatoria` }; } }),
    Transform(({ value }) => value ? value : 0)
], Automovil.prototype, "modelo", void 0);
__decorate([
    Expose({ name: 'anio' }),
    Type(() => Number),
    IsDefined({ message: () => { throw { status: 422, message: `La year es obligatoria` }; } }),
    Transform(({ value }) => value ? value : 0)
], Automovil.prototype, "year", void 0);
__decorate([
    Expose({ name: 'tipo' }),
    IsDefined({ message: () => { throw { status: 422, message: `La tipo es obligatoria` }; } }),
    Transform(({ value }) => value ? value : '')
], Automovil.prototype, "tipo", void 0);
__decorate([
    Expose({ name: 'capacidad' }),
    Type(() => Number),
    IsDefined({ message: () => { throw { status: 422, message: `La capacidad es obligatoria` }; } }),
    Transform(({ value }) => value ? value : 0)
], Automovil.prototype, "capacidad", void 0);
__decorate([
    Expose({ name: 'precio_diario' }),
    Type(() => Number),
    IsDefined({ message: () => { throw { status: 422, message: `La precio_diario es obligatoria` }; } }),
    Transform(({ value }) => value ? value : 0)
], Automovil.prototype, "precio_diario", void 0);
