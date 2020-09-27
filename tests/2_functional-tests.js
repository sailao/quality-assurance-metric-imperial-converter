/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  suite('Routing Tests', function() {
    
    suite('GET /api/convert => conversion object', function() {
      
      test('Convert 10L (valid input)', function(done) {
       chai.request(server)
        .get('/api/convert')
        .query({input: '10L'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 10);
          assert.equal(res.body.initUnit, 'L');
          assert.approximately(res.body.returnNum, 2.64172, 0.1);
          assert.equal(res.body.returnUnit, 'gal');
        });
        // Galon to Liture | Liture to Galon
        chai.request(server)
        .get('/api/convert')
        .query({input: '1gal'})
        .end(function(err, res){
          assert.equal(res.body.returnNum, 3.78541);
          assert.equal(res.body.returnUnit, 'l');
        });
        chai.request(server)
        .get('/api/convert')
        .query({input: '10gal'})
        .end(function(err, res){
          assert.equal(res.body.returnNum, 37.8541);
          assert.equal(res.body.returnUnit, 'l');
        });
        chai.request(server)
        .get('/api/convert')
        .query({input: '1l'})
        .end(function(err, res){
          assert.equal(res.body.returnNum, 0.26417);
          assert.equal(res.body.returnUnit, 'gal');
        });

        chai.request(server)
        .get('/api/convert')
        .query({input: '10l'})
        .end(function(err, res){
          assert.equal(res.body.returnNum, 2.64172);
          assert.equal(res.body.returnUnit, 'gal');
        });
        // Pound to Kilogram | Kilogram to Pound
        chai.request(server)
        .get('/api/convert')
        .query({input: '1lbs'})
        .end(function(err, res){
          assert.equal(res.body.returnNum, 0.45359);
          assert.equal(res.body.returnUnit, 'kg');
        });

        chai.request(server)
        .get('/api/convert')
        .query({input: '10lbs'})
        .end(function(err, res){
          assert.equal(res.body.returnNum, 4.53592);
          assert.equal(res.body.returnUnit, 'kg');
        });
        
        chai.request(server)
        .get('/api/convert')
        .query({input: '1kg'})
        .end(function(err, res){
          assert.equal(res.body.returnNum, 2.20462);
          assert.equal(res.body.returnUnit, 'lbs');
        });

        chai.request(server)
        .get('/api/convert')
        .query({input: '10kg'})
        .end(function(err, res){
          assert.equal(res.body.returnNum, 22.04624);
          assert.equal(res.body.returnUnit, 'lbs');
        });
        // Miles to kilometer
        chai.request(server)
        .get('/api/convert')
        .query({input: '1mi'})
        .end(function(err, res){
          assert.equal(res.body.returnNum, 1.60934);
          assert.equal(res.body.returnUnit, 'km');
        });

        chai.request(server)
        .get('/api/convert')
        .query({input: '10mi'})
        .end(function(err, res){
          assert.equal(res.body.returnNum, 16.0934);
          assert.equal(res.body.returnUnit, 'km');
        });
        
        chai.request(server)
        .get('/api/convert')
        .query({input: '1km'})
        .end(function(err, res){
          assert.equal(res.body.returnNum, 0.62137);
          assert.equal(res.body.returnUnit, 'mi');
        });

        chai.request(server)
        .get('/api/convert')
        .query({input: '10km'})
        .end(function(err, res){
          assert.equal(res.body.returnNum, 6.21373);
          assert.equal(res.body.returnUnit, 'mi');
        });
        done()
      });
      
      test('Convert 32g (invalid input unit)', function(done) {
        chai.request(server)
        .get('/api/convert')
        .query({input: '32g'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.initUnit, 'invalid unit');
          done();
        });
      });
      
      test('Convert 3/7.2/4kg (invalid number)', function(done) {
        chai.request(server)
        .get('/api/convert')
        .query({input: '3/7.2/4kg'})
        .end(function(err, res){
          assert.equal(res.status, 400);
          assert.equal(res.body.error, 'invalid number');
          done();
        });
      });  
      
      test('Convert 3/7.2/4kilomegagram (invalid number and unit)', function(done) {
        chai.request(server)
        .get('/api/convert')
        .query({input: '3/7.2/4kilomegagram'})
        .end(function(err, res){
          assert.equal(res.status, 400);
          assert.equal(res.body.error, 'invalid number and unit');
        });

        chai.request(server)
        .get('/api/convert')
        .query({input: '1min'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.initUnit, 'invalid unit');
        });
        done();
      });
      
      test('Convert kg (no number)', function(done) {
        chai.request(server)
        .get('/api/convert')
        .query({input: 'kg'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 1);
          assert.equal(res.body.initUnit, 'kg');
          done();
        });
      });
      
    });

  });

});
