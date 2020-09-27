/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      var input = '32L';
      assert.equal(convertHandler.getNum(input), 32);
      assert.equal(convertHandler.getNum('1gal'), 1);
      done();
    });
    
    test('Decimal Input', function(done) {
      var input = '3.78541 L';
      assert.equal(convertHandler.getNum(input), 3.78541);
      done();
    });
    
    test('Fractional Input', function(done) {
      assert.equal(convertHandler.getNum('9/3yyjj'), 3)
      done();
    });
    
    test('Fractional Input w/ Decimal', function(done) {
      assert.approximately(convertHandler.getNum('9.9/3yyjj'), 3.3, 0.01)
      done();
    });
    
    test('Invalid Input (double fraction)', function(done) {
      assert.equal(convertHandler.getNum('5//5yyjj'), 'invalid number')
      assert.equal(convertHandler.getNum('5.5//5yyjj'), 'invalid number')
      done();
    });
    
    test('No Numerical Input', function(done) {
      assert.equal(convertHandler.getNum('gal'), 1)
      assert.equal(convertHandler.getNum('l'), 1)
      assert.equal(convertHandler.getNum('mi'), 1)
      assert.equal(convertHandler.getNum('km'), 1)
      assert.equal(convertHandler.getNum('lbs'), 1)
      assert.equal(convertHandler.getNum('kg'), 1)
      done();
    }); 
    
  });
  
  suite('Function convertHandler.getUnit(input)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      input.forEach(function(ele) {
        //assert
        assert.equal(convertHandler.getUnit(ele), ele)
      });
      done();
    });
    
    test('Unknown Unit Input', function(done) {
      assert.equal(convertHandler.getUnit('mm'), 'invalid unit')
      done();
    });  
    
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['l','gal','km','mi','kg','lbs'];
      input.map((ele, i) => {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
    
  });  
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('For Each Valid Unit Inputs',  function(done) {
      // see above example for hint
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['liters','galons','kilometers','miles','kilograms','pounds'];
      input.map(unit => {
        assert.notEqual(expect.indexOf(convertHandler.spellOutUnit(unit)), -1)
      })
      done();
    });
    
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('Gal to L', function(done) {
      var input = [5, 'gal'];
      var expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('L to Gal', function(done) {
      var input = [10, 'l'];
      var expected = 2.64;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.01); //0.1 tolerance
      done();
    });
    
    test('Mi to Km', function(done) {
      var input = [5, 'mi'];
      var expected = 8
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Km to Mi', function(done) {
      var input = [8, 'km'];
      var expected = 5;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Lbs to Kg', function(done) {
      var input = [100, 'lbs'];
      var expected = 45.3;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Kg to Lbs', function(done) {
      var input = [50, 'kg'];
      var expected = 110;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected, 0.3); //0.1 tolerance
      done();
    });
    
  });

});