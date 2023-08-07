import { GeneratorController } from "../src/services/generator/GeneratorController";
import { HttpMocker } from "./HttpMocker";

describe("Generator Controller", () => {
  let controller = new GeneratorController();
  let serviceSpy: jest.SpyInstance;
  let vendorSpy: jest.SpyInstance;

  beforeEach(() => {
    serviceSpy = jest
      .spyOn(controller.getService(), "saveAdLib")
      .mockReturnValue(
        Promise.resolve({
          prompt: "Test Prompt",
          text: "I went to the [adjective_1] store to buy some [noun_1]. I couldn't believe the [adjective_2] prices! I ended up leaving with a [noun_2] and a [noun_3]. It was definitely a [adjective_3] shopping experience.",
          numberOfLikes: 0,
          numberOfDislikes: 0,
          numberOfSaves: 0,
          isHidden: false,
          _id: "64ceafdb42ac5736aeff3c3a",
          createdAt: "2023-08-05T20:23:55.465Z",
          updatedAt: "2023-08-05T20:23:55.465Z",
          __v: 0,
        })
      );
    vendorSpy = jest
      .spyOn(controller.getLibVendor(), "createFromPrompt")
      .mockReturnValue(
        Promise.resolve({
          prompt: "Test Prompt",
          text: "I went to the [adjective_1] store to buy some [noun_1]. I couldn't believe the [adjective_2] prices! I ended up leaving with a [noun_2] and a [noun_3]. It was definitely a [adjective_3] shopping experience.",
        })
      );
  });

  describe("generateLib", () => {
    it("Should generate a ad-lib based on a prompt", async () => {
      const req = HttpMocker.mockRequest({
        body: {
          data: {
            prompt: "A dog walking a human",
          },
        },
      });
      const res = HttpMocker.mockResponse();
      const next = HttpMocker.mockNextFunction();
      await controller.generateLib(req, res, next);
      console.log("RES: ", res);
      console.log("UNFORMATTED: ", res._getData());
      const data = res._getJSONData();
      console.log("DATA: ", data);
      expect(data.text).toBeDefined();
      expect(data.prompt).toBeDefined();
      expect(data.numberOfLikes).toBeDefined();
      expect(data.numberOfDislikes).toBeDefined();
      expect(data.numberOfSaves).toBeDefined();
      expect(data.isHidden).toBeDefined();
    });
  });
});
