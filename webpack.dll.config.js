// const path = require('path')
// const webpack = require('webpack')
// const CleanWebpackPlugin = require('clean-webpack-plugin')
// const fileConfig = require('./webpack.filepath.js')
// const chalk = require('chalk');
// const isDev = process.env.NODE_ENV == 'development'
// const extraPlugins = isDev ? [] : [
//   new webpack.DefinePlugin({
//     'process.env.NODE_ENV': JSON.stringify('production'),
//     '__DEV__':false
//   })
// ]
// const fs = require('fs-extra');
// let isDoWebpack = !fs.pathExistsSync(fileConfig.vendorOutPath);
// if (isDoWebpack) {
//   // fs.removeSync(fileConfig.vendorOutPath);
//   console.log(chalk.green('> verdor not exist,start building vendor....'));
// }else{
//   console.log(chalk.green('> vendor was existed,skip build vendor...'));
// }
// // const cleanPath = isDev ? [fileConfig.vendorPath] : [path.join(fileConfig.distPath,fileConfig.vendorPath)]
// const cleanPath = [path.join(fileConfig.distPath,fileConfig.vendorPath)];
// const verdor_list = [
//   'react',
//   'react-dom',
//   'redux',
//   'redux-actions',
//   'redux-promise',
//   'redux-thunk',
//   'echarts',
//   'lodash',
//   'react-copy-to-clipboard',
//   'react-lazyload',
//   'classnames',
//   'autobind-decorator',
//   'jquery',
//   'antd',
//   'moment-timezone',
//   'moment/locale/zh-cn',
//   'axios'
// ];
// module.exports = {
//   entry:isDoWebpack?verdor_list:() => {},
//   output:{
//     path:fileConfig.vendorOutPath,
//     filename:fileConfig.venderName,
//     library:'vendor_library',
//   },
//   plugins:isDoWebpack?[
//     new CleanWebpackPlugin(cleanPath),
//     new webpack.DllPlugin({
//       path:path.join(fileConfig.vendorOutPath,'vendor-manifest.json'),
//       name:'vendor_library',
//       context:__dirname
//     })
//   ].concat(extraPlugins):[]
// }
const path = require('path');
const webpack = require('webpack');
const CONFIG  = require('./config');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const chalk  = require('chalk');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const fs = require('fs-extra');
const vendorFilePath = path.join(CONFIG.VENDOR_OUTPUT_PATH,CONFIG.VENDOR_NAME);

let isNeedBuild = true;
if (fs.pathExistsSync(vendorFilePath)) {
  console.log(chalk.green('> vendor has no changed,skip build!'));
  isNeedBuild = false;
}else{
  console.log(chalk.green('>vendor has not existed,start building....'));
}

const verdor_list = [
  'react',
  'react-dom',
  'redux',
  'redux-actions',
  'redux-promise',
  'redux-thunk',
  'lodash',
  'react-copy-to-clipboard',
  'react-lazyload',
  'classnames',
  'autobind-decorator',
  'antd',
  'moment-timezone',
  'moment/locale/zh-cn',
  'axios'
];
module.exports = {
  mode:CONFIG.MODE,
  entry:isNeedBuild?verdor_list:() => {},
  output:{
    path:CONFIG.VENDOR_OUTPUT_PATH,
    filename:CONFIG.VENDOR_NAME,
    library:'vendor_library',
  },
  plugins:isNeedBuild?[
    new webpack.DllPlugin({
      path:path.join(CONFIG.VENDOR_OUTPUT_PATH,CONFIG.VENDOR_MANIFEST_FILENAME),
      name:'vendor_library',
      context:CONFIG.PUBLIC_PATH
    }),
    // new ProgressBarPlugin({
    //   format: 'vendor build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)'
    // }),
    new webpack.ProgressPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ]:[]
}