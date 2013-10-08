'use strict'

var Sequelize = require('sequelize');

var Notice = function(sequelize) {
	this.sequelize = sequelize;
	this.model = sequelize.define('core_notice', {
		ref: Sequelize.STRING,
		aptn: Sequelize.STRING,
		dims: Sequelize.STRING,
		domn: Sequelize.STRING,
		www: Sequelize.STRING,
		tech: Sequelize.STRING,
		titr: Sequelize.STRING
	}, {
		freezeTableName: true
	});
};

/*var Notice = function(sequelize) {
	this.sequelize = sequelize;
	this.model = sequelize.define('core_noticeimage', {
		relative_url: Sequelize.STRING,
	}, {
		freezeTableName: true
	});
};*/

Notice.prototype.define = function(sequelize) {

	return this.model;
}

Notice.prototype.search = function(defered, search) {
	this.model.findAll({where: ["titr ILIKE ?", search]}).success(function (rows
		) {
		console.log('toto');
		defered.resolve(rows);
	});
}

Notice.prototype.terms = function(defered) {
	/*this.model.findAll({where: ["id < ?", 100]}).success(function (rows
		) {
		defered.resolve(rows);
	});*/

	this.model.findAll({where: ["titr ILIKE '%Damien%'"]}).success(function (rows
		) {
		defered.resolve(rows);
	});
}

Notice.prototype.term = function(defered, id) {
	this.model.find(id).success(function (row) {
		defered.resolve(row);
	});
}

module.exports = Notice;