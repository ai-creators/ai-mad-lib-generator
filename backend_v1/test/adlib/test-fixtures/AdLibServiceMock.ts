import { IAdLib } from "../../../src/ts/Interfaces/IAdLibs";
import { PaginationResponse } from "../../../src/ts/types/PaginationResponse";

export class AdLibSeviceMock {
  public getLib(adlibId: string): Promise<IAdLib | null> {
    if (adlibId) {
      return Promise.resolve({
        _id: adlibId,
        prompt: "This is a test prompt",
        text: "This is a test [noun] adlib.",
        numberOfLikes: 100,
        numberOfDislikes: 5,
        numberOfSaves: 10,
        isHidden: false,
        isPG: true,
      });
    }
    return Promise.resolve(null);
  }

  public getLibs(
    timestamp: Date,
    page: number,
    pagination: number,
    isPG: boolean = true
  ): void {}
}
