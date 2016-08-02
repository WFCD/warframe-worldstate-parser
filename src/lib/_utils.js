var util = require('util');
var stringsObject = undefined;
if(process.env.WARFRAME_LANG_PATH){
  stringsObject = require(process.env.WARFRAME_LANG_PATH);
} else {
  stringsObject = require('warframe-worldstate-data').languages;
}

var toTitleCase = function (str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

/**
 * Converts the difference between two Date object to a String.
 * Convenience function
 *
 * @param {integer} millis  Difference in milliseconds between the two dates
 *
 * @return {string}
 */
var timeDeltaToString = function (millis) {
  var seconds = millis / 1000;
  var timePieces = [];

  if (seconds >= 86400) { // Seconds in a day
    timePieces.push(util.format('%dd', Math.floor(seconds / 86400)));
    seconds = Math.floor(seconds) % 86400;
  }
  if (seconds >= 3600) { // Seconds in an hour
    timePieces.push(util.format('%dh', Math.floor(seconds / 3600)));
    seconds = Math.floor(seconds) % 3600;
  }
  if(seconds > 60){
    timePieces.push(util.format('%dm', Math.floor(seconds/60)));
    seconds = Math.floor(seconds) % 60;
  }
  if(seconds > 0)
  {
    timePieces.push(util.format('%ds', Math.floor(seconds)));
  }
  return timePieces.join(' ');
};

var getStringsObject = function(){
  if(typeof stringsObject  !==  'undefined')
    return stringsObject;
  else {
    if(process.env.WARFRAME_LANG_PATH){
      stringsObject = require(process.env.WARFRAME_LANG_PATH);
    } else {
      stringsObject = require('warframe-worldstate-data').languages;
    }
    return stringsObject;
  }
}

var safeGetLocalized = function(path, object){
  if(typeof path !== 'undefined') {
    if(typeof object[path] !== 'undefined'){
      return toTitleCase(object[path].value);
    } else {
      if(path.split("/").length > 1){
        console.error(path);
        return toTitleCase(path.split("/").slice(-1)[0]);
      }
      else{
        return toTitleCase(path);
      }
    }
  } else {
    return "";
  }
}
var safeGetObj = function(path, object){
  if(typeof path !== 'undefined') {
    if(typeof object[path] !== 'undefined'){
      return object[path];
    } else {
      if(path.split("/").length > 1){
        console.error(path);
        return toTitleCase(path.split("/").slice(-1)[0]);
      }
      else{
        return toTitleCase(path);
      }
    }
  } else {
    return "";
  }
}

var getLocalized = function(path){   
  try{
    return safeGetLocalized(path.toLowerCase(), getStringsObject());
  } catch (err) { 
    console.error("Cannot return " + err);
  }
}

var getSolNodeValue = function(path, solNodes){
  var nodeObj = safeGetObj(path, solNodes);
  return nodeObj.value ? nodeObj.value : nodeObj;
}
var getSolNodeEnemy = function(path, solNodes){
  var nodeObj = safeGetObj(path, solNodes);
  return nodeObj.enemy ? nodeObj.enemy : nodeObj;
}
var getSolNodeType = function(path, solNodes){
  var nodeObj = safeGetObj(path, solNodes);
  return nodeObj.type ? nodeObj.type : nodeObj;
}

module.exports = {
  timeDeltaToString,
  safeGetLocalized,
  getStringsObject,
  getLocalized,
  getSolNodeValue,
  getSolNodeEnemy,
  getSolNodeType
}