const express  = require('express');
const proxy = require('http-proxy-middleware');
const app = express();
const CONFIG = require('../../config.js');
var Mock = require('mockjs');
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
var proxyOptions = {
  target: 'http://jsonplaceholder.typicode.com', // target host 
  changeOrigin: true,               // needed for virtual hosted sites 
  ws: true,                         // proxy websockets 
  pathRewrite: {
      '^/api' : ''           // remove base path 
  }
};
app.use('/api/*',proxy(proxyOptions));

var server = app.listen(CONFIG.MOCK_PORT, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
