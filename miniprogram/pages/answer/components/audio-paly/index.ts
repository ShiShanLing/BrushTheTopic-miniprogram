// pages/components/audio-paly/index.ts

function toFixedAndNumber(value:number, fractionDigits?:number):number{
  return Number(value.toFixed(fractionDigits));
}

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /** 录音总时长，单位：ms */
    duration: Number,
    /** 录音文件大小，单位：Byte */
    fileSize: Number,
    /** 录音文件的临时路径 (本地路径) */
    tempFilePath: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    isPlay: false, // 播放中
    total: "00", // 音频总长度
    totalToNumber_s: 0,//s
    currentPalyNum: 0,//s
    progress: 0, // 播放进度 0-100
    innerAudioContext: wx.createInnerAudioContext(), // 音频对象
    isCanplay: false, // 监听音频进入可以播放状态的事件
    countdownNum_ms:0,//ms
    duration_ms:0,

  },
  lifetimes: {

    detached() {

    },
    ready() {
      this.settingAudioContext();
    },
  },

  /**
   * 组件的方法列表 
   */
  methods: {
    onPlayAudio(){
      console.log("onPlayAudio", this.data.innerAudioContext);
      
      if (!this.data.isPlay){
        console.log("开始播放");
        //播放
        this.data.innerAudioContext.play();
      }else{
        console.log("暂停播放");
        //暂停
        this.data.innerAudioContext.pause();
      } 
    },
    /*
    *获取播放时间
    */
    getPalyTime(value: number) {      
      return Math.round(value / 1000);
    },
    changeX(value: number) {
      var progress = Math.round(value / this.properties.duration * 100);
      this.setData({
        progress: progress
      });
    },
    /*
    *改变进度条
    */
    onSliderChange(value: any) {
      console.log("value==", value);
      let afterChange = value.detail / 100 * this.properties.duration;
      console.log("onSliderChange==", afterChange);
      
      this.data.innerAudioContext.seek(afterChange);
      console.log("修改了进度之后获取当前小程序时间", this.data.innerAudioContext.currentTime);
      
    },
    /*
    *倒计时
    *很麻烦
    *1.播放结束重置倒计时.
    *2.暂停时,销毁倒计时,记录剩余时间,点击播放继续开始倒计时.
    *3.拉动进度条,销毁倒计时,计算剩余时间,然后自动开启倒计时.(这里可以偷懒.直接改变数据,不知道会不会有线程问题,两个setData.抢一个数据)
    */
   countdown(weakThis:any){   
    if (!weakThis.data.isPlay){
      return;
    }

    let currentTime = this.data.innerAudioContext.currentTime;
      console.log("this.data.duration_ms===", weakThis.data.duration_ms);
      console.log("currentTime", currentTime);
      var progress = currentTime * 1000 / weakThis.data.duration_ms * 100;
      
      progress = Number(progress.toFixed(2));
      console.log("progress==", progress);
      console.log("this.data.countdownNum_ms==", weakThis.data.countdownNum_ms);
      let currentPalyNum = toFixedAndNumber(currentTime, 0);
      this.setData({
        countdownNum_ms:(weakThis.data.countdownNum_ms-100),
        progress: progress,
        currentPalyNum:currentPalyNum,
    });
    
    setTimeout(()=>{
      weakThis.countdown(weakThis);
    }, 80);
    
   },
    /*
    *设置一些创建是需要的配置
    */
    settingAudioContext() {
      
      let tempNum = toFixedAndNumber(this.properties.duration/1000, 0);
      
      console.log("this.properties.duration==", this.properties.duration, tempNum);

      this.setData({
        totalToNumber_s:tempNum,
        countdownNum_ms:this.properties.duration,
        duration_ms:this.properties.duration
      });
      
      this.data.innerAudioContext = wx.createInnerAudioContext()
      this.data.innerAudioContext.autoplay = false; // 经测试发现，必需要播放才能在真机中获取时长！（虽然false时工具中是能获取时间的）
      console.log("看看链接是否正常===", this.data.tempFilePath);
      
      this.data.innerAudioContext.src = this.data.tempFilePath;
  
      this.data.innerAudioContext.onPlay((result: any) => {
        
        var duration = this.data.innerAudioContext.duration;
        this.setData({
          isPlay:true,
        })
        console.log("audio-paly / onPlay==", result);
        let weakThis = this;
        setTimeout(()=>{
          weakThis.countdown(weakThis);
        }, 100);
      });
      this.data.innerAudioContext.onCanplay(() => {
        console.log("audio-paly / onCanplay");
      });
      
      // 监听音频播放进度更新事件
      this.data.innerAudioContext.onTimeUpdate(() => {
        console.log("onTimeUpdate");
      });

      this.data.innerAudioContext.onPause((result) => {
        this.setData({
          isPlay:false,
        })
        console.log("audio-paly / onPause==", result);
      });
      //音频完成跳转操作的事件
      this.data.innerAudioContext.onSeeked((result) => {
        console.log("audio-paly / onSeeked==", result);
      });
      //监听音频进行跳转操作的事件
      this.data.innerAudioContext.onSeeking((result) => {
        console.log("audio-paly / onSeeking==", result);
      });
      this.data.innerAudioContext.onError((result) => {
        console.log("audio-paly / onError==", result);
      });
      //stop是停止了 再次播放是从头开始播放.
      this.data.innerAudioContext.onStop((result) => {
        console.log("audio-paly / onStop==", result);
      });
      // 播放结束后
      this.data.innerAudioContext.onEnded((res) => {
        console.log("onEnded-res==",res);
        console.log(res);
        // this.data.innerAudioContext.seek(0); // 开启后会无限循环播放
        this.setData({
          progress: 0,
          currentPalyNum: 0,
          isPlay:false,
          countdownNum_ms:this.properties.duration,
        });
      });
    },
  }
})
