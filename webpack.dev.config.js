const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const CONFIG = require('./config');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const proxyConfig = require('./proxy.config');
const express = require('express');
const _config = merge(baseConfig,{
  entry:{
    index:['webpack-dev-server/client?http://127.0.0.1:' + CONFIG.DEV_PORT,'webpack/hot/dev-server']
  },
  plugins:[new webpack.HotModuleReplacementPlugin()],
  devtool:'cheap-module-eval-source-map'
});
const compiler = webpack(_config);
const server = new WebpackDevServer(compiler, {
    hot: true,
    inline: true,
    historyApiFallback:{
        index:'/index.html' 
    },
    stats: { 
        colors: true 
    },
    open:true,
    proxy: proxyConfig
});
server.use('/vendor', express.static('src/vendor'));
server.listen(CONFIG.DEV_PORT);

