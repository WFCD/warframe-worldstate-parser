var jsonQuery = require('json-query');
var relicData =  require('warframe-worldstate-data').relics;
var Part = function(name, ducats){
  this.name = name;
  this.ducats = ducats;
  this.relics = [];
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

var Parts = function(data){
  this.parts = [];
  for (var index = 0; index < data.length; index++){
    this.parts.push(new Part(data[index].part, data[index].ducats));
    this.parts.forEach(function(existingPart){
    if(data[index].part != existingPart.name){
      this.parts.push(new Part(data[index].part, data[index].ducats));
    } else {
      return;
    }
  });
  }
}
Parts.prototype.getAll = function(){
  return this.parts;
}

var RelicQuery = function(query){
  this.query = query;
  var results = jsonQuery('relics[part~/*'+query+'*/i]', {
    data: relicData
  });
  this.parts = new Parts(results).getAll();
}

//TODO: Need to populate relic for each