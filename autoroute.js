'use strict';
const debug = require('debug')('hapi-recursive-route');
const Path = require('path');
const walk = require('fs-walk');

const testDefault = /\.(js)$/;

exports.register = (server, baseOptions, next) => {
	debug('AutoRoute Registered', baseOptions);

	return walk.walk(baseOptions.dir, (dir, filename, stat, next) =>{
		debug('filename:', filename, ', ', dir,', ', stat.isFile());

		if(stat.isFile()){
			const modulePath = Path.join(dir, filename);
			debug('Registering:', modulePath);
            const routeFile = require(modulePath);
            server.route(routeFile.routes);
		}
		next();
	}, (err)=>{
		if(err){
			return next(err);
		}

		debug('Success');
		return next();
	});
};

exports.register.attributes = {
	pkg: require('./package.json')
};