import { AdLibRequestTransformer } from "../../src/services/adlib/AdLibRequestTransformer";
import { HttpMocker } from "../HttpMocker";

describe("AdLib Request Transformer", () => {
  describe("transform", () => {
    it("Should transform the request and return the correct data structure", () => {
      const req = HttpMocker.mockRequest({
        query: {
          page: 1,
          timestamp: "2023-07-01",
          pagination: 10,
          rating: "pg",
        },
      });
      const transformer = new AdLibRequestTransformer();
      const data = transformer.transform(req);
      expect(data.timestamp).toBeDefined;
      expect(data.page).toBeDefined;
      expect(data.pagination).toBeDefined;
      expect(data.page).toEqual(1);
      expect(data.pagination).toEqual(10);
      expect(data.isPG).toEqual(true);
    });

    it("Should set isPG to false if it's not pg", () => {
      const req = HttpMocker.mockRequest({
        query: {
          page: 1,
          timestamp: "2023-07-01",
          pagination: 10,
          rating: "nsfw",
        },
      });
      const transformer = new AdLibRequestTransformer();
      const data = transformer.transform(req);
      expect(data.isPG).toEqual(false);
    });

    it("Should set isPG to true if it's pg", () => {
      const req = HttpMocker.mockRequest({
        query: {
          page: 1,
          timestamp: "2023-07-01",
          pagination: 10,
          rating: "pg",
        },
      });
      const transformer = new AdLibRequestTransformer();
      const data = transformer.transform(req);
      expect(data.isPG).toEqual(true);
    });
  });
});
