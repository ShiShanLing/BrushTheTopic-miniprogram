

// pages/components/navigation-controller/navigation-controller.ts
Component({
  //使用插槽
  options:{
    multipleSlots:true   //这样就可以设置多个slot插槽
  },
  /**
   * 组件的属性列表, 
   * 
   */
  properties: {
    backgroundColor:String,
    isHideBackButton:Boolean,
    navigationTitle:String,//导航条标题
  },
  /**
   * 组件的初始数据
   */

  data: {
    navBarHeight: 0,
    contentHeight: 0,
  },
  
  lifetimes: {
    ready() {
      console.log("lifetimeslifetimeslifetimeslifetimeslifetimeslifetimeslifetimeslifetimes--", this.properties.isHideBackButton);
  
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    goBack:function() {
      // wx.navigateBack()
      console.log("点击了返回-navigation-controller");
      this.triggerEvent('goBack')
    }
  },

  
})
