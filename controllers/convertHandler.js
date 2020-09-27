/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  
  this.getNum = function(input) {
    if(!input){
      return 'invalid number'
    }
    let fraction = input.match(/\//g)
    if(fraction && fraction.length >= 2){
      return 'invalid number'
    }
    var result = input.match(/^\d+\.?\d?(\.|\/)*\d*/g)
     result = result ? result[0] : "1";
     if(result.search("/") !== -1){
       let firstNum = result.split("/", 2)[0]
       let secondNum = result.split("/", 2)[1]
       result = firstNum/secondNum
     }
     return result;
  };
  
  this.getUnit = function(input) {
    if(!input){
      return 'invalid unit'
    }
    input = input.match(/[a-zA-Z]+/g)
    input = input ? input[0] : 'invalid unit';
    var units = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
    return units.indexOf(input) == -1 ? 'invalid unit' : input;
  };
  
  this.getReturnUnit = function(initUnit) {
    var result;
    var initUnit = initUnit.toLowerCase()
    switch (initUnit) {
      case 'gal': 
        result = 'l';
        break;
      case 'l'  : 
        result = 'gal';
        break;
      case 'lbs': 
        result = 'kg';
        break;
      case 'kg' : 
        result = 'lbs';
        break;
      case 'mi' : 
        result = 'km';
        break;
      case 'km' : 
        result = 'mi';
        break;
      default:
        result = 'invalid unit'
        break;
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    if(!unit){
      return 'invalid unit'
    }
    var result;
    switch(unit.toLowerCase()){
      case 'gal': 
        result = 'galons'; 
        break;
      case 'l'  : 
        result = 'liters'; 
        break;
      case 'mi' : 
        result = 'miles'; 
        break;
      case 'km' : 
        result = 'kilometers'; 
        break;
      case 'lbs': 
        result = 'pounds'; 
        break;
      case 'kg' : 
        result = 'kilograms'; 
        break;
      default: 
        result = 'invalid unit';
        break;
    }
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    var result;
    initNum = parseInt(initNum)
    initUnit = initUnit.toLowerCase();
    switch (initUnit) {
      case 'gal': 
        result = initNum * galToL; 
        break;
      case 'l'  : 
        result =  initNum / galToL; 
        break;
      case 'lbs': 
        result = initNum * lbsToKg; 
        break;
      case 'kg' : 
        result =  initNum / lbsToKg; 
        break;
      case 'mi' : 
        result = initNum * miToKm; 
        break;
      case 'km' : 
        result =  initNum / miToKm; 
        break;
      default:
        result = 'invalid number'
        break;
    }
    if(result == 'invalid number') return result;
    result = parseFloat(result.toFixed(5))
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    initUnit = this.spellOutUnit(initUnit)
    returnUnit = this.spellOutUnit(returnUnit)
    var result = `${initNum} ${initUnit} convert to ${returnNum} ${returnUnit}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
