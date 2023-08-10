import dayjs from "dayjs";
import { AdLibController } from "../../src/services/adlib/AdLibController";
import { HttpMocker } from "../HttpMocker";
import { MAX_PAGINATION } from process.env;

describe("AdLib Controller", () => {
  let controller = new AdLibController();
  let serviceGetLibsSpy: jest.SpyInstance;
  let serviceGetLibsByCreatedAtSpy: jest.SpyInstance;
  let getLibsByFeaturedSpy: jest.SpyInstance;
  let serviceGetLibsByNewestSpy: jest.SpyInstance;
  beforeEach(() => {
    serviceGetLibsSpy = jest
      .spyOn(controller.getService(), "getLibs")
      .mockReturnValue(
        Promise.resolve({
          results: [
            {
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
            },
            {
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
            },
          ],
          page: 1,
          pagination: 10,
          totalPages: 1,
        })
      );

    serviceGetLibsByCreatedAtSpy = jest
      .spyOn(controller.getService(), "getLibs")
      .mockReturnValue(
        Promise.resolve({
          results: [
            {
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
            },
            {
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
            },
          ],
          page: 1,
          pagination: 10,
          totalPages: 1,
        })
      );

    getLibsByFeaturedSpy = jest
      .spyOn(controller.getService(), "getLibs")
      .mockReturnValue(
        Promise.resolve({
          results: [
            {
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
            },
            {
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
            },
          ],
          page: 1,
          pagination: 10,
          totalPages: 1,
        })
      );

    serviceGetLibsByNewestSpy = jest
      .spyOn(controller.getService(), "getLibs")
      .mockReturnValue(
        Promise.resolve({
          results: [
            {
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
            },
            {
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
            },
          ],
          page: 1,
          pagination: 10,
          totalPages: 1,
        })
      );
  });

  describe("getLibs", () => {
    it("Should return the proper error if no timestamp has been provided", async () => {
      const req = HttpMocker.mockRequest({
        method: "Get",
        params: {
          page: 1,
          pagination: 10,
        },
      });
      const res = HttpMocker.mockResponse();
      const next = HttpMocker.mockNextFunction();
      const expectedMessage =
        "These properties are not valid: timestamp: Timestamp is required";
      const expectedStatus = 400;
      try {
        await controller.getLibs(req, res, next);
      } catch (e: any) {
        expect(e.message).toBe(expectedMessage);
        expect(e.status).toBe(expectedStatus);
      }
    });

    it("Should return the proper error if timestamp is not a valid date", async () => {
      const req = HttpMocker.mockRequest({
        method: "Get",
        params: {
          timestamp: "this is not a data",
          page: 1,
          pagination: 10,
        },
      });
      const res = HttpMocker.mockResponse();
      const next = HttpMocker.mockNextFunction();
      const expectedMessage =
        "These properties are not valid: timestamp: Timestamp is required";
      const expectedStatus = 400;
      try {
        await controller.getLibs(req, res, next);
      } catch (e: any) {
        expect(e.message).toBe(expectedMessage);
        expect(e.status).toBe(expectedStatus);
      }
    });

    it("Should return the proper error if timestamp is in the future", async () => {
      const currentDate: Date = new Date();
      const futureDate: Date = new Date(currentDate);
      futureDate.setDate(currentDate.getDate() + 3);
      const req = HttpMocker.mockRequest({
        method: "Get",
        params: {
          timestamp: futureDate,
          page: 1,
          pagination: 10,
        },
      });
      const res = HttpMocker.mockResponse();
      const next = HttpMocker.mockNextFunction();
      const expectedMessage =
        "These properties are not valid: timestamp: Timestamp is in the future";
      const expectedStatus = 400;
      try {
        await controller.getLibs(req, res, next);
      } catch (e: any) {
        expect(e.message).toBe(expectedMessage);
        expect(e.status).toBe(expectedStatus);
      }
    });

    it("Should return the proper error if page is not defined", async () => {
      const req = HttpMocker.mockRequest({
        method: "Get",
        params: {
          timestamp: new Date(),
          pagination: 10,
        },
      });
      const res = HttpMocker.mockResponse();
      const next = HttpMocker.mockNextFunction();
      const expectedMessage =
        "These properties are not valid: page: Page is not defined or is less than 0";
      const expectedStatus = 400;
      try {
        await controller.getLibs(req, res, next);
      } catch (e: any) {
        expect(e.message).toBe(expectedMessage);
        expect(e.status).toBe(expectedStatus);
      }
    });

    it("Should return the proper error if the page is less than zero", async () => {
      const req = HttpMocker.mockRequest({
        method: "Get",
        params: {
          timestamp: new Date(),
          pagination: 10,
        },
      });
      const res = HttpMocker.mockResponse();
      const next = HttpMocker.mockNextFunction();
      const expectedMessage =
        "These properties are not valid: page: Page is not defined or is less than 0";
      const expectedStatus = 400;
      try {
        await controller.getLibs(req, res, next);
      } catch (e: any) {
        expect(e.message).toBe(expectedMessage);
        expect(e.status).toBe(expectedStatus);
      }
    });

    it("Should return the proper error if the page is equal to zero", async () => {
      const req = HttpMocker.mockRequest({
        method: "Get",
        params: {
          timestamp: new Date(),
          pagination: 10,
        },
      });
      const res = HttpMocker.mockResponse();
      const next = HttpMocker.mockNextFunction();
      const expectedMessage =
        "These properties are not valid: page: Page is not defined or is less than 0";
      const expectedStatus = 400;
      try {
        await controller.getLibs(req, res, next);
      } catch (e: any) {
        expect(e.message).toBe(expectedMessage);
        expect(e.status).toBe(expectedStatus);
      }
    });

    it("Should return the proper error if the pagination is greater than the max pagination", async () => {
      const req = HttpMocker.mockRequest({
        method: "Get",
        params: {
          timestamp: new Date(),
          pagination:  + 10,
          page: 1,
        },
      });
      const res = HttpMocker.mockResponse();
      const next = HttpMocker.mockNextFunction();
      const expectedMessage =
        "These properties are not valid: page: Page is not defined or is less than 0";
      const expectedStatus = 400;
      try {
        await controller.getLibs(req, res, next);
      } catch (e: any) {
        expect(e.message).toBe(expectedMessage);
        expect(e.status).toBe(expectedStatus);
      }
    });

    it("Should return the proper error if pagination is not defined", async () => {});

    it("Should return the proper error if the pagination is less than zero", async () => {});

    it("Should return the proper error if the pagination is equal to zero", async () => {});

    it("Should return the proper results and the correct data structure", async () => {
      const req = HttpMocker.mockRequest({
        method: "Get",
        params: {
          page: 1,
          pagination: 10,
        },
      });
      const res = HttpMocker.mockResponse();
      const next = HttpMocker.mockNextFunction();
      await controller.getLibs(req, res, next);
      const data = res._getJSONData();
      expect(data.results.length).toBeGreaterThan(0);
      expect(data.page).toBeDefined;
      expect(data.pagination).toBeDefined;
      expect(data.totalPages).toBeDefined;
    });
  });
});
