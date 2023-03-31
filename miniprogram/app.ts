import { Topic } from "./pages/service/default-datas";




// app.ts
App({
  globalData: {
    navBarHeight: 0, // 导航栏高度
    menuRight: 0, // 胶囊距右方间距（方保持左、右间距一致）
    menuTop: 0, // 胶囊距底部间距（保持底部间距一致）
    menuHeight: 0, // 胶囊高度（自定义内容可与胶囊高度保证一致）
  },
  onLaunch() {

    let detail = "rver";

    
    var regex = new RegExp(`${detail}`);
    var string1 = "通知 Observer 已经进入了 RunLoop";
    console.log("正则表达式", string1.search(regex) );


    const that = this;
    // 获取系统信息
    const systemInfo = wx.getSystemInfoSync();
    
    // 胶囊按钮位置信息
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    // 导航栏高度 = 状态栏高度 + 44
    that.globalData.navBarHeight = systemInfo.statusBarHeight + 44;
    that.globalData.menuRight = systemInfo.screenWidth - menuButtonInfo.right;
    
    that.globalData.menuTop = menuButtonInfo.top;
    that.globalData.menuHeight = menuButtonInfo.height;

    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    this.DBInit();
    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
  },

  DBInit() {

    // let dateStr = Date.parse(new Date().toString());
    // console.log("时间戳-----", dateStr);
    // let nowTime = new Date(Date.parse(new Date().toString()));
    
    try {
      var isStorage = wx.getStorageSync('isStorage')
      if (isStorage!=true) {
        
        wx.setStorageSync("isStorage", true);
        wx.setStorageSync('learnTime', {"last":"", "numDay":1});
        let tempDatas:Topic[] = require('./pages/service/default-datas').dataJson;
        console.log("DBInit-准备存进去==", tempDatas);
        wx.setStorageSync("topic", tempDatas);
      }else{
        console.log("已经存进去了", wx.getStorageSync('topic'));
      }
    } catch (e) {
      console.log("getStorageSync('isStorage')==", e);
    }
  }
})