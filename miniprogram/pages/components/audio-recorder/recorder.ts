



/*

*/

import { ConcretePublisher, subscriberEventBus } from "../../service/subscriber";

export class Recorder {
  recorderManager = wx.getRecorderManager();
  recorderDuration = 0;
  timer = null;
  /*
  0,//待机状态
  1,//录音中
  2,//已暂停
  3,//已结束
  */
  recorderState = 0;
  audioInfo = null;


  //正在录音 需要传递录制时间
  recordingTimeBlock: (num: number) => void;
  //录音状态发生变化
  recordingStateChangeBlock: ((num: number) => void) | undefined;
  //录音结束时传递文件信息
  recordingEnd: (audioInfo: any) => void;
  //这里是必传的
  constructor(
    recordingTimeBlock: (num: number) => void,
    recordingStateChangeBlock: (num: number) => void,
    recordingEnd: (audioInfo: any) => void
  ) {
    
    this.recordingTimeBlock = recordingTimeBlock;
    this.recordingStateChangeBlock = recordingStateChangeBlock;
    this.recordingEnd = recordingEnd;
    //开始监听
    let weakThis = this;
    this.recorderManager.onStart((res) => {
      this.recordingTimeBlock(weakThis.recorderDuration);
      if (this.recordingStateChangeBlock) {
        this.recordingStateChangeBlock(1);
      }
      weakThis.recorderState = 1;

      weakThis.timer = setInterval(() => {
        console.log("onStart-setInterval");
        weakThis.recorderDuration += 1;
        weakThis.recordingTimeBlock(weakThis.recorderDuration);
        if (weakThis.recordingStateChangeBlock) {
          weakThis.recordingStateChangeBlock(1);
        }
      }, 1000)
      console.log("onStart==", res);
    });
    //暂停
    this.recorderManager.onPause(() => {
      if (this.recordingStateChangeBlock) {
        this.recordingStateChangeBlock(2);
      }
      this.recorderState = 2;
      clearInterval(weakThis.timer);
      weakThis.timer = null;
      console.log('recorder pause')
      //
    })
    //继续
    this.recorderManager.onResume(() => {


    });
    //结束的监听--OnStopListenerResult
    /*
    WechatMiniprogram.OnStopListenerResult
    */
    this.recorderManager.onStop((res) => {
      if (this.recordingStateChangeBlock) {
        this.recordingStateChangeBlock(3);
      }
      this.recorderState = 3;


      this.recordingEnd(res);

      console.log("onStop==", res.duration);
      clearInterval(weakThis.timer);
      weakThis.timer = null;
      //重置状态为未开始
      this.recorderDuration = 0;

    })
    this.recorderManager.onFrameRecorded((res) => {
      const { frameBuffer } = res
      console.log('frameBuffer.byteLength', frameBuffer.byteLength)
    })
    this.recorderManager.onError((res) => {
      console.log("---录音出现错误---", res);
    })
  }


  //开录音
  onStartRecorder() {
    console.log("你点击了开始录音");

    //开始录音
    this.audioInfo = null;
    console.log("this.recorderManager==", this.recorderManager);
    const options = {
      duration: 60000,
      sampleRate: 44100,
      numberOfChannels: 1,
      encodeBitRate: 192000,
      format: 'wav',
      frameSize: 50,
    }
    this.recorderManager.start(options);
    this.recordingTimeBlock(this.recorderDuration);
  };
  //结束录音
  onStopRecorder() {
    console.log("你点击了结束录音");
    this.recorderManager.stop();

  };
  //暂停录音
  onPauseRecorder() {
    this.recorderManager.pause();
  };
  //继续录音
  onResumeRecorder() {
    this.recorderManager.resume();
  };
  /*
  *音频播放进度条
  */
  onSliderChange(ev: any) {
    console.log("onSliderChange===", ev);
  };

}

