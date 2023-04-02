const request = require('supertest');
const app = require('../src/app');

//test for GET /generate
describe('GET /generate', function () {
  it('responds with json', function (done) {
    request(app)

      .get('/generate')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

//test for POST /generate
describe('POST /generate', function () {
  it('responds with json', function (done) {
    request(app)

      .post('/generate')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});


// describe('MadLib Generator API', function () {
//   describe('POST /generate', function () {
//     it('returns a 200 response with a valid madlib', function (done) {
//       const data = {
//         template: 'The {noun} {verb} over the {adjective} {noun}.',
//         words: {
//           noun: 'cat',
//           verb: 'jumped',
//           adjective: 'lazy',
//         },
//       };
//       request(app)
//         .post('/generate')
//         .send(data)
//         .expect(200)
//         .end(function (err, res) {
//           if (err) return done(err);
//           // Add your own assertions here
//           done();
//         });
//     });

//     it('returns a 400 response with an error message if template is missing', function (done) {
//       const data = {
//         words: {
//           noun: 'cat',
//           verb: 'jumped',
//           adjective: 'lazy',
//         },
//       };
//       request(app)
//         .post('/generate')
//         .send(data)
//         .expect(400)
//         .expect({ error: 'Template is missing' })
//         .end(done);
//     });

//     it('returns a 400 response with an error message if words are missing', function (done) {
//       const data = {
//         template: 'The {noun} {verb} over the {adjective} {noun}.',
//       };
//       request(app)
//         .post('/generate')
//         .send(data)
//         .expect(400)
//         .expect({ error: 'Words are missing' })
//         .end(done);
//     });

//     it('returns a 500 response with an error message if OpenAI API key is missing', function (done) {
//       const data = {
//         template: 'The {noun} {verb} over the {adjective} {noun}.',
//         words: {
//           noun: 'cat',
//           verb: 'jumped',
//           adjective: 'lazy',
//         },
//       };
//       process.env.OPENAI_API_KEY = '';
//       request(app)
//         .post('/generate')
//         .send(data)
//         .expect(500)
//         .expect({ error: 'OpenAI API key is missing' })
//         .end(done);
//     });
//   });
// });
