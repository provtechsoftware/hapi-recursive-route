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
            routeFile.routes(server);
		}
		next();
	}, (err)=>{
		if(err){
			return next(err);
		}

		debug('Ended');
		return next();
	});
};

exports.register.attributes = {
	name: 'AutoRoutes',
    version: '0.0.1'
};