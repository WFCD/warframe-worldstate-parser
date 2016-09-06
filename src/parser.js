var request = require('request');
var WorldState = require('./worldstate.js');
var Reward = require('./lib/reward.js');

var MAX_CACHED_TIME = process.env.WORLDSTATE_CACHE_LENGTH || 300000;

const platformURL = {
  PC: 'http://content.warframe.com/dynamic/worldState.php',
  PS4: 'http://content.ps4.warframe.com/dynamic/worldState.php',
  X1: 'http://content.xb1.warframe.com/dynamic/worldState.php'
}

var Parser = function (platform) {
  this.platform = platform;
  this.cache = null;
  this.events = null;
  this.news = null;
  this.sorties = null;
  this.globalModifiers = null;
  this.fissures = null;
  this.syndicates = null;
  this.simaris = null;
  this.lastRefresh = null;
  this.refreshing = false;
  this.refreshQueue = [];
}

Parser.prototype.dataIsCurrent = function() {
  return this.cache &&
     Date.now() - this.cache.creation < MAX_CACHED_TIME
}

Parser.prototype.getData = function(callback) {
  if(this.dataIsCurrent()) {
    callback(null, this.cache);
  } else {
    this.refresh(callback);
  }
}

Parser.prototype.refresh = function(callback) {
  var self = this;

  this.refreshQueue.push(callback);
  if(!this.refreshing) {
    this.refreshing = true;

    this.retrieve(function(err, data) {
      if(!err) {
        self.cache = data;
        self.lastRefresh = Date.now();
      }
      self.refreshing = false;
      self.processRefreshQueue(err, data);
    });
  }
}

Parser.prototype.retrieve = function(callback) {
  var url = platformURL[this.platform];
  var self = this;
  request.get(url, function(err, response, body) {
    if(err) {
      return callback(err);
    }
    if(response.statusCode !== 200) {
      var error
      error = new Error(url + ' returned HTTP status ' + response.statusCode)
      return callback(error);
    }
    var data

    try {
      data = JSON.parse(body);
    } catch(e) {
      data = null;
    }

    if(!data) {
      var error
      error = new Error('Invalid JSON from ' + url);
      return callback(error);
    }
    callback(null, new WorldState(data, self.platform));
  });
}

Parser.prototype.processRefreshQueue = function(err, data) {
  while(this.refreshQueue.length) {
    this.refreshQueue.shift()(err, data);
  }
}

//Sortie
Parser.prototype.getSortie = function(callback){
  this.getData(function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, data.sorties.getSortie());
  }); 
}
Parser.prototype.getSortieString = function(callback){
  this.getSortie(function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, data.toString());
  });
}

//Conclave
Parser.prototype.getConclaveDailies = function(callback){
  this.getData(function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, data.conclaveChallenge.getDailies());
  });
}
Parser.prototype.getConclaveDailiesString = function(callback){
  this.getData(function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, data.conclaveChallenge.getDailiesAsString());
  });
}
Parser.prototype.getConclaveWeeklies = function(callback){
  this.getData(function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, data.conclaveChallenge.getWeeklies());
  });
}
Parser.prototype.getConclaveWeekliesString = function(callback){
  this.getData(function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, data.conclaveChallenge.getWeekliesAsString());
  });
}
Parser.prototype.getConclaveAll = function(callback){
  this.getData(function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, data.conclaveChallenge.getAll());
  });
}
Parser.prototype.getConclaveAllString = function(callback){
  this.getData(function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, data.conclaveChallenge.getAllAsString());
  });
}

//Persistent enemies
Parser.prototype.getAllPersistentEnemies = function(callback) {
  this.getData(function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, data.enemies.getAll());
  });
}
Parser.prototype.getAllPersistentEnemiesString = function(callback) {
  this.getData(function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, data.enemies.getAllAsString());
  });
}
Parser.prototype.getDiscoveredPersistentEnemies = function(callback) {
  this.getData(function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, data.enemies.getDiscovered());
  });
}
Parser.prototype.getDiscoveredPersistentEnemiesString = function(callback) {
  this.getData(function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, data.enemies.getDiscoveredAsString());
  });
}
Parser.prototype.getHiddenPersistentEnemies = function(callback) {
  this.getData(function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, data.enemies.getHidden());
  });
}
Parser.prototype.getHiddenPersistentEnemies = function(callback) {
  this.getData(function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, data.enemies.getHiddenAsString());
  });
}

//events
Parser.prototype.getEvents = function(callback) {
  this.getData(function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, data.events.getAll());
  });
}
Parser.prototype.getEventsString = function(callback) {
  this.getData(function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, data.events.toString());
  });
}

