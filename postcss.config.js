const autoprefixer = require('autoprefixer')
const postcssImport = require('postcss-import')
const IS_PRODUCTION = ['production', 'prod'].includes(process.env.NODE_ENV)

let plugins = []
if (IS_PRODUCTION) {
  // 去除多余css
  plugins.push(postcssImport)
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
