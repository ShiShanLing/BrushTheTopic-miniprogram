import { Topic } from "./pages/service/default-datas";

const AppCurrentVersions = "1.0.0"

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
    console.log("正则表达式", string1.search(regex));


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
    //添加一个数据库版本

    try {
      let currentLearnType = wx.getStorageSync("currentLearnType")
      if (!currentLearnType){
        wx.setStorageSync("currentLearnType", "")
      }

    } catch (error) {

    }

    try {
      let versions = wx.getStorageSync("DatabasesVersions")
      if (versions) {

        let currenStr = AppCurrentVersions.replace(/\./g, "");
        let oldStr = AppCurrentVersions.replace(/\./g, "");
        console.log(`currenStr==${currenStr} oldStr==${oldStr}`);
        let currentV = Number(AppCurrentVersions.replace(/\./g, ""));
        let oldV = Number(versions.replace(/\./g, ""));
        console.log("currentV==", currentV);
        console.log("oldV==", oldV);
        if (currentV > oldV) {
          wx.setStorageSync("DatabasesVersions", AppCurrentVersions);
          console.log("更新版本号----");
          
          //做一些版本更新的工作,如果没工作可以不调用.
          if (AppCurrentVersions == "1.0.2") {
            //只有1.0.2版本才调用这个 后面版本可以删除.
            versionsUpdate();
          }
        }
      } else {
        wx.setStorageSync("DatabasesVersions", AppCurrentVersions);
        console.log("首次存储版本号-------");
        
      }
    } catch (error) {

    }
    //版本更新需要处理的代码
    function versionsUpdate() {
      try {
        wx.removeStorageSync("topic");
        console.log("开始清理数据库");
      } catch (error) {

      }
    }

    try {
      var isStorage = wx.getStorageSync('isStorage')
      var topics = wx.getStorageSync('topic')
      if (isStorage != true || topics.length == 0) {
        wx.setStorageSync("isStorage", true);
        let tempDatas: Topic[] = require('./pages/service/default-datas').dataJson;
        console.log("DBInit-准备存进去==", tempDatas);
        wx.setStorageSync("topic", tempDatas);
      } else {
        console.log("已经存进去了", wx.getStorageSync('topic'));
      }

    } catch (e) {
      console.log("getStorageSync('isStorage')==", e);
    }
  }
})