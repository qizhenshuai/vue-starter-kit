const autoprefixer = require('autoprefixer')
const postcssImport = require('postcss-import')
const purgecss = require('@fullhuman/postcss-purgecss')
const IS_PRODUCTION = ['production', 'prod'].includes(process.env.NODE_ENV)

let plugins = []
if (IS_PRODUCTION) {
  // 去除多余css
  plugins.push(postcssImport)
  plugins.push(
    purgecss({
      content: [
        './layouts/**/*.vue',
        './components/**/*.vue',
        './pages/**/*.vue'
      ],
      extractors: [
        {
          extractor: class Extractor {
            static extract(content) {
              const validSection = content.replace(
                /<style([\s\S]*?)<\/style>+/gim,
                ''
              )
              return validSection.match(/[A-Za-z0-9-_:/]+/g) || []
            }
          },
          extensions: ['html', 'vue']
        }
      ],
      whitelist: ['html', 'body'],
      whitelistPatterns: [/el-.*/],
      whitelistPatternsChildren: [/^token/, /^pre/, /^code/]
    })
  )
}

module.exports = {
  plugins: [
    ...plugins,
    autoprefixer,
    require('postcss-pxtorem')({
      rootValue: 37.5, // 根元素字体大小
      unitPrecision: 5, // 允许REM单位增长的十进制数
      propList: ['*'], // 可以从px更改为rem的属性
      selectorBlackList: [], // 要忽略的选择器并保留为px
      replace: true,
      mediaQuery: false,
      minPixelValue: 12
    })
  ]
}
