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

    if (seconds >= 86400) { // Seconds in a day
        return util.format('%dd', Math.floor(seconds / 86400));
    } else if (seconds >= 3600) { // Seconds in an hour
        return util.format('%dh %dm', Math.floor(seconds / 3600)
            , Math.floor((seconds % 3600) / 60));
    } else {
        return util.format('%dm', Math.floor(seconds / 60));
    }
}

var getStringsObject = function(){
  return stringsObject;
}

var safeGetLocalized = function(path, object){
  if(typeof object[path] !== 'undefined'){
    return object[path].value;
  } else {
    if(path.split("/").length > 1)
      return path.split("/").slice(-1)[0];
    else{
      return path;
    }
  }
}

var safeGetObj = function(path, object){
  if(typeof object[path] !== 'undefined'){
    return object[path];
  } else {
    if(path.split("/").length > 1)
      return path.split("/").slice(-1)[0];
    else{
      return path;
    }
  }
}

var getLocalized = function(path){
  return safeGetLocalized(path, stringsObject);
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