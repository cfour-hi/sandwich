const { spawn } = require('child_process');
const { entry, rawArgv } = require('./compile');

/**
 * rawArgv.join(' ')
 * 透传 vue-cli-service 命令参数
 */
const cmd = `vue-cli-service serve ${entry} ${rawArgv.join(' ')}`;

spawn(cmd, {
  cwd: process.cwd(),
  stdio: 'inherit',
  shell: true,
});
