// components/SSLNavigationBar/ssl-navigation-bar.ts
const app = getApp()

Component({
  options:{
    multipleSlots:true   //这样就可以设置多个slot插槽
  },
  /**
   * 组件的属性列表
   */
  properties: {
    title:String,
    isHideBackButton:Boolean,
    funcs:{
      type: Object,
      value:()=>{},
    }
    
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
    goBack() {
    

      this.properties.funcs();
      console.log("点击了返回");
      this.triggerEvent('goBack');
    }
  }
})
