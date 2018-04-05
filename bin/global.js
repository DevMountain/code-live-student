#!/usr/bin/env node

// Delete the 0 and 1 argument (node and script.js)

let args = process.argv.splice(process.execArgv.length + 2);

let ip = args[0];

let myLibrary = require('../lib/index.js');

myLibrary.connect(ip)