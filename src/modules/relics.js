var md = require('node-md-config');
var jsonQuery = require('json-query');
var relicData =  require('warframe-worldstate-data').relics;

var toTitleCase = function (str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
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
  return this.name +" worth "+ this.ducats + ": "+md.lineEnd+"　　" + this.relics.join(","+md.lineEnd+"　　");
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
  /*this.parts.forEach(function(part){
    partsString += part.toString() + md.lineEnd;
  });*/
  
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

module.exports = RelicQuery;