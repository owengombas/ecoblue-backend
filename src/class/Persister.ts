
import { writeFile } from 'fs'
import { join } from 'path'

export class Persister {
  public static persist(datas: any) {
    console.log('Persisting...', datas)
  }

  public static saveFile(filename: string, data: any)
  public static saveFile(filename: string, data: any, path: string)
  public static saveFile(filename: string, data: any, path?: string) {
    const filePath = path || join(__dirname, '..', 'data', filename)
    writeFile(filePath, data, () => {
      console.log(`${filePath} saved`)
    })
  }
}