//news
Parser.prototype.getNews = function(callback) {
  this.getData(function(err, data) {
    if(err) {
      return callback(err, null);
    }
    callback(null, data.news.getAll());
  });
}
Parser.prototype.getNewsString = function(callback) {
  this.getData(function(err, data) {
    if(err) {
      return callback(err, null);
    }
    callback(null, data.news.toString());
  });
}
Parser.prototype.getUpdates = function(callback) {
  this.getData(function(err, data) {
    if(err) {
      return callback(err, null);
    }
    callback(null, data.news.getUpdates());
  });
}
Parser.prototype.getUpdatesString = function(callback) {
  this.getData(function(err, data) {
    if(err) {
      return callback(err, null);
    }
    callback(null, data.news.getUpdatesString());
  });
}
Parser.prototype.getPrimeAccess = function(callback) {
  this.getData(function(err, data) {
    if(err) {
      return callback(err, null);
    }
    callback(null, data.news.getPrimeAccess());
  });
}
Parser.prototype.getPrimeAccessString = function(callback) {
  this.getData(function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, data.news.getPrimeAccessString());
  });
}

//fissures
Parser.prototype.getFissures = function(callback){
  this.getData(function(err, data){
    if(err) {
      return callback(err);
    }
    if(typeof data.fissures !== 'undefined')
      callback(null, data.fissures.getAll());
  })
}
Parser.prototype.getFissureString = function(callback){
  this.getData(function(err, data){
    if(err) {
      return callback(err);
    }
    if(typeof data.fissures !== 'undefined')
      callback(null, data.fissures.getString());
  })
}

//Global Modifiers
Parser.prototype.getGlobalModifers = function(callback) {
  this.getData(function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, data.globalModifiers.getAll());
  });
}
Parser.prototype.getGlobalModifersString = function(callback) {
  this.getData(function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, data.globalModifiers.toString());
  });
}

//Syndicates
Parser.prototype.getAllSyndicates = function(callback) {
  this.getData(function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, data.syndicates.getAll());
  });
}
Parser.prototype.getAllSyndicatesAsString = function(callback) {
  this.getData(function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, data.syndicates.getAllAsString());
  });
}
Parser.prototype.getArbitersOfHexisMissions = function(callback) {
  this.getData(function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, data.syndicates.getArbitersOfHexisMissions());
  });
}
Parser.prototype.getCephalonSudaMissions = function(callback) {
  this.getData(function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, data.syndicates.getCephalonSudaMissions());
  });
}
Parser.prototype.getNewLokaMissions = function(callback) {
  this.getData(function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, data.syndicates.getNewLokaMissions());
  });
}
Parser.prototype.getPerrinSequenceMissions = function(callback) {
  this.getData(function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, data.syndicates.getPerrinSequenceMissions());
  });
}
Parser.prototype.getSteelMeridianMissions = function(callback) {
  this.getData(function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, data.syndicates.getSteelMeridianMissions());
  });
}
Parser.prototype.getRedVeilMissions = function(callback) {
  this.getData(function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, data.syndicates.getRedVeilMissions());
  });
}

Parser.prototype.getArbitersOfHexisString = function(callback) {
  this.getData(function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, data.syndicates.getArbitersOfHexisString());
  });
}
Parser.prototype.getCephalonSudaString = function(callback) {
  this.getData(function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, data.syndicates.getCephalonSudaString());
  });
}
Parser.prototype.getNewLokaString = function(callback) {
  this.getData(function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, data.syndicates.getNewLokaString());
  });
}
Parser.prototype.getPerrinSequenceString = function(callback) {
  this.getData(function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, data.syndicates.getPerrinSequenceString());
  });
}
Parser.prototype.getSteelMeridianString = function(callback) {
  this.getData(function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, data.syndicates.getSteelMeridianString());
  });
}
Parser.prototype.getRedVeilString = function(callback) {
  this.getData(function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, data.syndicates.getRedVeilString());
  });
}

//Simaris
Parser.prototype.getSimaris = function(callback) {
  this.getData(function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, data.simaris.getSimaris());
  });
}
Parser.prototype.getSimarisString = function(callback) {
  this.getData(function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, data.simaris.toString());
  });
}


//invasions
Parser.prototype.getInvasions = function(callback){
  this.getData(function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, data.invasion.getAll());
  });
}
Parser.prototype.getInvasionsString = function(callback){
  this.getData(function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, data.invasion.toString());
  });
}

//alerts
Parser.prototype.getAlerts = function(callback) {
  this.getData(function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, data.alerts.getAll());
  });
}
Parser.prototype.getAlertsString = function(callback) {
  this.getData(function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, data.alerts.getAllString());
  });
}

//baro
Parser.prototype.getVoidTrader = function(callback) {
  this.getData(function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, data.voidTrader);
  });
}
Parser.prototype.getVoidTraderString = function(callback) {
  this.getData(function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, data.voidTrader.toString());
  });
}

//darvo
Parser.prototype.getDeals = function(callback){
  this.getData(function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, data.deals.getAll());
  });
}
Parser.prototype.getDealsString = function(callback) {
  this.getData(function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, data.deals.toString());
  });
}

//flash deals
Parser.prototype.getFlashDeals = function(callback) {
  this.getData(function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, data.flashDeals);
  });
}
Parser.prototype.getFlashDealsString = function(callback) {
  this.getData(function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, data.flashDeals.toString());
  });
}

//Dark sectors
Parser.prototype.getDarkSectors = function(callback) {
  this.getData(function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, data.darkSectors.getAll());
  });
}
Parser.prototype.getDarkSectorsString = function(callback) {
  this.getData(function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, data.darkSectors.toString());
  });
}

module.exports = {
  Parser,
  Reward
}
