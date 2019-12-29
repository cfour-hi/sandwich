const path = require('path');

const rawArgv = process.argv.slice(2);
/**
 * 将当前命令指定的项目名称设置为环境变量
 * 在 build 时可用于输出到指定目录
 */
process.env.PROJECT_NAME = rawArgv.shift();
const projectPath = path.resolve(__dirname, '../src', process.env.PROJECT_NAME);
const entry = path.resolve(projectPath, 'main.js');

module.exports = {
  entry,
  rawArgv,
};
