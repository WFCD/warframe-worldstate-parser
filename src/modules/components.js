var md = require('node-md-config');
var jsonQuery = require('json-query');
var componentData =  require('warframe-worldstate-data').components;

var toTitleCase = function (str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

var RelicSort = function(a, b){
  var aVal = setRelicValForCompare(a);
  var bVal = setRelicValForCompare(b);
  
  if(aVal<bVal)
    return -1;
  else if(aVal===bVal)
    return 0;
  else if (aVal>bVal)
    return 1;
}

var setRelicValForCompare = function(a){
  var lithReg = /lith/ig;
  var mesoReg = /meso/ig;
  var neoReg = /neo/ig;
  var axiReg = /axi/ig;
  
  if(lithReg.test(a))
    return 0;
  else if (mesoReg.test(a))
    return 1;
  else if (neoReg.test(a))
    return 2;
  else if (axiReg.test(a))
    return 3;
  else 
    return 4;
}

var Component = function(name, ducats, location){
  this.name = toTitleCase(name);
  this.ducats = ducats;
  this.locations = [location];
}

Component.prototype.addLocation = function(locationToAdd){
  var self = this;
  var locationInLocations = false;
  self.locations.forEach(function(existingLocation){
    if((locationToAdd.toLowerCase() === existingLocation.toLowerCase())){
      relicInRelics = true;
    }
  });
  if(!locationInLocations){
    self.relics.push(locationToAdd);
  }
}

Component.prototype.toString = function() {
  return this.name +" worth "+ this.ducats + ": "+md.lineEnd+"　　" + 
    this.relics.sort(RelicSort).join(","+md.lineEnd+"　　");
}

var Components = function (data) {
  this.components = new Array();
  var self = this;
  data.forEach(function (reliquary) {
    var partInParts = false;
    var indexOfPart = null;
    if (self.components.length > 0) {
      self.components.forEach(function (existingComponent, index) {
        if ((reliquary.component.toLowerCase() === existingComponent.name.toLowerCase())) {
          partInParts = true;
          existingComponent.addLocation(reliquary.location + " ("+reliquary.rarity+")");
        }
      });
    }
    if(!partInParts){
      self.components.push(new Part(reliquary.component, reliquary.ducats, reliquary.location + " ("+reliquary.rarity+")"));
    }
  });
}


Components.prototype.toString = function(){
  var partsString = md.codeMulti;
  partsString += this.parts.join(md.doubleReturn);
  if(partsString === md.codeMulti){
    partsString += "Operator, no relics available for that query.";
  }
  partsString += md.blockEnd;
  return partsString;
}

Components.prototype.getAll = function(){
  return this.components;
}

var LocationQuery = function(query, callback){
  this.query = query;
  var results = jsonQuery('components[*component~/'+query+'/i]', {
    data: componentData,
    allowRegexp: true
  });
  this.components = new Components(results.value);
  callback(null, this.components.toString());
}

module.exports = LocationQuery;