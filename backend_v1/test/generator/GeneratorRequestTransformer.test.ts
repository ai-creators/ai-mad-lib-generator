import { GeneratorRequestTransformer } from "../../src/services/generator/GeneratorRequestTransformer";
import { HttpMocker } from "../HttpMocker";

describe("Generator Request Transformer", () => {
  describe("transform", () => {
    it("Should throw error when no data has been provided", () => {
      const req = HttpMocker.mockRequest({
        body: {},
      });
      try {
        GeneratorRequestTransformer.transform(req);
      } catch (e: any) {
        expect(e.message).toBe("No data has been provided");
      }
    });

    it("Should transform the data if prompt is undefined", () => {
      const req = HttpMocker.mockRequest({
        body: {
          data: {},
        },
      });
      const data = GeneratorRequestTransformer.transform(req);
      expect(data.prompt).toBe("");
    });

    it("Should transform the data from request", () => {
      const req = HttpMocker.mockRequest({
        body: {
          data: {
            prompt: "Test prompt",
          },
        },
      });
      const data = GeneratorRequestTransformer.transform(req);
      expect(data.prompt).toBe("Test prompt");
    });
  });
});
