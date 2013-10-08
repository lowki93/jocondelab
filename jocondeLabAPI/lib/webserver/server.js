'use strict';

var restify = require('restify');
var q = require('q');

var WebServer;

WebServer = function() {
};

WebServer.prototype.start = function(pubsub) {
	this.pubsub = pubsub;
	this.server = restify.createServer();
	this.server.use(restify.CORS());
	this.server.use(restify.fullResponse());
	this.server.listen(9001, function() {
		console.log('WebServer started');
	});
	this.respondToNotices();
	this.respondToTerm();
	this.respondToSearch();
	/*server.get('/hello/:name', function(request, response) {
		response.send('hello '+request.params.name);
	})*/
};

WebServer.prototype.respondToSearch = function() {
	this.server.get('/query/:search', function(req, res) {
		var futureRows = q.defer();
		var response = req.params.search;
		this.pubsub.emit('search', response, futureRows);
		futureRows.promise.then(function(rows) {
			res.send(rows);
		});
	}.bind(this));
};

WebServer.prototype.respondToNotices = function() {
	this.server.get('/terms', function(req, res) {
		var futureRows = q.defer();
		this.pubsub.emit('terms', futureRows);
		futureRows.promise.then(function(rows) {
			res.send(rows);
		});
	}.bind(this));
};

WebServer.prototype.respondToTerm = function() {
	this.server.get('/terms/:id', function(req, res) {
		var futureId = req.params.id;
		var futureRows = q.defer();
		this.pubsub.emit('term', futureRows, futureId);
		futureRows.promise.then(function(rows) {
			res.send(rows);
		});
	}.bind(this));
};

module.exports = WebServer;