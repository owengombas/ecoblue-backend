import { writeFile } from "fs";
import { join } from "path";

export class Persister {
  static persist(datas: any) {
    console.log("Persisting...", datas);
  }

  static saveFile(filename: string, data: any);
  static saveFile(filename: string, data: any, path: string);
  static saveFile(filename: string, data: any, path?: string) {
    const filePath = path || join(__dirname, "..", "data", filename);
    writeFile(filePath, data, () => {
      console.log(`${filePath} saved`);
    });
  }
}
