const chai = require("chai");
const expect = chai.expect;
const app = require("../src/app");
const request = require("supertest");
const assert = require("assert");

describe("MadLib Generator API", function () {
  describe("POST /generate/madlib", function () {
      // Test case to check if the MadLib generator can return a completed MadLib for valid input
      it("should return 200 and a completed MadLib", function (done) {
         // Increase the timeout to 5000ms (5 seconds)
        this.timeout(5000);
        const data = {
          data: {
            prompt: "My favorite color is [color].",
          },
        };
      
        request(app)
          .post("/generate/madlib")
          .send(data)
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
      
            // Check if the response body has the expected properties
            assert.ok(res.body);
            assert.ok(res.body.choices);
            assert.ok(res.body.choices[0].text);
      
            // Check if the generated MadLib contains the expected format
            const completedMadLib = res.body.choices[0].text;
            assert.ok(completedMadLib.includes("[color]"));
      
            done();
          });
      });
      
      // Additional test cases can be added here
        // Test case to check if the MadLib generator returns an error when the `prompt` is not provided in the request body
        it("should return 400 if the prompt is not provided", function (done) {
          const data = {
            data: {},
          };

          request(app)
            .post("/generate/madlib")
            .send(data)
            .expect(400)
            .end(function (err, res) {
              if (err) return done(err);

              assert.ok(res.body.error);
              assert.equal(res.body.error, "Prompt is required.");
              done();
            });
        });

        // Test case to check if the generated MadLib does not exceed the maximum token limit
         it("should return a MadLib within the specified token limit", function (done) {
        // Increase the timeout to 5000ms (5 seconds)
        this.timeout(5000);
        const data = {
          data: {
            prompt: "My favorite color is [color].",
          },
        };
      
        request(app)
          .post("/generate/madlib")
          .send(data)
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
      
            // Check if the response body has the expected properties
            assert.ok(res.body);
            assert.ok(res.body.choices);
            assert.ok(res.body.choices[0].text);
      
            // Check if the generated MadLib is within the specified token limit
            const completedMadLib = res.body.choices[0].text;
            const tokenLimit = 100;
            const tokens = completedMadLib.split(" ");
            assert.ok(tokens.length <= tokenLimit);
      
            done();
          });
      });

        // Test case to check if the API returns 400 when the input prompt is not in the correct format (missing brackets)
        it("should return 400 if the prompt format is incorrect", function (done) {
           // Increase the timeout to 5000ms (5 seconds)
          this.timeout(5000);
          const data = {
            data: {
              prompt: "My favorite color is color.",
            },
          };

          request(app)
            .post("/generate/madlib")
            .send(data)
            .expect(400, done);
        });

        // Test case to check if the API returns 400 when the `data` object is missing from the request
        it("should return 400 if the data object is missing", function (done) {
          const data = {};

          request(app)
            .post("/generate/madlib")
            .send(data)
            .expect(400, done);
        });

        it("should return the response with a correct content type", function (done) {
          const data = {
            data: {
              prompt: "My favorite color is [color].",
            },
          };
        
          request(app)
            .post("/generate/madlib")
            .send(data)
            .expect('Content-Type', /json/)
            .expect(200, done);
        });

        it("should return 400 when the prompt format is incorrect", function (done) {
          const data = {
            data: {
              prompt: "My favorite color is color.",
            },
          };
    
          request(app)
            .post("/generate/madlib")
            .send(data)
            .expect(400)
            .end(function (err, res) {
              if (err) return done(err);
    
              assert.ok(res.body.error);
              assert.strictEqual(res.body.error, "Invalid prompt format. Use brackets around placeholders");
              done();
            });
        });

        it("should return 400 when the prompt is missing in the data object", function (done) {
          const data = {
            data: {}
          };
      
          request(app)
            .post("/generate/madlib")
            .send(data)
            .expect(400)
            .end(function (err, res) {
              if (err) return done(err);
      
              assert.ok(res.body.error);
              assert.strictEqual(res.body.error, "Prompt is required.");
              done();
            });
        });
      
        it("should return 400 when the prompt format is incorrect (no brackets)", function (done) {
          const data = {
            data: {
              prompt: "I love my pet because they are so cute.",
            },
          };
      
          request(app)
            .post("/generate/madlib")
            .send(data)
            .expect(400)
            .end(function (err, res) {
              if (err) return done(err);
      
              assert.ok(res.body.error);
              assert.strictEqual(res.body.error, "Invalid prompt format. Use brackets around placeholders");
              done();
            });
        });
      
        it("should return 400 when the prompt contains spaces inside brackets", function (done) {
          const data = {
            data: {
              prompt: "I love [type of animal] because they are [an adjective].",
            },
          };
      
          request(app)
            .post("/generate/madlib")
            .send(data)
            .expect(400)
            .end(function (err, res) {
              if (err) return done(err);
      
              assert.ok(res.body.error);
              assert.strictEqual(res.body.error, "Invalid prompt format. Use brackets around placeholders");
              done();
            });
        });


        
    });
  });
