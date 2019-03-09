"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constant_1 = require("../constant");
class Datacenter {
    static get DatacenterHourFromDay() {
        return constant_1.dataCenterDay.map((weekDays) => ({
            kvah: this.reverse2dArray(weekDays.kvah),
            kwh: this.reverse2dArray(weekDays.kwh),
            kvarh: this.reverse2dArray(weekDays.kvarh)
        }));
    }
    static probHour(write = false) {
        const out = [];
        constant_1.dataCenterHour.map((weekDay, dayIndex) => {
            out.push({
                kvah: [],
                kwh: [],
                kvarh: []
            });
            Object.keys(weekDay).map((energyType) => {
                weekDay[energyType].map((minuteRanges, minuteIndex) => {
                    const parentAddress = out[dayIndex][energyType];
                    parentAddress.push(new Map());
                    const address = parentAddress[minuteIndex];
                    minuteRanges.map((currentValue) => {
                        address.set(currentValue, Object.assign({}, this.defaultProbability, { number: (address.get(currentValue) ? address.get(currentValue).number : 0) + 1 }));
                    });
                    this.setFrequencies(address);
                });
            });
        });
        if (write) {
            const toObject = [];
            out.map((weekDay, dayIndex) => {
                toObject.push({
                    kvah: [],
                    kwh: [],
                    kvarh: []
                });
                Object.keys(weekDay).map((key) => {
                    toObject[dayIndex][key] = weekDay[key].map((a) => this.mapToObject(a));
                });
            });
        }
        return out;
    }
    static probReccurence(write = false) {
        const out = [];
        let lastNumber;
        constant_1.dataCenterDay.map((weekDay, dayIndex) => {
            out.push({
                kvah: new Map(),
                kwh: new Map(),
                kvarh: new Map()
            });
            Object.keys(weekDay).map((energyType) => {
                const address = out[dayIndex][energyType];
                weekDay[energyType].map((day, dayIndex) => {
                    day.map((currentValue, valueIndex) => {
                        if (lastNumber !== undefined) {
                            const nextValue = weekDay[energyType][dayIndex][valueIndex + 1];
                            if (nextValue !== undefined) {
                                // Initialize the currentValue into the map output if it not
                                if (address.get(currentValue) === undefined) {
                                    address.set(currentValue, new Map());
                                }
                                // Set the association to the nextValue to 0
                                const currentValueMap = address.get(currentValue);
                                if (currentValueMap.get(nextValue) === undefined) {
                                    currentValueMap.set(nextValue, this.defaultProbability);
                                }
                                // Increment the probabilities
                                const probalility = currentValueMap.get(nextValue);
                                currentValueMap.set(nextValue, {
                                    number: probalility.number + 1,
                                    frequency: 0
                                });
                                this.setFrequencies(currentValueMap);
                            }
                        }
                        lastNumber = currentValue;
                    });
                });
            });
        });
        if (write) {
            const toObject = [];
            out.map((weekDay, dayIndex) => {
                toObject.push({
                    kvah: new Map(),
                    kwh: new Map(),
                    kvarh: new Map()
                });
                Object.keys(weekDay).map((key) => {
                    toObject[dayIndex][key] = this.mapToObject(weekDay[key]);
                });
            });
        }
        return out;
    }
    /**
     * Reverse a 2d array
     * @param arrayY The array to reverse
     */
    static reverse2dArray(arrayY) {
        // [ [1, 2], [3, 4] ]
        // BECOME
        // [ [1, 3], [2, 4] ]
        const maxLenght = Math.max(...arrayY.map((arrayX) => arrayX.length));
        const newArray = [];
        for (let x = 0; x < maxLenght; x++) {
            for (let y = 0; y < arrayY.length; y++) {
                if (y === 0) {
                    newArray.push([]);
                }
                const newValue = arrayY[y][x];
                newArray[x][y] = newValue || 0;
            }
        }
        return newArray;
    }
    /**
     * Calculate the frequencies into a map group
     * @param map The probability map
     */
    static setFrequencies(map) {
        const total = this.getTotal(map);
        Array.from(map.keys()).map((key) => {
            const value = map.get(key);
            map.set(key, Object.assign({}, value, { frequency: value.number / total }));
        });
    }
    /**
     * Calculate the total of number into a map group
     * @param map The probability map
     */
    static getTotal(map) {
        return Array.from(map.values()).reduce((prev, curr) => prev + curr.number, 0);
    }
    static mapToObject(map) {
        const out = Object.create(null);
        map.forEach((value, key) => {
            if (value instanceof Map) {
                out[key] = this.mapToObject(value);
            }
            else {
                out[key] = value;
            }
        });
        return out;
    }
}
Datacenter.defaultProbability = {
    number: 0,
    frequency: -1
};
exports.Datacenter = Datacenter;
//# sourceMappingURL=Datacenter.js.map