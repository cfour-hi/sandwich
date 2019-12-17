const path = require('path');
const { version } = require('../package.json');

const rawArgv = process.argv.slice(2);
const vueCliContext = path.resolve('modules', rawArgv[0]);
const entry = path.resolve(vueCliContext, 'src/main.js');

module.exports = {
  vueCliContext,
  entry,
  version,
  rawArgv,
};
