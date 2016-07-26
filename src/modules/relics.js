var md = require('node-md-config');
var jsonQuery = require('json-query');
var relicData =  require('warframe-worldstate-data').relics;

var Part = function(name, ducats, relic){
  this.name = name;
  this.ducats = ducats;
  this.relics = [relic];
}

Part.prototype.addRelic = function(relicToAdd){
  this.relics.forEach(function(existingRelic){
    if(relicToAdd === existingRelic){
      return;
    } else {
      this.relics.push(relicToAdd);
    }
  });
}

Part.prototype.toString = function() {
  return this.name + "is found in "+ this.relics.join(', ')+ " and is worth "+ this.ducats;
}

var Parts = function(data){
  this.parts = [];
  for (var index = 0; index < data.length; index++){
    this.parts.forEach(function(existingPart){
      if(data[index].part != existingPart.name){
        this.parts.push(new Part(data[index].part, data[index].ducats, data[index].relic));
      } else {
        existingPart.addRelic(data[index].relic);
      }
    });
  }
}

Parts.prototype.toString = function(){
  var partsString = md.codeMulti;
  this.parts.forEach(function(part){
    partsString += part.toString() + md.lineEnd;
  });
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
  var results = jsonQuery('relics[part~/'+query+'/i]', {
    data: relicData,
    allowRegexp: true
  });
  console.log(results.value);
  this.parts = new Parts(results.value);
  console.log(this.parts);
  callback(null, this.parts.toString());
}

//TODO: Need to populate relic for each
module.exports = RelicQuery;