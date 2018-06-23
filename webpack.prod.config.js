const path = require('path');
const webpack  = require('webpack');
const CONFIG = require('./config');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const chalk  = require('chalk');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const disPath = CONFIG.DIST_PATH;
console.log(chalk.green('>deleting dist files...'));
// rmNpm(path.join(disPath,'*.map'));
const _config = merge(baseConfig,{
  plugins:[
    new webpack.optimize.ModuleConcatenationPlugin(),
    new MiniCssExtractPlugin({filename: `css/[name].[chunkhash:5].min.css`}),
    new CleanWebpackPlugin(['css','js','img','*.js','*.map','index.html'],{
      root:CONFIG.DIST_PATH,
      exclude:['vendor'],
      dry:false
    })
  ],
  devtool:'cheap-module-source-map'
});
module.exports = _config;