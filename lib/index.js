// ./lib/index.js

/**
 * Displays a string in the console
 *
 * @param {string} ip string to show in the console
 */

let connect = ip => {
  // check for the ip address
  if (!ip) {
    throw new Error(
      "You must include the ip address. Example: code-live 192.168.000.000"
    );
  }
  const express = require("express");
  let io = require("socket.io-client");
  let fs = require("fs");
  let message = require("./messageCtrl");
  let exec = require("child_process").execSync;

  let socket = null;
  const app = express();

  socket = io.connect(
    `http://${ip}:5050`,
    { reconnect: true }
  );

  socket.on("connect", () => {
    message.connected();
  });

  //Creating instructor dir
  fs.mkdir("instructor-code", err => {
    if (!err) message.instructorDirCreated();
    if (err && err.code === "EEXIST") {
      fs.rmdir(err.path, rmDirError => {
        if (rmDirError && rmDirError.code === "ENOTEMPTY") {
          message.instructorDirFound();
        } else {
          // create empty instructor-code directory
          fs.mkdir(err.path, err => {
            message.instructorDirCreated();
            if (err) throw err;
          });
        }
      });
    }
  });

  // creates/syncs a file
  socket.on("syncFile", readObj => {
    if (!fs.existsSync("./instructor-code")) {
      message.missingDir(`Sync failed for file/directory: '${readObj.path}'`);
      return;
    }
    fs.writeFile(
      `./instructor-code/${readObj.path}`,
      readObj.data || "",
      err => {
        if (err && err.code === "ENOENT") {
          let splitPath = readObj.path.split("/");
          splitPath.pop();
          let path = "./instructor-code";
          splitPath.forEach(dir => {
            if (!fs.existsSync(`${path}/${dir}`)) {
              fs.mkdirSync(`${path}/${dir}`);
            }
            path += `/${dir}`;
          });
          fs.writeFile(
            `./instructor-code/${readObj.path}`,
            readObj.data || "",
            err => {
              if (err) throw err;
            }
          );
        } else if (err) {
          throw err;
        }
      }
    );
  });

  // creates a new directory, if the directory already exists, it will delete the directory synchronously and then recreate the directory
  socket.on("createDir", readObj => {
    if (!fs.existsSync("./instructor-code")) {
      message.missingDir(`Sync failed for file/directory: '${readObj.path}'`);
      return;
    }
    fs.mkdir(`./instructor-code/${readObj.path}`, err => {
      if (err && err.code === "EEXIST") {
        fs.rmdirSync(`./instructor-code/${err.path}`);
        fs.mkdir(`./instructor-code/${err.path}`, err => {
          if (err) throw err;
        });
      }
    });
  });

  // deletes files
  socket.on("unlinkFile", readObj => {
    fs.unlink(`./instructor-code/${readObj.path}`, err => {
      if (err) throw err;
    });
  });

  // deletes directories
  socket.on("unlinkDir", readObj => {
    fs.rmdir(`./instructor-code/${readObj.path}`, err => {
      if (err) throw err;
    });
  });

  // Logs reason for disconnect
  socket.on("disconnect", reason => {
    switch (reason) {
      case "io server disconnect":
        message.connectionClosed();
        break;
      case "transport close":
        message.lostConnection();
        break;
    }
  });

  // Removes and re-creates the instructor folder in prep of
  // sync for all folders and files.
  socket.on("clear_instructor_folder", () => {
    message.codeSync();
    const PATH = "./instructor-code";
    if (!fs.existsSync(PATH)) {
      message.missingDir("Cannot sync all files");
      return;
    }
    // remove instructor folder and all contents
    exec(`rm -rf ${PATH}`);
    // recreate instructor folder
    fs.mkdirSync("instructor-code");
  });

  let port = 5000;
  app.listen(port, () => console.log(`Syncing on port ${port}`));
};

exports.connect = connect;
