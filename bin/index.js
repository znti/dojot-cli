#!/usr/bin/env node

let dojot = require('@znti/dojot-web');

// Sets the base point for dojot.
let dojotHost = 'http://localhost:8000';

// This parameter on init() is actually optional. 
// If nothing is passed, admin/admin is assumed
// The only reason its here is to guide users in need of using custom credentials
let credentials = {username: 'admin', passwd: 'admin'}

//First two arguments passed are node and .js file, so we skip them
let args = process.argv;
args.splice(0, 2);

let [command, resource, data] = args;

if(!command) {
	console.log('Usage: dojot command [resource] [data]');
	console.log('\tFor more details, check: https://github.com/znti/dojot-cli');
	return;
}

dojot.init(dojotHost, credentials).then(dojotClient => {
	let {Templates, Devices} = dojotClient;
	switch(command.toLowerCase()) {
		case 'hello-world':
			helloWorld(Templates, Devices);
			break;
		case 'powerwash':
			powerwash(Templates, Devices);
			break;
		default:
			console.log(`Unknown command ${command}. Nothing to do.`);
	}
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
