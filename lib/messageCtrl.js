let mainCtrl = require('./mainCtrl');
module.exports = {
  connected() {
    console.log(
      '\033[34m',
      '[connection]:',
      '\033[37m',
      'code-live is connected'
    );
  },
  instructorDirFound() {
    console.log(
      '\033[35m',
      '[message]:',
      '\033[37m',
      "Found existing '__instructor-code__' directory"
    );
  },
  instructorDirCreated() {
    console.log(
      '\033[35m',
      '[message]:',
      '\033[37m',
      "'__instructor-code__' directory created"
    );
  },
  lostConnection() {
    console.log(
      '\033[35m',
      '[message]:',
      '\033[37m',
      "Connection to instructor's code-live server lost. Wait to reconnect."
    );
  },
  codeSync() {
    console.log(
      '\033[35m',
      '[message]:',
      '\033[37m',
      `Instructor started code sync at ${mainCtrl.getTime()}. May take a few seconds`
    );
  },
  missingDir(message) {
    console.log(
      '\033[31m',
      '[error]:',
      '\033[37m',
      `'__instructor-code__' directory missing. ${message}. Restart code-live process`
    );
  },
  connectionClosed() {
    console.log(
      '\033[35m',
      '[message]:',
      '\033[37m',
      'Instructor closed connection to code-live server. Stop the code-live process running in terminal.'
    );
  },
  missingVerifyFile() {
    console.log(
      '\033[31m',
      '[error]:',
      '\033[37m',
      `Verify file is missing. Delete '__instructor-code__' folder and restart code-live process.`
    );
  },
  forceDisconnect() {
    console.log(
      '\033[35m',
      '[message]:',
      '\033[37m',
      "You have been forcibly disconnected from the instructor's server. Restart the code-live process."
    );
  }
};
