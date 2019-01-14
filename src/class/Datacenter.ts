import { dataCenterDay, dataCenterHour } from '../constant'
import { IProb, IDatacenter, IProbHour, IProbReccurence, ProbHourTable, ProbReccurenceTable } from '../type'
import { Persister } from '.'

export class Datacenter {
  public static get DatacenterHourFromDay(): IDatacenter[] {
    return dataCenterDay.map((weekDays) => ({
      kavh: this.reverse2dArray(weekDays.kavh),
      kwh: this.reverse2dArray(weekDays.kwh),
      kvarh: this.reverse2dArray(weekDays.kvarh)
    }))
  }

  private static defaultProbability: IProb = {
    number: 0,
    frequency: -1
  }

  public static probHour(write: boolean = false) {
    const out: IProbHour[] = []

    dataCenterHour.map((weekDay, dayIndex) => {
      out.push({
        kavh: [],
        kwh: [],
        kvarh: []
      })
      Object.keys(weekDay).map((energyType: string) => {
        weekDay[energyType].map((minuteRanges: number[], minuteIndex) => {
          const parentAddress: ProbHourTable[] = out[dayIndex][energyType]
          parentAddress.push(new Map())
          const address = parentAddress[minuteIndex]
          minuteRanges.map((currentValue) => {
            address.set(currentValue, {
              ...this.defaultProbability,
              number: (address.get(currentValue) ? address.get(currentValue).number : 0) + 1
            })
          })
          this.setFrequencies(address)
        })
      })
    })

    if (write) {
      const toObject = []
      out.map((weekDay, dayIndex) => {
        toObject.push({
          kavh: [],
          kwh: [],
          kvarh: []
        })
        Object.keys(weekDay).map((key) => {
          toObject[dayIndex][key] = weekDay[key].map((a) => this.mapToObject(a))
        })
      })
      Persister.saveFile('probHour.json', JSON.stringify(toObject))
    }

    return out
  }

  public static probReccurence(write = false) {
    const out: IProbReccurence[] = []
    let lastNumber: number

    dataCenterHour.map((weekDay, dayIndex) => {
      out.push({
        kavh: new Map(),
        kwh: new Map(),
        kvarh: new Map()
      })
      Object.keys(weekDay).map((energyType) => {
        const address: ProbReccurenceTable = out[dayIndex][energyType]
        weekDay[energyType].map((day: number[], dayIndex) => {
          day.map((currentValue, valueIndex) => {
            if (lastNumber !== undefined) {
              const nextValue = weekDay[energyType][dayIndex][valueIndex + 1]
              if (nextValue !== undefined) {
                // Initialize the currentValue into the map output if it not
                if (address.get(currentValue) === undefined) {
                  address.set(currentValue, new Map())
                }
      
                // Set the association to the nextValue to 0
                const currentValueMap = address.get(currentValue)
                if (currentValueMap.get(nextValue) === undefined) {
                  currentValueMap.set(nextValue, this.defaultProbability)
                }
      
                // Increment the probabilities
                const probalility = currentValueMap.get(nextValue)
                currentValueMap.set(nextValue, {
                  number: probalility.number + 1,
                  frequency: 0
                })

                this.setFrequencies(currentValueMap)
              }
            }
            lastNumber = currentValue
          })
        })
      })
    })

    if (write) {
      const toObject = []
      out.map((weekDay, dayIndex) => {
        toObject.push({
          kavh: new Map(),
          kwh: new Map(),
          kvarh: new Map()
        })
        Object.keys(weekDay).map((key) => {
          toObject[dayIndex][key] = this.mapToObject(weekDay[key])
        })
      })
      Persister.saveFile('probReccurence.json', JSON.stringify(toObject))
    }

    return out
  }

  /**
   * Reverse a 2d array
   * @param arrayY The array to reverse
   */
  private static reverse2dArray(arrayY: any[][]): any[][] {
    // [ [1, 2], [3, 4] ]
    // BECOME
    // [ [1, 3], [2, 4] ]
    const maxLenght = Math.max(...arrayY.map((arrayX) => arrayX.length))
    const newArray = []
    for (let x = 0; x < maxLenght; x++) {
      for (let y = 0; y < arrayY.length; y++) {
        if (y === 0){
          newArray.push([])
        }
        const newValue = arrayY[y][x]
        newArray[x][y] = newValue || 0
      }
    }
    return newArray
  }

  /**
   * Calculate the frequencies into a map group
   * @param map The probability map
   */
  private static setFrequencies(map: Map<number, IProb>) {
    const total = this.getTotal(map)
    Array.from(map.keys()).map((key) => {
      const value = map.get(key)
      map.set(key, {
        ...value,
        frequency: value.number / total
      })
    })
  }

  /**
   * Calculate the total of number into a map group
   * @param map The probability map
   */
  private static getTotal(map: Map<number, IProb>) {
    return Array.from(map.values()).reduce((prev, curr) => prev + curr.number, 0)
  }

  private static mapToObject(map: Map<any, any>) {
    const out = Object.create(null)
    map.forEach((value, key) => {
      if (value instanceof Map) {
        out[key] = this.mapToObject(value)
      } else {
        out[key] = value
      }
    })
    return out
  }
}
