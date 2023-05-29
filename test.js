const { choice } = require('./choice');

async function init() {
  var items = [
    'Raymond Blaese',
    'Wilma Bray',
    'Isaiah Lucero',
    'Stevie Strickland',
    'Saif Lawrence',
    'Nikhil Grant',
    'Everly Merrill',
    'Rosemary Simmons',
    'Aya Welsh',
    'Grayson Villa'
  ];
  var toKeep = [];

  toKeep = await selectLines(items);

  console.log(toKeep);
}

async function selectLines(items) {
  var toKeep = [];

  for (let i = 0; i < items.length;) {
    console.log(items[i]);
    key = await choice(['y', 'n', 'b', 'c'], 'y = keep, n = ignore, b = back, c = cancel');

    if (key == 'y') {
      toKeep[i] = items[i];
      i++;
    } else if (key == 'n') {
      toKeep[i] = null;
      i++;
    } else if (key == 'b') {
      i--;
    } else if (key == 'c') {
      toKeep = [];
      break;
    }
  }

  toKeep = toKeep.filter(item => item != null);

  return toKeep;
}

init();
