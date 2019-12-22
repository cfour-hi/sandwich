const path = require('path');

const rawArgv = process.argv.slice(2);
const projectPath = path.resolve(__dirname, '../src', rawArgv.shift());
const entry = path.resolve(projectPath, 'main.js');

module.exports = {
  entry,
  rawArgv,
};
