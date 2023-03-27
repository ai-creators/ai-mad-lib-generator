const chai = require('chai');
const expect = chai.expect;
const app = require('../app');
const request = require('supertest');
const assert = require('assert');


describe('MadLib Generator API', function() {
  describe('POST /api/madlib', function() {

    // Test case to check if the MadLib generator can return a completed MadLib for valid input
    it('should return 200 and a completed MadLib', function(done) {
      const data = {
        template: 'My favorite color is {color}.',
        prompts: {
          color: 'red'
        }
      };

      request(app)
        .post('/api/madlib')
        .send(data)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);

          assert.equal(res.body.completedMadLib, 'My favorite color is red.');
          done();
        });
    });

    // Test case to check if the API returns an error if required fields are missing
    it('should return 400 if required fields are missing', function(done) {
      const data = {
        template: 'My favorite color is {color}.'
      };

      request(app)
        .post('/api/madlib')
        .send(data)
        .expect(400)
        .end(function(err, res) {
          if (err) return done(err);

          assert.equal(res.body.error, 'Missing required fields: prompts');
          done();
        });
    });

    // Test case to check if the API returns an error if prompts are not provided
    it('should return 400 if prompts are not provided', function(done) {
      const data = {
        template: 'My favorite color is {color}.',
        prompts: {}
      };

      request(app)
        .post('/api/madlib')
        .send(data)
        .expect(400)
        .end(function(err, res) {
          if (err) return done(err);

          assert.equal(res.body.error, 'Missing prompts');
          done();
        });
    });

    // Test case to check if the API returns an error if an invalid prompt is provided
    it('should return 400 if an invalid prompt is provided', function(done) {
      const data = {
        template: 'My favorite color is {color}.',
        prompts: {
          color: 123
        }
      };

      request(app)
        .post('/api/madlib')
        .send(data)
        .expect(400)
        .end(function(err, res) {
          if (err) return done(err);

          assert.equal(res.body.error, 'Invalid prompt: color');
          done();
        });
    });

    // Test case to check if the API returns an error if the template is missing
    it('should return 400 if the template is missing', function(done) {
      const data = {
        prompts: {
          color: 'red'
        }
      };

      request(app)
        .post('/api/madlib')
        .send(data)
        .expect(400)
        .end(function(err, res) {
          if (err) return done(err);

          assert.equal(res.body.error, 'Missing required fields: template');
          done();
        });
    });

    // Test case to check if the API returns an error if the template is empty

    it('should return 400 if the template is empty', function(done) {
      const data = {
        template: '',
        prompts: {
          color: 'red'
        }
      };

      request(app)
        .post('/api/madlib')
        .send(data)
        .expect(400)
        .end(function(err, res) {
          if (err) return done(err);

          assert.equal(res.body.error, 'Missing template');
          done();
        });
    });
    

    // Test case to check if the API returns a 500 error if there is an error with the OpenAI API
    it('should return 500 if there is an error with the OpenAI API', function(done) {
      const data = {
        template: 'My favorite color is {color}.',
        prompts: {
          color: 'purple'
        }
      };

      // Mock the OpenAI API to return an error
      app.locals.openai.api = {
        complete: function(parameters, callback) {
          callback(new Error('OpenAI API Error'), null);
        }
      };

      request(app)
        .post('/api/madlib')
        .send(data)
        .expect(500)
        .end(function(err, res) {
          if (err) return done(err);

          assert.equal(res.body.error, 'Error generating MadLib');
          done();
        });


// Test case to check if the MadLib generator can handle multiple prompts in the template
it('should return 200 and a completed MadLib with multiple prompts', function(done) {
  const data = {
    template: 'My favorite color is {color} and my favorite food is {food}.',
    prompts: {
      color: 'purple',
      food: 'pizza'
    }
  };

  request(app)
    .post('/api/madlib')
    .send(data)
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);

      assert.equal(res.body.completedMadLib, 'My favorite color is purple and my favorite food is pizza.');
      done();
    });
});

