//发布-订阅者模式

interface Publisher {
  subscriber: string;
  data: any;
}

export interface RecorderEventChannel {
  recordTimeChange: (subscriber: string, data: number) => void;
}

export interface EventChannel {
  on: (subscriber: string, callback: () => void) => void;
  off: (subscriber: string, callback: () => void) => void;
  emit: (subscriber: string, data: any) => void;
}

export interface Subscriber {
  subscriber: string;
  callback: (data: any) => void;
}
//总线实现
export class ConcreteEventChannel implements EventChannel {
  // 初始化订阅者对象
  private subjects: { [key: string]: Function[] } = {};

  // 实现添加订阅事件
  public on(subscriber: string, callback: (data: any) => void): void {
    console.log(`收到订阅信息，订阅事件：${subscriber}`);
    if (!this.subjects[subscriber]) {
      this.subjects[subscriber] = [];
    }
    this.subjects[subscriber].push(callback);
  };
  //
  // 实现取消订阅事件
  public off(subscriber: string, callback: () => void): void {
    console.log(`收到取消订阅请求，需要取消的订阅事件：${subscriber}`);
    if (callback === null) {
      this.subjects[subscriber] = [];
    } else {
      const index: number = this.subjects[subscriber].indexOf(callback);
      ~index && this.subjects[subscriber].splice(index, 1);
    }
  };

  // 实现发布订阅事件
  public emit(subscriber: string, data = null): void {
    console.log(`收到发布者信息，执行订阅事件：${subscriber} data===${data}`);
    this.subjects[subscriber].forEach(item => item(data));
  };
}
//发布者实现
export class ConcretePublisher implements Publisher {
  public subscriber: string = "";
  public data: any;
  constructor(subscriber: string, data: any) {
    console.log("ConcretePublisher---");

    this.subscriber = subscriber;
    this.data = data; 
  }
}
//订阅者实现
export class ConcreteSubscriber implements Subscriber {
  public subscriber: string = "";
  constructor(subscriber: string, callback: (data: any) => void) {
    this.subscriber = subscriber;
    this.callback = callback;
  }
  public callback(data: any): void { };
}

//订阅总线
export const subscriberEventBus = new ConcreteEventChannel();



/*
  使用方法
  然后创建一个全局的 ConcreteEventChannel供大家使用
  在监听页面,创建订阅者 ConcreteSubscriber
  const subscriber = new ConcreteSubscriber(
    "swimming",
    (data:any) => {
      console.log("订阅者 leo 订阅事件成功！执行回调~swimming==", data);
    }
  );
  在监听页面添加监听
  eventBus.on(subscriber.subscriber, subscriber.callback);
  在发布页面,创建发布者 ConcretePublisher  publisher
  const publisher = new ConcretePublisher(
    "swimming",
    { message: "pual 发布消息~" }
  );
  在发布页面添加发布
  eventBus.emit(publisher.subscriber, publisher.data);
  */



// /* 运行示例 */
//监听者
/*
const leo = new ConcreteSubscriber(
  "swimming",
  () => {
    console.log("订阅者 leo 订阅事件成功！执行回调~");
  }
);
//监听者
const lisa = new ConcreteSubscriber(
  "swimming",
  () => {
    console.log("订阅者 lisa 订阅事件成功！执行回调~");
  }
);


const pual = new ConcretePublisher(
  "swimming",
  { message: "pual 发布消息~" }
);

const eventBus = new ConcreteEventChannel();
//添加监听
eventBus.on(leo.subscriber, leo.callback);
//添加监听
eventBus.on(lisa.subscriber, lisa.callback);
// 发布者 pual 发布 "swimming"相关的事件
发布监听
eventBus.off(lisa.subscriber, lisa.callback);
*/



