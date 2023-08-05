import { Service } from "../../common/Service";
import AdLib from "../../db/models/AdLibModel";
import { IAdLib } from "../../ts/Interfaces/IAdLibs";

export class GeneratorService implements Service {
  public saveAdLib(lib: IAdLib) {
    return AdLib.create(lib);
  }
}
