module.exports = {
    plugins: [
      require('postcss-nested'),
      require('postcss-each-variables'),
      {
        postcssPlugin: 'fix-from-option',
        Once(root, { result }) {
          if (!result.opts.from) {
            result.opts.from = 'undefined'; // 显式设置默认值
          }
        },
      },
      require('postcss-each')({
        plugins: {
          beforeEach: [require('postcss-for'), require('postcss-color-mix')]
        }
      }),
    ]
  }