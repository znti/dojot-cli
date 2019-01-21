#!/usr/bin/env node

let dojotLibrary = require('../../dojot-web');
//let dojotLibrary = require('@znti/dojot-web');
let configs = require('../configs');

// Sets the base point for dojot.
let dojotHost = configs.dojot.host;

// This parameter on init() is actually optional. 
// If nothing is passed, admin/admin is assumed
// The only reason its here is to guide users in need of using custom credentials
let credentials = configs.dojot.credentials;

let {authToken} = credentials;

//First two arguments passed are node and .js file, so we skip them
let args = process.argv;
args.splice(0, 2);

let [command, resource, data] = args;

if(!command) {
	console.log('Usage: dojot command [resource] [data]');
	console.log('\tFor more details, check: https://github.com/znti/dojot-cli');
	return;
}

let run = async () => {
	let dojot = new dojotLibrary();
	await dojot.configure(dojotHost);
	if(authToken) {
		await dojot.initializeWithAuthToken(authToken);
	} else {
		await dojot.initializeWithCredentials(credentials);
	}
	console.log('Client is initialized');
	console.log(dojot);

	let {Templates, Devices} = dojot;

	switch(command.toLowerCase()) {
		case 'hello-world':
			await helloWorld(Templates, Devices);
			break;
		case 'powerwash':
			await powerwash(Templates, Devices);
			break;
		default:
			console.log(`Unknown command ${command}. Nothing to do.`);
	}
}

run().then(() => {
	console.debug('dojot-cli executed successfully');
}).catch((error) => {
	console.error('Failed to run dojot-cli:', error);
});

helloWorld = async (Templates, Devices) => {
	console.log('Dojot client started correctly. Loading data..');
	let devices = await Devices.get() || [];
	let templates = await Templates.get() || [];
	console.log(`Got ${devices.length} devices and ${templates.length} templates`);
	console.log('Everything seems to be working as expected');
}

powerwash = async (Templates, Devices) => {
	console.log('Loading data references..');
	let devices = await Devices.get() || [];
	let templates = await Templates.get() || [];

	console.log(`Got ${devices.length} devices and ${templates.length} templates`);
	console.log('Cleaning things up');

	await devices.map(d => Devices.delete(d));
	console.log('Devices were deleted');

	// Apparently device-manager needs a little time to breathe
	await sleep(1000);

	await templates.map(t => Templates.delete(t));
	console.log('Templates were deleted');
}

sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}
