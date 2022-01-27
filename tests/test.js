'use strict';

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
    const params = { name: 'testName', text: 'testText', owner: 'testOwner' };
    request.post('/store').send(params).expect(200).end(async function(err, result) {
      await test.value(result).hasHeader('content-type', 'application/json; charset=utf-8');
      done(err);
    })
  })
});
