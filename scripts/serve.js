const { spawn } = require('child_process');
const { vueCliContext, entry, version } = require('./compile');

const cmd = `cross-env VUE_CLI_CONTEXT=${vueCliContext} VUE_APP_ENV=local VUE_APP_VERSION=${version} vue-cli-service serve ${entry}`;

spawn(cmd, {
  cwd: process.cwd(),
  stdio: 'inherit',
  shell: true,
});
