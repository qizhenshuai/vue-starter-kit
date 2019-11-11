const IS_PRODUCTION = ['production', 'prod'].includes(process.env.NODE_ENV)

const plugins = [
  'lodash',
  [
    'import',
    {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    },
    'vant'
  ]
]
if (IS_PRODUCTION) {
  plugins.push('transform-remove-console')
}

module.exports = {
  presets: [['@vue/app', { useBuiltIns: 'entry' }]],
  plugins
}
