const path = require('path')
const PACKAGE = require('./package.json');
const IS_DEV = process.env.NODE_ENV != 'production';
const MODE = IS_DEV ? 'development' : 'production';
//project root path
const PUBLIC_PATH = path.join(__dirname);
//project src path
const SRC_PATH = path.join(PUBLIC_PATH,'src');
//project dist path
const DIST_PATH = path.join(PUBLIC_PATH,'dist');
//node_modules
const NODE_MODULES = path.join(PUBLIC_PATH,'node_modules');
//project js entry
const JS_ENTRY = path.join(SRC_PATH,'index.js');
//project html template path
const HTML_ENTRY_PATH = path.join(SRC_PATH,'index.html');
//dev vendor output path
const VENDOR_DEV_PATH = path.join(SRC_PATH,'vendor');
//production vendor output path
const VENDOR_PROD_PATH = path.join(DIST_PATH,'vendor');
//vendor version
const VENDOR_VISION = PACKAGE.vendorVersion;
//vendor name
const VENDOR_NAME = `vendor_${VENDOR_VISION}.min.js`;
//vendor output path
const VENDOR_OUTPUT_PATH = IS_DEV?VENDOR_DEV_PATH:VENDOR_PROD_PATH;
//vendor path for html include
const VENDOR_JS_PATH = path.join('vendor',VENDOR_NAME);
//vendor manifest file name
const VENDOR_MANIFEST_FILENAME = `vendor_${VENDOR_VISION}_manifest.json`;

const DEV_PORT = 8888;
const MOCK_PORT = 8889;
const API = `http://127.0.0.1:${MOCK_PORT}`;

module.exports = {
  IS_DEV,
  MODE,
  PUBLIC_PATH,
  SRC_PATH,
  DIST_PATH,
  NODE_MODULES,
  JS_ENTRY,
  HTML_ENTRY_PATH,
  VENDOR_OUTPUT_PATH,
  VENDOR_JS_PATH,
  VENDOR_NAME,
  VENDOR_MANIFEST_FILENAME,
  API,
  DEV_PORT,
  MOCK_PORT
}