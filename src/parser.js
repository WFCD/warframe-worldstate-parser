var request = require('request');
var WorldState = require('./worldstate.js');

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
  this.lastRefresh = null;
  this.refreshing = false;
  this.refreshQueue = [];
}

Parser.prototype.dataIsCurrent = function() {
  return this.cache &&
    this.data.creation.getMilliseconds() - Date.now() > MAX_CACHED_TIME
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
    callback(null, new WorldState(data));
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
    callback(null, data.sorties);
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
    callback(null, data.conclaveChallenge.getConclaveWeeklies());
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
    callback(null, data.conclaveChallenge.getConclaveAll());
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
Parser.prototype.getDisoveredPersistentEnemies = function(callback) {
  this.getData(function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, data.enemies.getDiscovered());
  });
}
Parser.prototype.getDisoveredPersistentEnemiesString = function(callback) {
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
    callback(null, data.events.());
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
      return callback(err);
    }
    callback(null, data.news.getAll());
  });
}
Parser.prototype.getNewsString = function(callback) {
  this.getData(function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, data.news.toString());
  });
}
Parser.prototype.getUpdates = function(callback) {
  this.getData(function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, data.news.getUpdates());
  });
}
Parser.prototype.getUpdatesString = function(callback) {
  this.getData(function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, data.news.getUpdatesString());
  });
}
Parser.prototype.getPrimeAccess = function(callback) {
  this.getData(function(err, data) {
    if(err) {
      return callback(err);
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

//invasions
Parser.prototype.getInvasions = function(callback){
  this.getData(function(err, data) {
    if(err) {
      return callback(err);
    }
    callback(null, data.invasion);
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
    callback(null, data.deals);
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

module.exports = Parser;
