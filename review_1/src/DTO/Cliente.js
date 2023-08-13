var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Expose, Transform, Type } from "class-transformer";
import { IsDefined } from 'class-validator';
export class Cliente {
    constructor(data) {
        Object.assign(this, data);
        this.nombre_cliente = '';
        this.apellido_cliente = '';
        this.intentificador = 0;
        this.direccion = '';
        this.telefono_cliente = '';
        this.email_cliente = '';
    }
}
__decorate([
    Expose({ name: 'nombre' }),
    IsDefined({ message: () => { throw { status: 422, message: `La nombre es obligatoria` }; } }),
    Transform(({ value }) => value ? value : '')
], Cliente.prototype, "nombre_cliente", void 0);
__decorate([
    Expose({ name: 'apellido' }),
    IsDefined({ message: () => { throw { status: 422, message: `La apellido es obligatoria` }; } }),
    Transform(({ value }) => value ? value : '')
], Cliente.prototype, "apellido_cliente", void 0);
__decorate([
    Expose({ name: 'dni' }),
    Type(() => Number),
    IsDefined({ message: () => { throw { status: 422, message: `La intentificador es obligatoria` }; } }),
    Transform(({ value }) => value ? value : 0)
], Cliente.prototype, "intentificador", void 0);
__decorate([
    Expose({ name: 'direccion' }),
    IsDefined({ message: () => { throw { status: 422, message: `La direccion es obligatoria` }; } }),
    Transform(({ value }) => value ? value : '')
], Cliente.prototype, "direccion", void 0);
__decorate([
    Expose({ name: 'telefono' }),
    IsDefined({ message: () => { throw { status: 422, message: `La telefono es obligatoria` }; } }),
    Type(() => Number),
    Transform(({ value }) => value ? value : '')
], Cliente.prototype, "telefono_cliente", void 0);
__decorate([
    Expose({ name: 'email' }),
    IsDefined({ message: () => { throw { status: 422, message: `La email es obligatoria` }; } }),
    Type(() => Number),
    Transform(({ value }) => value ? value : '')
], Cliente.prototype, "email_cliente", void 0);
