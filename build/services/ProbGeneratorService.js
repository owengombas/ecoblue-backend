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
const constant_1 = require("../constant");
const class_1 = require("../class");
const models_1 = require("../models");
const typeorm_1 = require("typeorm");
let ProbGeneratorService = class ProbGeneratorService {
    constructor() {
        this._reccurenceWeight = 1 / 50;
        this._prevLastElement = new models_1.ProbElementModel(class_1.Timing.unitPerDay - 1, 0, 0);
        class_1.Timing.newDaySubject.subscribe(this.execute.bind(this));
    }
    get Values() {
        return [
            this._prevLastElement.Getable,
            ...this._computed.map((value) => value.Getable)
        ];
    }
    GenerateDay(dayIndex) {
        let correctedDayIndex = Math.abs(dayIndex);
        const rawWeekNumber = correctedDayIndex / 7;
        const weekNumber = Number.isInteger(rawWeekNumber) ? rawWeekNumber - 1 : Math.floor(rawWeekNumber);
        correctedDayIndex = (correctedDayIndex - weekNumber * 7) - 1;
        const dayProb = constant_1.probHour[correctedDayIndex];
        const out = {
            kvah: [],
            kwh: [],
            kvarh: []
        };
        const realEnergy = ["kwh"];
        for (let hour = 0; hour < class_1.Timing.unitPerDay; hour++) {
            realEnergy.map((energyType) => {
                const energyOut = out[energyType];
                const energyHourProb = dayProb[energyType][hour];
                let flatProbs = Object.keys(energyHourProb).map((key) => {
                    const hourProbs = energyHourProb[key];
                    return Object.assign({ value: Number(key), day: correctedDayIndex, energyType,
                        hour }, hourProbs);
                });
                const lastOut = energyOut[energyOut.length - 1];
                if (lastOut > 0) {
                    const reccurenceProbs = constant_1.probReccurence[correctedDayIndex][energyType][lastOut];
                    let totalNumberProbs = 0;
                    flatProbs = flatProbs.map((prob) => {
                        const incrementValue = reccurenceProbs[String(prob.value)];
                        if (incrementValue) {
                            prob.number += incrementValue.number * this._reccurenceWeight;
                        }
                        totalNumberProbs += prob.number;
                        return prob;
                    });
                    flatProbs.map((prob) => {
                        prob.frequency = prob.number / totalNumberProbs;
                        return prob;
                    });
                }
                const random = Math.random();
                let increment = 0;
                for (const prob of flatProbs) {
                    increment += prob.frequency;
                    if (random <= increment) {
                        energyOut.push(prob.value);
                        break;
                    }
                }
            });
        }
        // Calculate kVAh
        for (let i = 0; i <= class_1.Timing.unitPerDay; i++) {
            out.kvah.push(Math.sqrt(Math.pow(out.kvarh[i], 2) + Math.pow(out.kwh[i], 2)));
        }
        return out;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const existingProb = yield models_1.ProbModel.findOne({
                where: {
                    Date: class_1.Timing.today
                }
            });
            if (this._totalGenerated === undefined) {
                const previousProb = yield models_1.ProbModel.findOne({
                    where: {
                        Date: typeorm_1.LessThan(class_1.Timing.today)
                    },
                    order: {
                        Date: -1
                    }
                });
                if (previousProb) {
                    this._totalGenerated = previousProb.Values[previousProb.Values.length - 1].Value;
                    this._prevLastElement = this.last(previousProb.Values);
                }
                else {
                    this._totalGenerated = 0;
                }
            }
            if (!existingProb) {
                console.log(class_1.Timing.currentDayIndex);
                this._generated = this.GenerateDay(class_1.Timing.currentDayIndex).kwh;
                this._computed = this.compute(this._generated, this._totalGenerated);
                this._totalGenerated = this.sumEnergy(this._generated);
                const prob = new models_1.ProbModel();
                prob.Values = this._computed.map((value) => {
                    value.Prob = prob;
                    return value;
                });
                yield prob.save();
            }
            else {
                this._generated = [];
                this._computed = existingProb.Values;
                this._totalGenerated = this.last(existingProb.Values).Value;
            }
            this._prevLastElement.Slope = this.computeSlope(this._prevLastElement.Value, this._computed[0].Value);
            yield this._prevLastElement.save();
        });
    }
    sumEnergy(values) {
        return values.reduce((total, value) => {
            return total + value;
        }, 0);
    }
    compute(values, base) {
        let lastComputed = new models_1.ProbElementModel(0, 0, base);
        return values.map((value, index) => {
            // y = ax + b
            const newValue = value + lastComputed.Value;
            const nextElement = values[index + 1];
            const nextValue = nextElement ? (nextElement + newValue) : newValue;
            const y = this.computeSlope(newValue, nextValue);
            lastComputed = new models_1.ProbElementModel(index, y, newValue);
            return lastComputed;
        });
    }
    computeSlope(value, nextValue) {
        return nextValue - value;
    }
    last(arr) {
        return arr[arr.length - 1];
    }
};
ProbGeneratorService = __decorate([
    rakkit_1.Service(),
    __metadata("design:paramtypes", [])
], ProbGeneratorService);
exports.ProbGeneratorService = ProbGeneratorService;
//# sourceMappingURL=ProbGeneratorService.js.map