const CONFIG = require('./config');
module.exports = [
  {
    context:'/api',
    target: CONFIG.API,
    secure: false,
    // pathRewrite: {'^/api' : '/'},
    changeOrigin: true,
  }
];