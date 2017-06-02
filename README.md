## Hapi Recursive Route

Add routes recursively to your project. Never blame yourself to forget to add one route again!

Example
```nodejs
'use string';

const Hapi  = require('hapi');
const server = new Hapi.Server();	
const debug = require('debug')('startup')

server.connection({port:3000, host:'localhost'});

server.register({
	register:require('hapi-recursive-route'),
	options:{
		dir:`${__dirname}/routes`
	}
}, (err) => {
	if(err){
		debug('Error');
		return;
	}

	server.start( (err) => {
		if(err){
			throw err;
		}
		debug(`Server running at: ${server.info.uri}`);
	});
});

```