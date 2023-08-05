import { Service } from "../../common/Service";
import { GeneratorService } from "../../services/generator/GeneratorService";
import { IAdLib } from "../../ts/Interfaces/IAdLibs";

export class GeneratorServiceMock implements Service {
  public saveAdLib(lib: IAdLib) {
    console.log("SAVED AD LIB: ", lib);
    return {
      ...lib,
      _id: "64c6b10c24229d23ff572671",
      createdAt: "2023-07-30T18:50:52.489Z",
      updatedAt: "2023-07-30T18:50:52.489Z",
      __v: 0,
    };
  }
}
