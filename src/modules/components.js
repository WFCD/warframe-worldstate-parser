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
  if(typeof location === 'object')
  this.locations = location;
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
    self.locations.push(locationToAdd);
  }
}

Component.prototype.addAll = function(locations){
  for(i in locations){
    this.addLocation(locations[i]);
  }
}

Component.prototype.toString = function() {
  return this.name +" worth "+ this.ducats + ": "+md.lineEnd+"　　" + 
    this.locations.sort(RelicSort).join(","+md.lineEnd+"　　");
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
          existingComponent.addAll(reliquary.location.slice(0,5));
        }
      });
    }
    if(!partInParts){
      if(typeof reliquary.ducats === 'undefined'){
        reliquary.ducats = 0
      }
      self.components.push(new Component(reliquary.component, reliquary.ducats, reliquary.location.slice(0,5)));
    }
  });
}


Components.prototype.toString = function(){
  var componentString = md.codeMulti;
  componentString += this.components.join(md.doubleReturn);
  if(componentString === md.codeMulti){
    componentString += "Operator, no relics available for that query.";
  }
  componentString += md.blockEnd;
  return componentString;
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