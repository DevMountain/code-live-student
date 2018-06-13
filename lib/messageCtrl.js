let mainCtrl = require("./mainCtrl");
module.exports = {
  connected() {
    console.log(
      "\033[34m",
      "[connection]:",
      "\033[37m",
      "code-live is connected"
    );
  },
  instructorDirFound() {
    console.log(
      "\033[35m",
      "[message]:",
      "\033[37m",
      "Found existing 'instructor-code' directory"
    );
  },
  instructorDirCreated() {
    console.log(
      "\033[35m",
      "[message]:",
      "\033[37m",
      "'instructor-code' directory created"
    );
  },
  lostConnection() {
    console.log(
      "\033[35m",
      "[message]:",
      "\033[37m",
      "Connection to instructor's code-live server lost. Wait to reconnect."
    );
  },
  codeSync() {
    console.log(
      "\033[35m",
      "[message]:",
      "\033[37m",
      `Instructor started code sync at ${mainCtrl.getTime()}. May take a few seconds`
    );
  },
  missingDir(message) {
    console.log(
      "\033[31m",
      "[error]:",
      "\033[37m",
      `'instructor-code' directory missing. ${message}. Restart code-live process`
    );
  },
  connectionClosed() {
    console.log(
      "\033[35m",
      "[message]:",
      "\033[37m",
      "Instructor closed connection to code-live server. Stop the code-live process running in terminal."
    );
  }
};
