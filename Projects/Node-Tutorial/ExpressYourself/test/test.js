console.log = () => {};
const rewire = require('rewire');
const expect = require('chai').expect;
const request = require('supertest');

describe('', function() {
  it('', function(done) {
    process.env.PORT = 8000;
    const appModule = rewire('../app.js');
    const app = appModule.__get__('app');
    const expressions = appModule.__get__('expressions');
    let originalExpressions;
    request(app)
    .delete('/expressions/1')
    .then((response) => {
      let found = expressions.find((element) => {
        return element.id === 1;
      });
      expect(found, 'Does your DELETE `/expressions/:id` route delete the proper element from the `expressions` array?').to.not.be.ok;
      expect(response.status, 'Did you send a 204 response from the POST `/expressions` route?').to.equal(204);
    })
    .then(() => {
      originalExpressions =  Array.from(expressions);
      return request(app)
      .delete('/expressions/invalid');
    })
    .then((response) => {
      expect(response.status, 'Your DELETE route should return 404 for an invalid ID.').to.equal(404);
      expect(expressions, 'A DELETE `/expressions/:id` should not alter update any expressions on a request with invalid ID.').to.deep.equal(originalExpressions);
      done();
    })
    .catch(done);
  });
});
