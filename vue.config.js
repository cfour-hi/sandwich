const path = require('path');

process.env.VUE_APP_VERSION = require('./package.json').version;

module.exports = {
  chainWebpack: config => {
    // https://github.com/JetBrains/svg-sprite-loader
    config.module
      .rule('svg')
      .uses.delete('file-loader')
      .end()
      .include.add(path.resolve(__dirname, 'src/editor/assets/svg-icon'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'icon-[name]' })
      .end()
      .use('svg-transform-loader')
      .loader('svg-transform-loader')
      .end()
      .use('svgo-loader')
      .loader('svgo-loader')
      .end();
  },
};
