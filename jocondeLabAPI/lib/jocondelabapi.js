/*
 * jocondeLabAPI
 * https://github.com/lowki93/jocondelabapi
 *
 * Copyright (c) 2013 
 * Licensed under the MIT license.
 */

'use strict';

var utils = require('util'),
	events = require('events');

var DbServer = require('./db/server');
var dbServer = new DbServer();

var WebServer = require('./WebServer/server');
var webServeur = new WebServer();

var JocondeLabAPI;

exports.JocondeLabAPI = JocondeLabAPI = function() {
		this.pubsub = new events.EventEmitter();
};
//utils.inherits(JocondeLabAPI, events.EventEmitter);

exports.JocondeLabAPI.prototype.start = function() {
	dbServer.start(this.pubsub);
	webServeur.start(this.pubsub);
	console.log('started');
}

var api = new JocondeLabAPI();
api.start();