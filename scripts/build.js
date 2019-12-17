const { spawn } = require('child_process');
const { vueCliContext, entry, version, rawArgv } = require('./compile');

const env = rawArgv[1];
const cmd = `cross-env VUE_CLI_CONTEXT=${vueCliContext} VUE_APP_ENV=${env} VUE_APP_VERSION=${version} vue-cli-service build ${entry}`;

spawn(cmd, {
  cwd: process.cwd(),
  stdio: 'inherit',
  shell: true,
});
