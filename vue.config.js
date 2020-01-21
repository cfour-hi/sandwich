const path = require('path');

process.env.VUE_APP_VERSION = require('./package.json').version;

module.exports = {
  outputDir: path.resolve(__dirname, `dist/${process.env.PROJECT_NAME}`),

  chainWebpack: config => {
    // https://github.com/JetBrains/svg-sprite-loader
    config.module
      .rule('svg')
      .uses.delete('file-loader')
      .end()
      .include.add(path.resolve(__dirname, 'src/common/svg-icon/icons'))
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

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/common/styles/normalize.less'),
        path.resolve(__dirname, './src/common/styles/theme.less'),
        path.resolve(__dirname, './src/common/styles/tool.less'),
      ],
    },
  },
};
