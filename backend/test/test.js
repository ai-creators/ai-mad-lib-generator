const chai = require("chai");
const expect = chai.expect;
const app = require("../src/app");
const request = require("supertest");
const assert = require("assert");

describe("MadLib Generator API", function () {
  describe("POST /generate/madlib", function () {
    // Test case to check if the MadLib generator can return a completed MadLib for valid input
    it("should return a completed MadLib for valid input", function (done) {
      request(app)
        .post("/generate/madlib")
        .send({
          template: "I went to the store and bought a [noun].",
          words: ["apple"],
        })
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);
          expect(res.body).to.have.property("madlib");
          expect(res.body.madlib).to.equal("I went to the store and bought a apple.");
          done();
        });
    });
    

  });
});

