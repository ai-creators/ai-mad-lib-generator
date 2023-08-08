import { AdLibController } from "../../src/services/adlib/AdLibController";

describe("AdLib Controller", () => {
  let controller = new AdLibController();
  let serviceSpy: jest.SpyInstance;
  beforeEach(() => {
    serviceSpy = jest.spyOn(controller.getService(), "");
  });
  describe("getLibs", () => {
    it("Should return the proper error if no timestamp has been provided", () => {});

    it("Should return the proper error if timestamp is not a valid data", () => {});

    it("Should return the proper error if timestamp is in the future", () => {});

    it("Should return the proper error if page is not defined", () => {});

    it("Should return the proper error if the page is less than zero", () => {});

    it("Should return the proper error if the page is equal to zero", () => {});

    it("Should return the proper error if the pagination is greater than the max pagination", () => {});

    it("Should return the proper error if pagination is not defined", () => {});

    it("Should return the proper error if the pagination is less than zero", () => {});

    it("Should return the proper error if the pagination is equal to zero", () => {});
  });
});
