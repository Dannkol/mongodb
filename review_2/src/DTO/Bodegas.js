var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Expose, Transform, Type } from "class-transformer";
import { IsDefined } from 'class-validator';
export class DTOBodegas {
}
__decorate([
    Expose({ name: 'nombre' }),
    IsDefined({ message: "El nombre es obligatorio" }) // Mensaje personalizado
], DTOBodegas.prototype, "nombre", void 0);
__decorate([
    Expose({ name: 'id_responsable' }),
    IsDefined({ message: "El id_responsable es obligatorio" }) // Mensaje personalizado
], DTOBodegas.prototype, "id_responsable", void 0);
__decorate([
    Expose({ name: 'estado' }),
    Type(() => Number),
    IsDefined({ message: "El estado es obligatorio" }) // Mensaje personalizado
    ,
    Transform(({ value }) => value ? value : 1)
], DTOBodegas.prototype, "estado", void 0);