// Test case to check if the API returns an error if the template contains unused prompts
it('should return 400 if the template contains unused prompts', function(done) {
  const data = {
    template: 'My favorite color is {color}.',
    prompts: {
      color: 'red',
      size: 'large'
    }
  };

  request(app)
    .post('/api/madlib')
    .send(data)
    .expect(400)
    .end(function(err, res) {
      if (err) return done(err);

      assert.equal(res.body.error, 'Unused prompts: size');
      done();
    });
});

// Test case to check if the API returns an error if the template contains a malformed prompt
it('should return 400 if the template contains a malformed prompt', function(done) {
  const data = {
    template: 'My favorite color is {color}.',
    prompts: {
      color: 123
    }
  };

  request(app)
    .post('/api/madlib')
    .send(data)
    .expect(400)
    .end(function(err, res) {
      if (err) return done(err);

      assert.equal(res.body.error, 'Invalid prompt: color');
      done();
    });
});

// Test case to check if the API returns an error if the OpenAI API key is invalid
it('should return 500 if the OpenAI API key is invalid', function(done) {
  const data = {
    template: 'My favorite color is {color}.',
    prompts: {
      color: 'blue'
    }
  };

  // Mock the OpenAI API to return an authentication error
  app.locals.openai.api = {
    complete: function(parameters, callback) {
      callback({
        response: {
          body: {
            error: {
              message: 'Authentication failed'
            }
          }
        }
      }, null);
    }
  };

  request(app)
    .post('/api/madlib')
    .send(data)
    .expect(500)
    .end(function(err, res) {
      if (err) return done(err);

      assert.equal(res.body.error, 'Error generating MadLib');
      done();
    });
});

// Test case to check if the MadLib generator can handle a long template and prompts
it('should return 200 and a completed MadLib with a long template and prompts', function(done) {
  const data = {
    template: 'I like to {verb} {adverb} {adjective} {noun} when it is {weather} outside.',
    prompts: {
      verb: 'eat',
      adverb: 'quickly',
      adjective: 'spicy',
      noun: 'tacos',
      weather: 'sunny'
    }
  };

  request(app)
    .post('/api/madlib')
    .send(data)
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);

      assert.equal(res.body.completedMadLib, 'I like to eat quickly spicy tacos when it is sunny outside.');
      done();
    });
});

// Test case to check if the API returns an error if the template is missing
it('should return 400 if the template is missing', function(done) {
  const data = {
    prompts: {
      adjective: 'fuzzy',
      animal: 'koala'
    }
  };

  request(app)
    .post('/api/madlib')
    .send(data)
    .expect(400)
    .end(function(err, res) {
      if (err) return done(err);

      assert.equal(res.body.error, 'Missing template');
      done();
    });
});

// Test case to check if the API returns an error if the prompts are missing
it('should return 400 if the prompts are missing', function(done) {
  const data = {
    template: 'My favorite animal is the {animal}.'
  };

  request(app)
    .post('/api/madlib')
    .send(data)
    .expect(400)
    .end(function(err, res) {
      if (err) return done(err);

      assert.equal(res.body.error, 'Missing prompts');
      done();
    });
});

// Test case to check if the API returns an error if the OpenAI API call fails
it('should return 500 if the OpenAI API call fails', function(done) {
  const data = {
    template: 'I am feeling {adjective} today.',
    prompts: {
      adjective: 'happy'
    }
  };

  // Mock the OpenAI API to return an error
  app.locals.openai.api = {
    complete: function(parameters, callback) {
      callback(new Error('Failed to generate MadLib'), null);
    }
  };

  request(app)
    .post('/api/madlib')
    .send(data)
    .expect(500)
    .end(function(err, res) {
      if (err) return done(err);

      assert.equal(res.body.error, 'Error generating MadLib');
      done();
    });
});

});
});
});