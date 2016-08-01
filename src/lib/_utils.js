var util = require('util');
var stringsObject = undefined;
if(process.env.WARFRAME_LANG_PATH){
  stringsObject = require(process.env.WARFRAME_LANG_PATH);
} else {
  stringsObject = require('warframe-worldstate-data').languages;
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
  var time = '';

  if (seconds >= 86400) { // Seconds in a day
    time += util.format('%dd', Math.floor(seconds / 86400));
    seconds = seconds % 86400;
  }
  if (seconds >= 3600) { // Seconds in an hour
    time += util.format(' %dh %dm', Math.floor(seconds / 3600)
                        , Math.floor((seconds % 3600) / 60));
    seconds = seconds % 3600;
  }
  time += util.format(' %ds', Math.floor(seconds / 60));
  
  return time;
}

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
      return object[path].value;
    } else {
      if(path.split("/").length > 1){
        console.error(path);
        return path.split("/").slice(-1)[0];
      }
      else{
        return path;
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
        return path.split("/").slice(-1)[0];
      }
      else{
        return path;
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