
let data
// 这里data从app.js中传入，为了获取data的一些参数
function init(_data) {
  data = _data
  // 重写page函数，增加阿里云监控和日志记录
  let oldPage = Page
  Page = function(obj) {
    // 重写onShow方法，用一个变量保存旧的onShow函数
    let oldOnShow = obj.onShow
    obj.onShow = function() {
      // 此处写进入页面逻辑
      console.log('show')
      // 此处不能写成oldOnShow()，否则没有this，this.setData等方法为undefined。这里的this在Page构造函数实例化的时候才会指定
      // 在Page构造函数实例化的时候，小程序会将当前的Page对象的原型链（__proto__）增加很多方法，例如setData。当前的obj没有setData
      // 上面一段是我猜的
      oldOnShow.call(this)
    }
    // 重写onHide方法，用一个变量保存旧的onHide函数
    let oldOnHide = obj.onHide
    obj.onHide = function() {
      // 此处写离开页面逻辑
      console.log('show')
      // 此处不能写成oldOnHide()，否则没有this，this.setData等方法为undefined。这里的this在Page对象实例化的时候才会指定
      oldOnHide.call(this)
    }
    return oldPage(obj)
  }
}

export {
	init
}
