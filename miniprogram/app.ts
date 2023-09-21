import { Topic } from "./pages/service/default-datas";

const AppCurrentVersions = "1.0.0"

// app.ts
App({
  globalData: {
    navBarHeight: 0, // 导航栏高度
    menuRight: 0, // 胶囊距右方间距（方保持左、右间距一致）
    menuTop: 0, // 胶囊距底部间距（保持底部间距一致）
    menuHeight: 0, // 胶囊高度（自定义内容可与胶囊高度保证一致）
    screenHeight:0,
  },
  onLaunch() {
    const that = this;
    // 获取系统信息
    const systemInfo = wx.getSystemInfoSync();
    // 胶囊按钮位置信息
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    // 导航栏高度 = 状态栏高度 + 44
    that.globalData.navBarHeight = systemInfo.statusBarHeight + 44;
    that.globalData.menuRight = systemInfo.screenWidth - menuButtonInfo.right;
    that.globalData.screenHeight = systemInfo.screenHeight;
    that.globalData.menuTop = menuButtonInfo.top;
    that.globalData.menuHeight = menuButtonInfo.height;
    //展示本地存储能力,
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //初始化本地数据库
    // this.DBInit();
    //初始化云开发
    // this.clouldInit();
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
        
        let currentV = Number(AppCurrentVersions.replace(/\./g, ""));
        let oldV = Number(versions.replace(/\./g, ""));
        // console.log("currentV==", currentV);
        // console.log("oldV==", oldV);
        if (currentV > oldV) {
          wx.setStorageSync("DatabasesVersions", AppCurrentVersions);
          console.log("更新版本号----");
          

        }
      } else {
        wx.setStorageSync("DatabasesVersions", AppCurrentVersions);
        console.log("首次存储版本号-------");
        
      }
    } catch (error) {

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
  },
  clouldInit(){
    wx.cloud.init({
      env: 'cloud1-5g2j8az1a2b084f6',
      traceUser: true,
    })
  },
})