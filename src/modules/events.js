var util = require('util');
var md = require('node-md-config');

var dsUtil = require('../lib/_utils.js');
var Reward = require('../lib/reward.js');

var strings = require(dsUtil.stringsPath);
var eventsData = require('../resources/eventsData.json');
var solNodes = require('../resources/solNodes.json');
var factions = require('../resources/factionsData.json');

/**
 * Create a new Events instance
 *
 * @constructor
 * @param {object} data Goals data
 */
var Events = function (data) {
  this.events = [];
  for (var index = 0; index < data.length; index++){
    this.events.push(new Event(data[index]));
  }
}

/**
 * Returns an array for this Events object
 * 
 * @return {array} Array of Event objects
 */
Events.prototype.getAll = function() {
  return this.events;
}

/**
 * Returns a string representation of this Events object
 * 
 * @return (string) The new string object
 */
Events.prototype.toString = function(){
  var eventsString = md.codeMulti;
  if(this.events.length > 0){
    for(var eventsInd = 0; eventsInd < this.events.length; eventsInd++){
      eventsString += this.events[eventsInd].toString();
    }
  } else {
    eventsString += 'Operator, there are no events right now, please be patient. I\'m sure something will happen.';
    console.log(this.events.length)
  }
  eventsString += md.blockEnd;
  return eventsString;
}

/**
 * Create a new Enemy instance
 *
 * @constructor
 * @param {object} data Enemy data
 */
var Event = function(data) {
  try{
    if(!data)
    {
      return;
    }
    this.id = data._id.$id;
    this.expiry = new Date(1000 * data.Expiry.sec);
    this.maximumScore = data.Goal;
    this.smallInterval = data.GoalInterim;
    this.largeInterval = data.GoalInterim2;
    this.faction = factions[data.Faction].value;
    this.description = strings[data.Desc.toLowerCase()].value;
    this.node = solNodes[data.Node.toLowerCase()].value;
    this.nodes = [];
    this.victim = solNodes[data.VictimNode].value;
    if(data.ConcurrentNodes){
      for(var indexNodes = 0; indexNodes<data.ConcurrentNodes.length; indexNodes++){
        this.nodes.push(solNodes[data.ConcurrentNodes[indexNodes]].value);
      }
    }
    if(data.ScoreLocTag){
      this.scoreLocTag = strings[data.ScoreLocTag].value;
    }
    if(data.Fomorian){
      this.scoreLocTag = "Formorian Assault Score";
    }
    this.rewards = []
    if(data.Reward){
      this.rewards.push(data.Reward);
    }
    for (var k in data) {
      if (k.indexOf('RewardInterim') !== -1) {
        this.rewards.push(new Reward(k));
      }
    }

  } catch (err) {
    console.log("Events: " + err);
    console.log(util.format("parsed data: %s id: %s,%sgoal: %s,%sfaction: %s,%sdescription: %s,%snode: %s,%svictim: %s",
                            md.lineEnd, this.id, md.lineEnd, 
                            this.maximumScore, md.lineEnd,
                            this.faction, md.lineEnd, 
                            this.description, md.lineEnd, 
                            this.node, md.lineEnd, 
                            this.victim));
    console.log(util.format("origin data: %s id: %s,%sgoal: %s,%sfaction: %s,%sdescription: %s,%snode: %s,%svictim: %s,%s%s",
                            md.lineEnd, data._id.$id, md.lineEnd, 
                            data.Goal, md.lineEnd,
                            data.Faction, md.lineEnd, 
                            data.Desc, md.lineEnd, 
                            data.Node, md.lineEnd, 
                            data.VictimNode, md.lineEnd,
                            data.Reward));
  } finally {
    return;
  }
}

/**
 * Returns a string representation of this event object
 * 
 * @return (string) The new string object
 */
Event.prototype.toString = function () {
  var eventString = util.format("%s : %s %s %s : %s %s", 
                                this.description, this.faction, md.lineEnd, 
                                this.scoreLocTag, this.maximumScore, md.lineEnd);  
  if(this.rewards.length){
    eventString += ' Rewards:';
  }
  for(var i in this.rewards){
    eventString += util.format("%s%s", this.rewards[i].toString(), md.lineEnd);
  }
  if(this.node){ 
    eventString+= util.format("Battle on %s%s", this.node, md.lineEnd);
  }
  if(this.victim){
    eventString += util.format("Protect %s%s", this.victim, md.lineEnd);
  }
  return eventString;
}

/** Returns true if the sortie has expired, false otherwise
 *
 * @return {boolean} Expired-ness of the sortie
 */
Event.prototype.isExpired = function() {
  return this.expiry.getTime() < Date.now()
}

/**
 * Check whether or not a Event instance has any undefined parameters, 
 *   in which case it is either a root, invalid, or corrupted
 *
 * @return {boolean} truthy if challenge has any undefined parameters
 */
Event.prototype.isAnyParamUndefined = function () {
  return typeof this.id === "undefined" 
    || typeof this.tag === "undefined"
    || typeof this.maximumScore === "undefined"
    || typeof this.faction === "undefined"
    || typeof this.description === "undefined"
    || typeof this.node === "undefined"
  
}

module.exports = Events;
