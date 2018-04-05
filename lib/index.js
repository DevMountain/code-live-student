// ./lib/index.js

/**
 * Displays a string in the console
 * 
 * @param {string} ip string to show in the console
 */

const express = require('express');
let io = require('socket.io-client');
let fs = require('fs');
let socket = null
const app = express();

let connect = (ip) => {
    socket = io.connect(`http://${ip}:5050`, {reconnect: true})

    socket.on('connect', () => {
        console.log(`live-sync is connected`);
    })

    socket.on('syncFile', readObj => {
        fs.writeFile(readObj.path, readObj.data || '', err => {
            if(err) throw err
        })
    })

    socket.on('createDir', readObj => {
        fs.mkdir(readObj.path, err => {
            if(err && err.code === 'EEXIST') {
                fs.rmdirSync(err.path)
                fs.mkdir(err.path, err => {
                    if(err) throw err
                })   
            };
        })
    })

    socket.on('unlinkFile', readObj => {
        fs.unlink(readObj.path, err => {
            if(err) throw err;
        })
    })

    socket.on('unlinkDir', readObj => {
        fs.rmdir(readObj.path, err => {
            if(err) throw err;
        })
    })
}

let port = 5000;
app.listen(port, () => console.log(`Syncing on port ${port}`))

exports.connect = connect;