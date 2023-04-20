// pages/components/audio-recorder/index.ts

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  lifetimes: {

    detached() {

    },
    ready() {
        //开始监听
    let weakThis = this;
    this.data.recorderManager.onStart((res) => {
      weakThis.setData({
        //切换为工作中
        recorderState: 1
      });
      weakThis.data.timer = setInterval(() => {
        weakThis.setData({
          recorderDuration: weakThis.data.recorderDuration += 1,
          sliderProgress: (weakThis.data.recorderDuration += 1) * 100 / 60,
        })
      }, 1000)
      console.log("onStart==", res);
    });
    //暂停
    this.data.recorderManager.onPause(() => {
      weakThis.setData({
        //切换为暂停
        recorderState: 2
      });
      //
      clearInterval(weakThis.data.timer);
      weakThis.data.timer = null;
      console.log('recorder pause')
      //
    })
    //继续
    this.data.recorderManager.onResume(() => {
      clearInterval(this.data.timer);
      weakThis.data.timer = null;
      weakThis.setData({
        //切换为工作中
        recorderState: 1
      });
      weakThis.data.timer = setInterval(() => {
        weakThis.setData({
          recorderDuration: weakThis.data.recorderDuration += 1,
          sliderProgress: (weakThis.data.recorderDuration += 1) * 100 / 60,
        })

      }, 1000)
      console.log("onStart==",);
    });

    //结束的监听--OnStopListenerResult
    /*
    WechatMiniprogram.OnStopListenerResult
    */
    this.data.recorderManager.onStop((res) => {

      weakThis.setData({
        //切换为已结束
        recorderState: 3,
        audioDuration: Math.round(res.duration / 1000),
        audioInfo:res
      });
      console.log("onStop==", res.duration);
      clearInterval(weakThis.data.timer);
      weakThis.data.timer = null;
      weakThis.setData({
        recorderDuration: 0,
      })
    })
    //
    this.data.recorderManager.onFrameRecorded((res) => {
      const { frameBuffer } = res
      console.log('frameBuffer.byteLength', frameBuffer.byteLength)
    })
    this.data.recorderManager.onError((res) => {
      console.log("---录音出现错误---", res);
    })

    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    recorderManager: wx.getRecorderManager(),
    recorderDuration: 0,
    timer: null,
    recorderState: 0,
    audioInfo: null,
  },

  /**
   * 组件的方法列表
   */
  methods: {
  
  }
})
