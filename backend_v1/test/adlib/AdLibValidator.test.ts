import { AdLibValidator } from "../../src/services/adlib/AdLibValidator";
import { IAdLib } from "../../src/ts/Interfaces/IAdLibs";

describe("AdLibValidator", () => {
  let validator = new AdLibValidator();
  let serviceGetLibSpy: jest.SpyInstance;
  beforeAll(() => {
    serviceGetLibSpy = jest
      .spyOn(validator.getAdlibService(), "getLib")
      .mockImplementation((adlibId: string): Promise<IAdLib | null> => {
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
      });
  });
});
