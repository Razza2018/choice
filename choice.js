const readline = require('readline');

var _keys = [];
var _message = '';
var _keyPressed = null;

function choice(keys, message) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(keys)) {
      reject('Error: No keys provided');
      return;
    }

    if (!message || !message.length) {
      reject('Error: No message provided');
      return;
    }

    _keys = keys;
    _message = message;

    // Create readline interface
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.addListener('close', () => {
      resolve(_keyPressed);
      return;
    });

    // Function to handle keypress events
    const handleKeyPress = (str, key) => {
      if (_keys.includes(key.name)) {
        _keyPressed = key.name;
        process.stdin.removeListener('keypress', handleKeyPress);
        console.log();
        rl.close(); // Close the readline interface
      }
    };

    // Set raw mode to capture individual keypress events
    process.stdin.setRawMode(true);

    // Prompt the user
    console.log(_message);

    // Listen for keypress events
    process.stdin.on('keypress', handleKeyPress);

    // Start listening for keypress events
    readline.emitKeypressEvents(process.stdin);
  });
}

module.exports.choice = choice;
