const path = require('path')
const webpack = require('webpack')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

const resolve = dir => path.join(__dirname, dir)
const IS_PRODUCTION = ['production', 'prod', 'pre'].includes(process.env.NODE_ENV)

const port = process.env.port || process.env.npm_config_port || 5757

module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  outputDir: process.env.outputDir || 'dist',
  assetsDir: process.env.assetsDir || 'static',
  lintOnSave: !IS_PRODUCTION,
  runtimeCompiler: true,
  productionSourceMap: !IS_PRODUCTION,
  transpileDependencies: [],
  devServer: {
    port,
    open: true,
    // host: 'localhost',
    https: false,
    hotOnly: false, // 热更新
    overlay: { // 让浏览器 overlay 同时显示警告和错误
      warnings: false,
      errors: true
    },
    proxy: {
      // change xxx-api/login => mock/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_PROXY_API,
        secure: false,
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        // ws: true, // 是否启用websockets
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: process.env.VUE_APP_BASE_API
        }
      }
    }
  },
  configureWebpack: config => {
    const plugins = []
    // config.externals = {
    //   vue: 'Vue',
    //   'element-ui': 'ELEMENT',
    //   'vue-router': 'VueRouter',
    //   vuex: 'Vuex',
    //   axios: 'axios'
    // }
    config.plugins = [...config.plugins, ...plugins]
  },
  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true)
    config
      .plugin('ignore')
      .use(
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn$/)
      )
    // 添加别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('api', resolve('src/api'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('libs', resolve('src/libs'))
      .set('pages', resolve('src/pages'))
      .set('router', resolve('src/router'))
      .set('store', resolve('src/store'))
      .set('utils', resolve('src/utils'))
    // set preserveWhitespace
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
    // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'dev',
        config => config.devtool('cheap-source-map')
      )

    config
      .when(process.env.NODE_ENV !== 'dev',
        config => {
          // config
          //   .plugin('ScriptExtHtmlWebpackPlugin')
          //   .after('html')
          //   .use('script-ext-html-webpack-plugin', [{
          //   // `runtime` must same as runtimeChunk name. default is `runtime`
          //     inline: /runtime\..*\.js$/
          //   }])
          //   .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                },
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                vantUI: {
                  name: 'chunk-vantUI', // 单独将 vantUI 拆包
                  priority: 20, // 数字大权重到，满足多个 cacheGroups 的条件时候分到权重高的
                  test: /[\\/]node_modules[\\/]_?vant(.*)/
                }
              }
            })
          config.optimization.runtimeChunk('single')
          // 打包图片
          config.module
            .rule('images')
            .test(/\.(png|jpe?g|gif)(\?.*)?$/)
            .use('url-loader')
            .loader('url-loader')
            .options({
              limit: 10,
              // 以下配置项用于配置file-loader
              // 根据环境使用cdn或相对路径
              publicPath: process.env.VUE_APP_OSS_IMG_URL,
              // 将图片打包到dist/img文件夹下, 不配置则打包到dist文件夹下
              outputPath: 'static/img',
              // 配置打包后图片文件名
              name: '[name].[hash:8].[ext]'
            })
            .end()
        }
      )
    if (IS_PRODUCTION) {
      if (process.env.VUE_SHOW_BUNDLE_ANALYZER === 'SHOW') {
        // 打包分析
        config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
          {
            analyzerMode: 'static'
          }
        ])
      }
      config.output.filename('static/js/[name].[hash:8].js').chunkFilename(
        'static/js/[name].[hash:8].js')
      // gzip需要nginx进行配合
      config
        .plugin('compression')
        .use(CompressionWebpackPlugin)
        .tap(() => [
          {
            algorithm: 'gzip',
            test: /\.js$|\.html$|\.css/, // 匹配文件名
            threshold: 10240, // 超过10k进行压缩
            minRatio: 0.8,
            deleteOriginalAssets: false // 是否删除源文件
          }
        ])
    }
  },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require('os').cpus().length > 1,
  // 第三方插件配置
  pluginOptions: {},
  pwa: {},
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: false,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    // 启用 CSS modules for all css / pre-processor files.
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/style/_mixin.scss";
          @import "@/style/_variables.scss";
          @import "@/style/common.scss";
        ` // 全局引入
      }
    }
  }
}
