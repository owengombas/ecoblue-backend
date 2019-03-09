"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Model_1 = require("../Model");
let FetchModel = class FetchModel extends Model_1.Model {
    constructor(value) {
        super();
        this._date = new Date();
        this._value = value;
    }
    get Date() {
        return this._date;
    }
    set Date(date) {
        this._date = date;
    }
    get Value() {
        return this._value;
    }
    set Value(value) {
        this._value = value;
    }
};
__decorate([
    typeorm_1.Column({
        name: "date",
        type: "date"
    }),
    __metadata("design:type", Date)
], FetchModel.prototype, "_date", void 0);
__decorate([
    typeorm_1.Column({
        name: "date",
        type: "json"
    }),
    __metadata("design:type", Object)
], FetchModel.prototype, "_value", void 0);
FetchModel = __decorate([
    typeorm_1.Entity({
        name: "fetchs"
    }),
    __metadata("design:paramtypes", [Object])
], FetchModel);
exports.FetchModel = FetchModel;
//# sourceMappingURL=FetcherModelDeprecated.js.map