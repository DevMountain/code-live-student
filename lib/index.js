// ./lib/index.js

/**
 * Displays a string in the console
 * 
 * @param {string} ip string to show in the console
 */

const express = require('express');
var io = require('socket.io-client');
var fs = require('fs');
var socket = null
const app = express();

function connect(ip) {
    socket = io.connect(`http://${ip}:5050`, {reconnect: true})

    socket.on('connect', function () {
        console.log(`live-sync is connected`);
    })

    socket.on('update', readObj => {
        fs.writeFile(readObj.path, readObj.data || '', function(err) {
            if(err) throw err;
        })
    })

    socket.on('createDir', readObj => {
        fs.mkdir(readObj.path, function(err) {
            if(err) throw err;
        })
    })
}

var port = 5000;
app.listen(port, () => console.log(`Listening on port: ${port}`))

exports.connect = connect;