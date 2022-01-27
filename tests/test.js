'use strict';
process.env.NODE_ENV = 'test';
const expect = require('chai').expect;
const supertest = require('supertest'); 
const test = require('unit.js');
const app = require('../server.js');

const request = supertest(app);

describe('Tests app', function() {
  it('verifies get', function(done) {
    request.get('/').expect(200).end(function(err, result) {
        test.string(result.body.Output).contains('Hello');
        test.value(result).hasHeader('content-type', 'application/json; charset=utf-8');
        done(err);
    });
  });
  it('says hello in french and calls u a lil bitch', function(done) {
    request.get('/hi').expect(200).end(function(err, result) {
      test.string(result.body.Greeting).contains('Bonjour');
      test.value(result).hasHeader('content-type', 'application/json; charset=utf-8');
      done(err);
    });
  });
  it('verifies post', function(done) {
    request.post('/').expect(200).end(function(err, result) {
        test.string(result.body.Output).contains('Hello');
        test.value(result).hasHeader('content-type', 'application/json; charset=utf-8');
        done(err);
    });
  });
  it('attempts to add new document to database and returns response success object', function(done) {
    const params = { name: 'testName1', text: 'testText1', owner: 'testOwner' };
    request.post('/store').send(params).then((res) => {
      const body = res.body;
      expect(200);
      expect(body).to.contain.property('isSuccessful');
      expect(body).to.contain.property('message');
      done();
    })
    .catch((err) => done(err));
  })
});
