const { spawn } = require('child_process');
const { entry, rawArgv } = require('./compile');

const cmd = `vue-cli-service build ${entry} ${rawArgv.join(' ')}`;
spawn(cmd, {
  cwd: process.cwd(),
  stdio: 'inherit',
  shell: true,
});
