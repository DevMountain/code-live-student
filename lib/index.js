// ./lib/index.js

/**
 * Displays a string in the console
 * 
 * @param {string} ip string to show in the console
 */

let connect = (ip) => {
    const express = require('express');
    let io = require('socket.io-client');
    let fs = require('fs');
    let socket = null;
    const app = express();

    socket = io.connect(`http://${ip}:5050`, {reconnect: true})

    socket.on('connect', () => {
        console.log(`code-live is connected`);
    })

    //Creating instructor dir 
    fs.mkdir('instructor-code', err => {
        if(err && err.code === 'EEXIST') {
            fs.rmdir(err.path, rmDirError => {
                if (rmDirError && rmDirError.code === "ENOTEMPTY") {
                    console.log('Message: instructor-code directory already exists')
                } else {
                    // create empty instructor-code directory
                    fs.mkdir(err.path, err => {
                        console.log('Message: instructor-code directory created')
                        if(err) throw err
                    })
                }

            })
        };
    })
    

    // creates/syncs a file
    socket.on('syncFile', readObj => {
        fs.writeFile(`./instructor-code/${readObj.path}`, readObj.data || '', err => {
            if (err.code === 'ENOENT') {
                let splitPath = readObj.path.split('/')
                splitPath.pop();
                let path = './instructor-code'
                splitPath.forEach( dir => {
                    fs.mkdirSync(`${path}/${dir}`);
                    path += `/${dir}`
                })
                fs.writeFile(`./instructor-code/${readObj.path}`, readObj.data || '', err => {
                    if(err) throw err;
                })
            } else {
                throw err;
            }
        })
    })

    // creates a new directory, if the directory already exists, it will delete the directory synchronously and then recreate the directory
    socket.on('createDir', readObj => {
        fs.mkdir(`./instructor-code/${readObj.path}`, err => {
            if(err && err.code === 'EEXIST') {
                fs.rmdirSync(`./instructor-code/${err.path}`)
                fs.mkdir(`./instructor-code/${err.path}`, err => {
                    if(err) throw err
                })   
            };
        })
    })

    // deletes files
    socket.on('unlinkFile', readObj => {
        fs.unlink(`./instructor-code/${readObj.path}`, err => {
            if(err) throw err;
        })
    })

    // deletes directories
    socket.on('unlinkDir', readObj => {
        fs.rmdir(`./instructor-code/${readObj.path}`, err => {
            if(err) throw err;
        })
    })
    
    let port = 5000;
    app.listen(port, () => console.log(`Syncing on port ${port}`))
}


exports.connect = connect;