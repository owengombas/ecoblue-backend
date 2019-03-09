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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const rakkit_1 = require("rakkit");
const rxjs_1 = require("rxjs");
const models_1 = require("../models");
const constant_1 = require("../constant");
let FetcherService = class FetcherService {
    constructor() {
        this._fetchSubject = new rxjs_1.Subject();
        this._requests = [
            constant_1.nextThinkRequest()
        ];
        // Timing.tickSubject.subscribe(
        //   this.execute.bind(this)
        // );
    }
    get FetchSubject() {
        return this._fetchSubject;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allRes = yield Promise.all(this._requests.map((request) => request.execute()));
                allRes.map((res) => __awaiter(this, void 0, void 0, function* () {
                    if (res.data) {
                        const fetch = new models_1.FetchModel(res.data);
                        yield fetch.save();
                        this._fetchSubject.next(res);
                    }
                }));
            }
            catch (err) {
                console.log(err);
                this._fetchSubject.error({
                    message: "Request error",
                    datas: this._requests.map((request) => request.Url)
                });
            }
        });
    }
};
FetcherService = __decorate([
    rakkit_1.Service(),
    __metadata("design:paramtypes", [])
], FetcherService);
exports.FetcherService = FetcherService;
//# sourceMappingURL=FetcherService.js.map