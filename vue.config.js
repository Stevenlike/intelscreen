const path = require('path') // 路径
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') // 去掉注释
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin // 打包分析

// gzip --start
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzip = true // 是否使用gzip
const productionGzipExtensions = ['js', 'css'] // 需要gzip压缩的文件后缀
// gzip --end
/**
* nginx配置:
gzip on;
gzip_static on;
gzip_min_length 1024;
gzip_buffers 4 16k;
gzip_comp_level 2;
gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php application/vnd.ms-fontobject font/ttf font/opentype font/x-woff image/svg+xml;
gzip_vary off;
gzip_disable "MSIE [1-6]\.";
**/

function resolve(dir) {
  return path.join(__dirname, dir)
}

// cdn预加载使用
const externals = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  axios: 'axios',
  'js-cookie': 'Cookies', // 一个简单的，轻量级的处理cookies的js API
  nprogress: 'NProgress' // 网站上的小进度条插件
}
const cdn = {
  // 开发环境
  dev: {
    css: ['https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.css'],
    js: ['https://lib.baomitu.com/rough.js/3.1.0/rough.umd.js'] // Rough.js是小（<9 KB）图形库，可以让你在画粗略，手绘般的，风格。该库定义了用于绘制直线、曲线、圆弧、多边形、圆和椭圆的图元。它还支持绘制SVG 路径。
  },
  // 生产环境
  build: {
    css: ['https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.css'],
    js: [
      'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
      'https://cdn.jsdelivr.net/npm/vue-router@3.2.0/dist/vue-router.min.js',
      'https://cdn.jsdelivr.net/npm/vuex@3.4.1/dist/vuex.min.js',
      'https://cdn.jsdelivr.net/npm/axios@0.18.0/dist/axios.min.js',
      'https://cdn.bootcss.com/js-cookie/2.2.0/js.cookie.min.js',
      'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.js'
    ]
  }
}

module.exports = {
  // 部署应用包时的基本 URL,用法和 webpack 本身的 output.publicPath 一致
  publicPath: './',
  // 输出文件目录
  outputDir: 'dist',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // 相对于outputDir的静态资源(js、css、img、fonts)目录
  assetsDir: '',
  // 是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: false,
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // 生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)
  integrity: false,
  // webpack相关配置
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
    // steven: 移除 <link>中prefetch 预加载，解决打包后一下子请求全部js,css
    config.plugins.delete('prefetch')
    // 压缩图片
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        mozjpeg: { progressive: true, quality: 65 },
        optipng: { enabled: false },
        pngquant: { quality: '65-90', speed: 4 },
        gifsicle: { interlaced: false },
        webp: { quality: 75 }
      })
    // 压缩图片-end
    // 使用cdn
    config.plugin('html').tap(args => {
      if (process.env.NODE_ENV === 'production') {
        args[0].cdn = cdn.build
      }
      if (process.env.NODE_ENV === 'development') {
        args[0].cdn = cdn.dev
      }
      return args
    })
    // 使用cdn-end
    // 打包分析
    if (process.env.IS_ANALYZ) {
      config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
        {
          analyzerMode: 'static'
        }
      ])
    }
  },
  configureWebpack: config => {
    const myConfig = {}
    // 本地环境 线上环境
    if (process.env.NODE_ENV === 'production') {
      // 生产环境
      config.mode = 'production'
      myConfig.externals = externals // cdn预加载使用
      myConfig.plugins = [] // 初始化插件库 --> steven
      // gzip
      //  构建时开启gzip，降低服务器压缩对CPU资源的占用，服务器也要相应开启gzip
      productionGzip &&
        myConfig.plugins.push(
          new CompressionWebpackPlugin({
            test: new RegExp(
              '\\.(' + productionGzipExtensions.join('|') + ')$' // 匹配文件名 --> /\.(js|css)$/
            ),
            algorithm: 'gzip',
            threshold: 8192, // 对超过（8192/1024）k的数据压缩
            minRatio: 0.8 // 压缩比
          })
        )
      // gzip-end
      // 去掉注释
      myConfig.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            output: {
              comments: false // 去掉注释
            },
            compress: {
              warnings: false,
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ['console.log'] //移除console
            }
          }
        })
      )
      // 注释-end
    } else {
      // 开发环境
      config.mode = 'development'
      myConfig.devServer = {
        disableHostCheck: true
      }
    }
    return myConfig
  },
  // css相关配置
  css: {
    // 是否分离css（插件ExtractTextPlugin）-- 是否提取css生成单独的文件 默认 true
    extract: true,
    // 是否开启 CSS source maps
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 是否启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  // 是否使用 thread-loader
  parallel: require('os').cpus().length > 1,
  // PWA 插件相关配置
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    open: true, // 自动启动浏览器
    host: 'localhost', // localhost
    port: 8080, // 端口号
    https: false,
    hotOnly: false, // 热更新
    // http 代理配置
    proxy: {
      // 本地代理包含user的接口 如： /user/getUser
      '^/user': {
        target: process.env.VUE_APP_SRC,
        ws: true, //开启WebSocket
        changeOrigin: true
      },
      '^/v1': {
        //匹配包含 /v1的接口  如：v1/xxx/xx
        target: process.env.VUE_APP_V,
        ws: true,
        changeOrigin: true
      },
      '/api': {
        target: 'http://127.0.0.1:3000/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
    // before: app => {}
  },
  // 第三方插件配置
  pluginOptions: {}
}
