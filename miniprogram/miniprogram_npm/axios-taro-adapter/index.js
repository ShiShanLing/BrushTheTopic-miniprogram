module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1681872937288, function(require, module, exports) {
var __TEMP__ = require('./src/adapters/taro');var taroAdapter = __REQUIRE_DEFAULT__(__TEMP__);
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var TaroAdapter = exports.TaroAdapter = taroAdapter;

}, function(modId) {var map = {"./src/adapters/taro":1681872937289}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1681872937289, function(require, module, exports) {
var __TEMP__ = require('@tarojs/taro');var Taro = __REQUIRE_DEFAULT__(__TEMP__);

function settle(resolve, reject, res, failed){
  if (!failed) {
    resolve(res);
  } else {
    reject(res);
  }
}

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function taroAdapter(config) {
  return new Promise((resolve,reject)=>{
    Taro.request({
      ...config,
      url: config.baseURL + config.url,
      data: config.data,
      method: config.method,
      header: config.headers,
      timeout: config.timeout,
      success: function (res) {
        var response = {
          ...res,
          status: res.statusCode,
          statusText: res.errMsg,
          headers: res.header,
          config: config,
          request: null
        };

        settle(resolve, reject, response);
      },
      fail:function (res) {
        var response = {
          ...res,
          status: res.statusCode,
          statusText: res.errMsg,
          headers: res.header,
          config: config,
          request: null
        };
        
        settle(resolve, reject, response, true);
      }
    })
  })
};exports.default = taroAdapter

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1681872937288);
})()
//miniprogram-npm-outsideDeps=["@tarojs/taro"]
//# sourceMappingURL=index.js.map