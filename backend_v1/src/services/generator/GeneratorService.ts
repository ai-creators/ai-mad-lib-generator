import AdLib from "../../db/models/AdLibModel";
import { IAdLib } from "../../ts/Interfaces/IAdLibs";

export class GeneratorService {
  public saveAdLib(lib: IAdLib) {
    return AdLib.create(lib);
  }
}
