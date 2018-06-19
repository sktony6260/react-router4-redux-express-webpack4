const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 多线程
const os = require('os');
const threadLoader = require('thread-loader');

const chalk  = require('chalk');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CONFIG  = require('./config.js');
const isDev = CONFIG.IS_DEV;
if(CONFIG.IS_DEV) {
  threadLoader.warmup({
    // pool options, like passed to loader options
    // must match loader options to boot the correct pool
  }, [
    'babel-loader',
    'babel-preset-env',
    'babel-preset-react',
    'babel-preset-stage-0',
  ]);
}
const getOutPath = () => {
  let outPut = {
    publicPath:''
  }
  if (CONFIG.IS_DEV) {
    outPut = Object.assign(outPut,{
      filename:'[name].js',
      chunkFilename: `js/a.[name].[chunkhash:10].js`
    });
  }else{
    outPut = Object.assign(outPut,{
      path:CONFIG.DIST_PATH,
      filename:'[name].[chunkhash:5].min.js',
      chunkFilename: `js/a.[name].[chunkhash:10].min.js`
    })
  }
  return outPut;
  console.log(outPut);
}
const styleLoderMaker = (loaderType,isUseModules) => {
  let cssLoader = {
    loader:'css-loader',
    options:{
      minimize:!isDev,
      sourceMap:isDev
    }
  };
  if (isUseModules) {
    cssLoader = Object.assign(cssLoader,{
      options:{
        modules:true,
        importLoaders:1,
        localIdentName: '[name]__[local]--[hash:base64:5]'
      }
    });
  }
  let loaders = [cssLoader];
  if (!isDev) {
    loaders.push({
      loader:'postcss-loader',
      options:{
        config:{
          ctx: {
            autoprefixer: {browsers: ['last 5 versions', 'ie >= 10', 'ff >= 30', 'chrome >= 34', 'safari >= 6']},
          }
        }
      }
    });
  }
  if (loaderType) {
    loaders.push({
      loader:`${loaderType}-loader`,
      options:{
        minimize:!isDev,
        sourceMap:isDev
      }
    });
  }
  if (isDev) {
    loaders.unshift('style-loader');
  }else{
    loaders.unshift(MiniCssExtractPlugin.loader);
  }
  return loaders;
}
module.exports = {
  mode: CONFIG.MODE,
  entry:{
    index:[CONFIG.JS_ENTRY]
  },
  output:getOutPath(),
  resolve: {
    modules: [CONFIG.SRC_PATH, CONFIG.NODE_MODULES],
    // symlinks: false,
    extensions: ['.js', '.less', '.css', '.json']
  },
  plugins:[
    new webpack.DllReferencePlugin({
      context: CONFIG.PUBLIC_PATH,
      manifest: require(path.join(CONFIG.VENDOR_OUTPUT_PATH,CONFIG.VENDOR_MANIFEST_FILENAME)),
    }),
    new htmlWebpackPlugin({
      title:'',
      template:CONFIG.HTML_ENTRY_PATH,
      inject: true,
      hash: true,
      cache: true,
      chunks: ['index'],
      vendorName: CONFIG.VENDOR_JS_PATH,
      // favicon:path.resolve(__dirname, '../favicon.ico'),
    }),
    // new ProgressBarPlugin({
    //   format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)'
    // })
    new webpack.ProgressPlugin()
  ],
  module:{
    rules:[
      {
        test:/\.jsx?$/,
        include:CONFIG.SRC_PATH,
        use: [
          // 'cache-loader',
          {loader: 'thread-loader', options: {workers: os.cpus().length}},
          'babel-loader'
        ]
      },
      {
        test:/\.css$/,
        use:styleLoderMaker()
      },
      {
        test:/\.less$/,
        include:path.join(CONFIG.SRC_PATH,'layout'),
        use:styleLoderMaker('less')
      },
      {
        test:/\.less$/,
        include:[path.join(CONFIG.SRC_PATH,'components'),path.join(CONFIG.SRC_PATH,'containers')],
        use:styleLoderMaker('less',true)
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 8192,
              name: CONFIG.IS_DEV ? 'images/[name].[ext]' : 'img/[name].[hash:5].[ext]'
            }
          },

        ],
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg)((\?|\#)[\?\#\w\d_-]+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 100,
              name: 'fonts/[name].[ext]'
            }
          }
        ],
      },
    ]
  }
}