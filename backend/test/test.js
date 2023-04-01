const chai = require("chai");
const expect = chai.expect;
const app = require("../src/app");
const request = require("supertest");

describe("MadLib Generator API", function () {
  it("returns a 200 response with a valid madlib", function (done) {
    request(app)
      .post("/madlib")
      .send({ template: "I am {adjective} to be learning {language}." })
      .send({ words: { adjective: "excited", language: "JavaScript" } })
      .set("x-api-key", "test")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).to.have.property("madlib");
        expect(res.body.madlib).to.equal("I am excited to be learning JavaScript.");
        done();
      });
  });

  it("returns a 400 response with an error message if template is missing", function (done) {
    request(app)
      .post("/madlib")
      .send({ words: { adjective: "excited", language: "JavaScript" } })
      .set("x-api-key", "test")
      .expect(400)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).to.have.property("error");
        expect(res.body.error).to.equal("Missing template.");
        done();
      });
  });

  it("returns a 400 response with an error message if words are missing", function (done) {
    request(app)
      .post("/madlib")
      .send({ template: "I am {adjective} to be learning {language}." })
      .set("x-api-key", "test")
      .expect(400)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).to.have.property("error");
        expect(res.body.error).to.equal("Missing words.");
        done();
      });
  });

  it("returns a 500 response with an error message if OpenAI API key is missing", function (done) {
    request(app)
      .post("/madlib")
      .send({ template: "I am {adjective} to be learning {language}." })
      .send({ words: { adjective: "excited", language: "JavaScript" } })
      .expect(500)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).to.have.property("error");
        expect(res.body.error).to.equal("OpenAI API key missing.");
        done();
      });
  });
});
