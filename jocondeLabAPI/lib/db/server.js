'use strict';

var Squelize = require("sequelize");
var Notice = require('./notice');

var Dbserver;

Dbserver = function(pubsub) {
	this.pubsub = pubsub;
};

Dbserver.prototype.start = function(pubsub) {
	this.pubsub = pubsub;
	console.log('db started');
	this.sequelize = new Squelize('jocondelab', 'lowki', '', {
		dialect: 'postgres'
	});
	var notice = new Notice(this.sequelize);
	this.pubsub.on('terms', function(defered) {
		notice.terms(defered);

	}.bind(this));

	this.pubsub.on('search', function(search, defered) {
		notice.search(defered,search);
		/*this.sequelize.query("SELECT * FROM core_notice WHERE titr ILIKE :search", null, {raw: true}, {search: search}).success(function(rows){
			console.log(rows);
			//this.pubsub.emit('termsrows', rows);
			defered.resolve(rows);
		}.bind(this));*/
	}.bind(this));

	this.pubsub.on('term', function(defered, id) {
		console.log(id);
		notice.term(defered, id);
		/*this.sequelize.query("SELECT * FROM core_notice WHERE id = :id", null, {raw: true}, {id: id}).success(function(rows){
			console.log(rows);
			//this.pubsub.emit('termsrows', rows);
			defered.resolve(rows);
		}.bind(this));*/
	}.bind(this));
};

module.exports = Dbserver;