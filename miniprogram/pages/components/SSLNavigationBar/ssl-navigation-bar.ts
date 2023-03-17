// components/SSLNavigationBar/ssl-navigation-bar.ts
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    navBarHeight: app.globalData.navBarHeight,
    menuRight: app.globalData.menuRight,
    menuTop: app.globalData.menuTop,
    menuHeight: app.globalData.menuHeight,
    windowWidth:wx.getSystemInfoSync().windowWidth
  },
  /**
   * 组件的方法列表
   */
  methods: {
    
  }
})
