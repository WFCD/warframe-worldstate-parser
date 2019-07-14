'use strict';

const EventEmitter = require('events');

const http = require('http');
const https = require('https');

class Cache extends EventEmitter {
  constructor(url, timeout, {
    parser, promiseLib = Promise, logger, delayStart = true, opts, maxListeners = 45, useEmitter = true,
  } = {}) {
    super();
    this.url = url;
    this.protocol = this.url.startsWith('https') ? https : http;

    this.timeout = timeout;
    this.currentData = null;
    this.updating = null;
    this.Promise = promiseLib;
    this.parser = parser;
    this.hash = null;
    this.logger = logger;
    this.delayStart = delayStart;
    this.opts = opts;
    this.useEmitter = useEmitter;
    if (useEmitter) {
      this.setMaxListeners(maxListeners);
    }
    if (!delayStart) {
      this.startUpdating();
    }
  }

  getData() {
    if (this.delayStart) {
      this.startUpdating();
    }
    if (this.updating) {
      return this.updating;
    }
    return this.Promise.resolve(this.currentData);
  }

  startUpdating() {
    this.updateInterval = setInterval(() => this.update(), this.timeout);
    this.update();
  }

  stopUpdating() {
    clearInterval(this.updateInterval);
  }

  update() {
    this.updating = this.httpGet().then(async (data) => {
      this.currentData = this.parser(data, this.opts);
      if (this.useEmitter) {
        setTimeout(async () => this.emit('update', await this.currentData), 2000);
      }

      this.updating = null;
      return this.currentData;
    }).catch((err) => {
      this.updating = null;
      throw err;
    });
  }

  httpGet() {
    return new this.Promise((resolve, reject) => {
      const request = this.protocol.get(this.url, (response) => {
        if (response.statusCode < 200 || response.statusCode > 299) {
          reject(new Error(`Failed to load page, status code: ${response.statusCode}`));
        }
        const body = [];
        response.on('data', chunk => body.push(chunk));
        response.on('end', () => resolve(body.join('')));
      });
      request.on('error', err => reject(err));
    });
  }
}

module.exports = Cache;
