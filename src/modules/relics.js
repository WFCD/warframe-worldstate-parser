var md = require('node-md-config');
var jsonQuery = require('json-query');
var relicData =  require('warframe-worldstate-data').relics;

var toTitleCase = function (str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

var RelicSort = function(a, b){
  var lithReg = /lith/ig;
  var mesoReg = /meso/ig;
  var neoReg = /neo/ig;
  var axiReg = /axi/ig;
  var aVal;
  var bVal;
  if(lithReg.test(a))
    aVal = 0;
  else if (mesoReg.test(a))
    aVal = 1;
  else if (neoReg.test(a))
    aVal = 2;
  else if (axiReg.test(a))
    aVal = 3;
  if(lithReg.test(b))
    bVal = 0;
  else if (mesoReg.test(b))
    bVal = 1;
  else if (neoReg.test(b))
    bVal = 2;
  else if (axiReg.test(b))
    bVal = 3;
  
  if(aVal<bVal)
    return -1;
  else if(aVal===bVal)
    return 0;
  else if (aVal>bVal)
    return 1;
}

var Part = function(name, ducats, relic){
  this.name = toTitleCase(name);
  this.ducats = ducats;
  this.relics = [relic];
}

Part.prototype.addRelic = function(relicToAdd){
  var self = this;
  var relicInRelics = false;
  self.relics.forEach(function(existingRelic){
    if((relicToAdd.toLowerCase() === existingRelic.toLowerCase())){
      relicInRelics = true;
    }
  });
  if(!relicInRelics){
    self.relics.push(relicToAdd);
  }
}

Part.prototype.toString = function() {
  return this.name +" worth "+ this.ducats + ": "+md.lineEnd+"　　" + 
    this.relics.sort(RelicSort).join(","+md.lineEnd+"　　");
}

var Parts = function (data) {
  this.parts = new Array();
  var self = this;
  data.forEach(function (reliquary) {
    var partInParts = false;
    var indexOfPart = null;
    if (self.parts.length > 0) {
      self.parts.forEach(function (existingPart, index) {
        if ((reliquary.part.toLowerCase() === existingPart.name.toLowerCase())) {
          partInParts = true;
          existingPart.addRelic(reliquary.relic + " ("+reliquary.rarity+")");
        }
      });
    }
    if(!partInParts){
      self.parts.push(new Part(reliquary.part, reliquary.ducats, reliquary.relic + " ("+reliquary.rarity+")"));
    }
  });
}


Parts.prototype.toString = function(){
  var partsString = md.codeMulti;
  partsString += this.parts.join(md.doubleReturn);
  if(partsString === md.codeMulti){
    partsString += "Operator, no relics available for that query.";
  }
  partsString += md.blockEnd;
  return partsString;
}

Parts.prototype.getAll = function(){
  return this.parts;
}

var RelicQuery = function(query, callback){
  this.query = query;
  var results = jsonQuery('relics[*part~/'+query+'/i]', {
    data: relicData,
    allowRegexp: true
  });
  this.parts = new Parts(results.value);
  callback(null, this.parts.toString());
}

var RelicQuery = function(query, callback){
  this.query = query;
  var results = jsonQuery('relics[*part~/'+query+'/i]', {
    data: relicData,
    allowRegexp: true
  });
  this.parts = new Parts(results.value);
  callback(null, this.parts.toString());
}

module.exports = RelicQuery;