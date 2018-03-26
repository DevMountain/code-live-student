const express = require('express');
var io = require('socket.io-client');
var fs = require('fs');
var socket = io.connect('http://localhost:3007', {reconnect: true})
const app = express();

socket.on('connect', function () {
    console.log(`connected`);
})

socket.on('update', readObj => {
    fs.writeFile(readObj.path, readObj.data, function(err) {
        if(err) throw err;
    })
})

var port = 5000;
app.listen(port, () => console.log(`Listening on port: ${port}`))