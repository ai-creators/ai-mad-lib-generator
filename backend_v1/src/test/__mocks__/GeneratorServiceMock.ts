import { GeneratorService } from "../../services/generator/GeneratorService";

export class GeneratorServiceMock extends GeneratorService {
  public saveAdLib(lib: IAdLib) {
    return AdLib.create(lib);
  }
}
