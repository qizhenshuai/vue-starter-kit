const path = require('path')
const webpack = require('webpack')
const glob = require('glob-all')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
// const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const PrerenderSpaPlugin = require('prerender-spa-plugin')

// const AliOssPlugin = require('webpack-oss')
const resolve = dir => path.join(__dirname, dir)
const IS_PRODUCTION = ['production', 'prod'].includes(process.env.NODE_ENV)
// const format = AliOssPlugin.getFormat()

const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
const port = process.env.port || process.env.npm_config_port || 5757
const cdnDomian = './' // cdn域名，如果有cdn修改成对应的cdn
const cdn = {
  css: [],
  js: [
    'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
    'https://cdn.bootcss.com/vue-router/3.0.3/vue-router.min.js',
    'https://cdn.bootcss.com/vuex/3.1.0/vuex.min.js',
    'https://cdn.bootcss.com/axios/0.19.0-beta.1/axios.min.js',
    'https://cdn.bootcss.com/js-cookie/2.2.1/js.cookie.min.js'
  ]
}

const externals = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  axios: 'axios',
  'js-cookie': 'Cookies'
}

module.exports = {
  publicPath: IS_PRODUCTION ? cdnDomian : './',
  outputDir: process.env.outputDir || 'dist',
  assetsDir: process.env.assetsDir || 'static',
  lintOnSave: !IS_PRODUCTION,
  runtimeCompiler: true,
  productionSourceMap: !IS_PRODUCTION,
  transpileDependencies: [],
  devServer: {
    port,
    open: true,
    host: 'localhost',
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
        target: `http://127.0.0.1:${port}/mock`,
        secure: false,
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        // ws: true, // 是否启用websockets
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  },
  configureWebpack: config => {
    const plugins = []
    if (IS_PRODUCTION) {
      // 去除多余css
      plugins.push(
        new PurgecssPlugin({
          paths: glob.sync([resolve('./**/*.vue')]),
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
      // plugins.push(
      //   new UglifyjsWebpackPlugin({
      //     uglifyOptions: {
      //       compress: {
      //         warnings: false,
      //         drop_console: true,
      //         drop_debugger: false,
      //         pure_funcs: ['console.log']
      //       }
      //     },
      //     sourceMap: false,
      //     parallel: true
      //   })
      // )
      // 利用splitChunks单独打包第三方模块
      config.optimization = {
        splitChunks: {
          cacheGroups: {
            libs: {
              name: 'chunk-libs',
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              chunks: 'initial'
            }
          }
        }
      }
      // gzip
      plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      )
      // 预加载
      // plugins.push(
      //   new PrerenderSpaPlugin({
      //     staticDir: resolve('dist'),
      //     routes: ['/'],
      //     postProcess(ctx) {
      //       ctx.route = ctx.originalRoute
      //       ctx.html = ctx.html.split(/>[\s]+</gim).join('><')
      //       if (ctx.route.endsWith('.html')) {
      //         ctx.outputPath = path.join(__dirname, 'dist', ctx.route)
      //       }
      //       return ctx
      //     },
      //     minify: {
      //       collapseBooleanAttributes: true,
      //       collapseWhitespace: true,
      //       decodeEntities: true,
      //       keepClosingSlash: true,
      //       sortAttributes: true
      //     },
      //     renderer: new PrerenderSpaPlugin.PuppeteerRenderer({
      //       // 需要注入一个值，这样就可以检测页面当前是否是预渲染的
      //       inject: {},
      //       headless: false,
      //       // 视图组件是在API请求获取所有必要数据后呈现的，因此我们在dom中存在“data view”属性后创建页面快照
      //       renderAfterDocumentEvent: 'render-event'
      //     })
      //   })
      // )
      // oss
      // plugins.push(
      //   new AliOssPlugin({
      //     accessKeyId: process.env.ACCESS_KEY_ID,
      //     accessKeySecret: process.env.ACCESS_KEY_SECRET,
      //     region: process.env.REGION,
      //     bucket: process.env.BUCKET,
      //     prefix: process.env.PREFIX,
      //     exclude: /.*\.html$/,
      //     format
      //   })
      // )
    }
    config.plugins = [...config.plugins, ...plugins]
  },
  chainWebpack: config => {
    // 修复HMR
    // config.resolve.symlinks(true)
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test
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
      .set('layouts', resolve('src/layouts'))
      .set('utils', resolve('src/utils'))
    // set svg-sprite-loader
    // config.module
    //   .rule('svg')
    //   .exclude.add(resolve('src/icons'))
    //   .end()
    // config.module
    //   .rule('icons')
    //   .test(/\.svg$/)
    //   .include.add(resolve('src/icons'))
    //   .end()
    //   .use('svg-sprite-loader')
    //   .loader('svg-sprite-loader')
    //   .options({
    //     symbolId: 'icon-[name]'
    //   })
    //   .end()

    // set preserveWhitespace
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
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )

    // 压缩图片
    // config.module
    //   .rule('images')
    //   .use('image-webpack-loader')
    //   .loader('image-webpack-loader')
    //   .options({
    //     mozjpeg: { progressive: true, quality: 65 },
    //     optipng: { enabled: false },
    //     pngquant: { quality: [0.65, 0.90], speed: 4 },
    //     gifsicle: { interlaced: false },
    //     webp: { quality: 75 }
    //   })

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
    if (IS_PRODUCTION) {
      config.plugin('analyzer').use(BundleAnalyzerPlugin)
      config.plugin('html').tap(args => {
        args[0].cdn = cdn
        return args
      })
      config.externals(externals)
      config.plugin('html').tap(args => {
        args[0].minify.minifyCSS = true // 压缩html中的css
        return args
      })
      // gzip需要nginx进行配合
      config
        .plugin('compression')
        .use(CompressionWebpackPlugin)
        .tap(() => [
          {
            test: /\.js$|\.html$|\.css/, // 匹配文件名
            threshold: 10240, // 超过10k进行压缩
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
    extract: !!IS_PRODUCTION,
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
