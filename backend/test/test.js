  const chai = require('chai');
  const chaiHttp = require('chai-http');
  const dotenv = require('dotenv');
  const app = require('../server');

  dotenv.config();
  chai.use(chaiHttp);
  chai.should();

  describe('GPT API', () => {
    it('should return response from OpenAI API', (done) => {
      const prompt = 'Hello, OpenAI';
      chai.request(app)
        .get(`/gpt?prompt=${prompt}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.text.should.be.a('string');
          done();
        });
    });
  });



  const chai = require('chai');
  const chaiHttp = require('chai-http');
  const app = require('../app');

  chai.use(chaiHttp);
  const expect = chai.expect;

  describe('Mad Lib generator backend', function () {
    // Test case 1: Test that the API returns a 200 status code and a completed Mad Lib when given a template and a set of words.
    it('should return a completed Mad Lib when given a template and a set of words', function (done) {
      const data = {
        template: "The {adjective} {noun} {verb} over the {adjective} {noun}.",
        words: {
          adjective: "quick",
          noun: "fox",
          verb: "jumped"
        }
      };

      chai.request(app)
        .post('/madlibs')
        .send(data)
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('madlib');
          expect(res.body.madlib).to.equal("The quick fox jumped over the quick fox.");
          done();
        });
    });

    // Test case 2: Test that the API returns a 400 status code and an error message when given a template without all required words.
    it('should return a 400 status code and an error message when given a template without all required words', function (done) {
      const data = {
        template: "The {adjective} {noun} {verb} over the {adjective} {noun}.",
        words: {
          adjective: "quick",
          verb: "jumped"
        }
      };

      chai.request(app)
        .post('/madlibs')
        .send(data)
        .end(function (err, res) {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal("Missing required word 'noun'");
          done();
        });
    });

    // Test case 3: Test that the API returns a 400 status code and an error message when given a template with extra words that are not required.
    it('should return a 400 status code and an error message when given a template with extra words that are not required', function (done) {
      const data = {
        template: "The {adjective} {noun} {verb} over the {adjective} {noun}.",
        words: {
          adjective: "quick",
          noun: "fox",
          verb: "jumped",
          adverb: "quickly"
        }
      };

      chai.request(app)
        .post('/madlibs')
        .send(data)
        .end(function (err, res) {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal("Unexpected word 'adverb'");
          done();
          });
          });
          
          // Test case 4: Test that the API returns a 400 status code and an error message when given a non-string value for a word.
          it('should return a 400 status code and an error message when given a non-string value for a word', function (done) {
          const data = {
          template: "The {adjective} {noun} {verb} over the {adjective} {noun}.",
          words: {
          adjective: "quick",
          noun: "fox",
          verb: 123
          }
          };

          chai.request(app)
          .post('/madlibs')
          .send(data)
          .end(function (err, res) {
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.equal("Invalid value for word 'verb'");
            done();
          });
        
        });

        // Test case 5: Test that the API can handle multiple requests at once and return the correct results.
        it('should be able to handle multiple requests at once and return the correct results', function (done) {
        const data1 = {
        template: "The {adjective} {noun} {verb} over the {adjective} {noun}.",
        words: {
        adjective: "quick",
        noun: "fox",
        verb: "jumped"
        }
        };

        const data2 = {
          template: "The {adjective} {noun} {verb} over the {adjective} {noun}.",
          words: {
            adjective: "lazy",
            noun: "dog",
            verb: "ran"
          }
        };
        
        chai.request(app)
          .post('/madlibs')
          .send(data1)
          .end(function (err, res1) {
            expect(res1).to.have.status(200);
            expect(res1.body).to.have.property('madlib');
            expect(res1.body.madlib).to.equal("The quick fox jumped over the quick fox.");
        
            chai.request(app)
              .post('/madlibs')
              .send(data2)
              .end(function (err, res2) {
                expect(res2).to.have.status(200);
                expect(res2.body).to.have.property('madlib');
                expect(res2.body.madlib).to.equal("The lazy dog ran over the lazy dog.");
        
                done();
              });
          });

          
        });

        // Test case 6: Test that the API returns a 400 status code and an error message when given a template with a missing opening brace.
        it('should return a 400 status code and an error message when given a template with a missing opening brace', function (done) {
        const data = {
        template: "The adjective} {noun} {verb} over the {adjective} {noun}.",
        words: {
        adjective: "quick",
        noun: "fox",
        verb: "jumped"
        }
        };

        chai.request(app)
        .post('/madlibs')
        .send(data)
        .end(function (err, res) {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal("Malformed template");
          done();
        });
        // Test case 7: Test that the API returns a 400 status code and an error message when given an empty set of words.
        it('should return a 400 status code and an error message when given an empty set of words', function (done) {
        const data = {
        template: "The {adjective} {noun} {verb} over the {adjective} {noun}.",
        words: {}
        };
    
        chai.request(app)
        .post('/madlibs')
        .send(data)
        .end(function (err, res) {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal("Missing required word 'adjective'");
          done();
        });
      
        // Test case 8: Test that the API returns a 500 status code and an error message when Mad Lib generation fails due to an unexpected error.
        it('should return a 500 status code and an error message when Mad Lib generation fails due to an unexpected error, function (done) {
          const data = {
          template: "The {adjective} {noun} {verb} over the {adjective} {noun}.",
          words: {
          adjective: "quick",
          noun: "fox",
          verb: "jumped"
          }
          };

          sinon.stub(madLibs, 'generateMadLib').throws();

          chai.request(app)
          .post('/madlibs')
          .send(data)
          .end(function (err, res) {
          expect(res).to.have.status(500);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal("Failed to generate Mad Lib");
          madLibs.generateMadLib.restore();
          done();
        });
