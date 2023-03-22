


var baseData = [
  {
    "topicType":"Swift",
    "topicTitle":"什么是runLoop？他可以用来做什么？项目中需要注意的地方。",
    "topicAnswer":"runLoop顾名思义，是一种循环.\n 但是他不像dowhile一样，会使CPU进入忙等状态，RunLoop在没有任务的时候会进入休眠状态，有任务的时候再唤醒去处理对应的任务。\n RunLoop是一个对象，它包含多个mode，多个commonMode和一个正在运行的mode。\n RunLoop和线程是绑定在一起的, 每个线程都有一个对应的RunLoop对象，我们可以获取他，但是我们不能直接创建RunLoop。RunLoop和线程是一一对应的，对应的方式是以key--value的方式存储在一个全局的数据字典表里。\n 主线程的RunLoop在初始化字典表的时候创建好子线程的RunLoop在首次被调用的时候创建，如果不调用那就一直不会被创建、RunLoop会在线程销毁掉之后自动销毁。\n 项目中的运用Timer一个timer被加入到RunLoop中的时候，RunLoop会为重复的时间点添加事件。例如10：10，10：20，但是RunLoop为了节约资源并不会在非常准确的时间点调用这个Timer。NSTimer有个属性叫做Tolerance（宽容度），标记了到了当前时间点之后，允许的最大误差值。由于NTimer这种机制，所以他必须依赖于RunLoop才能执行。如果这个时间点错过了他只能等待下一个时间点。就像公交车，玩手机错过了这一班车，就只能等下一班车。为了避免这个问题。可以使用GCDTimer，因为GCD的Timer所在线程如果没有RunLoop，GCD会临时创建一个线程起执行这个block，执行完再销毁掉。\n AutoreleasePoolARC下的产物，为了替代人工管理内存，大大简化了iOS开发人员的内存管理工作；实际是系统代替人工在合适的地方添加release、autoRelease等内存释放操作。\n RunLoop和AutoreleasePool的关系。\n 创建RunLoop时会创建一个AutoreleasePool，RunLoop进入休眠时会销毁掉AutoreleasePool并创建一个新的AutoreleasePool。RunLoop被销毁时，AutoreleasePool也会被销毁。\nScrollView在scrollView滑动的时候会使NSTimer无效。有两种解决方法。（1.吧NSTimer放进runLoop并设置mode为common（2.使用GCDTimer实现常驻线程"
  },
  {
    "topicType":"Swift",
    "topicTitle":"远程推送流程",
    "topicAnswer":"1.App注册APNs\n（a.只要注册过的设备才能接受到消息,在UIApplication的registerUserNotificationSettings:方法注册\n（b.注册之前有两个必要条件必须准备好：开发配置文件，应用程序的bundle indentifier应和配置文件的App Id一致。\n\n2.App获取device Token\n（a.在 DidRegisterForRemoteNotificationWithDeviceToken中获取device Token 此方法发生在注册之后。\n（b.如果获取失败需要在didFailToRegisterForRemoteNotificationWithError 中查看错误信息，此方法发生在获取device Token失败之后\n（c.只能在真机上获取device Token\n\n3.App 发送 device Token 给应用程序服务商，告诉服务器当前设备允许接收消息\n（a.device Token生产算法只有apple掌握。所以为了避免算法发生变化收不到推送，所以每次启动App都要获取device Token。\n（b.通常可以通过一个网络请求，吧device Token发送给应程序服务商的服务器端。在这个过程中最好只上传一次，一旦发现device Token发生变化 最后将旧的deviceToken一起上送给服务器端。服务器端删除旧令牌，存入新令牌，防止发送无效消息。\n\n4.应用程序服务商收到App device Token 组织信息发送给APNs。\n\n5.APNs根据消息中的 device Token 查找已注册的设备 发送消息。\n（a.正常情况下可以根据device Token可以成功吧消息发送到客户端，但是也不排除客户端被卸载的情况，如果发生错误，APNs会将这个错误信息通知服务端，防止浪费资源。（服务端收到这错误信息会把这个device Token移除  下次不再发送。）"
  },
  {
    "topicType":"Swift",
    "topicTitle":"什么是KVC?他可以用来做什么?底层原理?",
    "topicAnswer":"(Key-value coding）键值编码\nKVC应用场景，通常用来修改类的属性，或者字典转模型\nKVC，通过字符串的方式访问属性，当一个对象的属性调用setValue方法时，会现在对象的内部查找对应的setKey方法，如果没有找到，就查找与key同名且带有下划线的属性，如果还没有找到，就查找key同名的属性并赋值。如果到这里还没有找到， 就调用setValueForUndefindeKey和 setValue：forUndefindeKey 方法。"
  },
  {
    "topicType":"Swift",
    "topicTitle":"什么是KVO?,底层原理?",
    "topicAnswer":"(Key Value Observing, 键值观察)\nKVO的本质就是重写被观察属性的setter方法。 \n当一个类的属性被观察，系统会通过runTime为这个类添加一个派生类。并把这个类的isa指针指向这个派生类，这样就实现了给被观察属性赋予新值是，调用的是派生类的set方法。重写的set方法在值改变的前后 (willChangeValueForKey didChangeValueForKey),通知观察对象，值的变化。"
  },
  {
    "topicType":"Swift",
    "topicTitle":"Thread,GCD,Operation",
    "topicAnswer":"Thread是封装程度最小最轻量级，使用更灵活，但是需要手动管理线程的生命周期、线程同步和线程加锁等，开销比较大。\n• GCD（Grand Central Dispatch），又叫做大中央调度，对线程操作进行了封装，加入了新特性，内部进行了效率优化，提供简洁的C语言接口，使用更加简洁高效，也是苹果推荐的方法。\n\nGCD的优点\nGCD会自动利用更多的CPU内核\nGCD可用于多核的并行运算\nGCD会自动管理线程的生命周期\n程序员只需要告诉GCD执行什么任务，不需要编写任何线程管理代码。\n有两个比较重要的概念队列和任务 \n（1：队列 \n◦ 串行：FIFO的方式执行队列中的任务\n◦ 并行：队列中的先后添加的任务可以同时并行执行，任务之间不会相互等待，而且这些任务执行过程中的执行顺序不可预知。\n（2：任务\n◦ 同步：dispatch_sync,同步会阻塞当前线程，要等添加的耗时任务块block完成后，函数才能回返，后面的代码块才能继续执行。如果在主线程，则会发生阻塞，用户感觉应用不响应，这是开发中所要避免的。有时使用同步任务的的原因，是想保证任务的执行顺序。\n◦ 异步：dispatch_async，异步指的是将任务添加到队列之后函数立马返回，后面的代码不用等待添加的任务完成返回即可继续执行。\n • NSOperation, NSOperation是基于GCD的一个抽象基类，将线程封装成要执行的操作，不需要管理线程的同步和生命周期，比GCD更可控，例如可以加入操作依赖、设置操作队列最大可并发执行的操作个数、取消操作等。NSOperation作为抽象基类不具备封装我们操作的功能，需要他的两个实体子类，NSBlockOperation、NSInvocationOperatiom,或者继承NSOperation自定义子类。\n什么时候使用GCD什么时候使用NSOperation？\n如果任务有相互依赖关系，顺序性，就使用NSOperation\n如果需要多好的并发的能力就是使用GCD，当让我们平常简单任务处理也是使用GCD。"
  },
  {
    "topicType":"Swift",
    "topicTitle":"MVVM",
    "topicAnswer":"MVVM 这个模式的核心是VM层，这是个特殊的model类型。用来程序的UI状态。他包含描述每个UI状态的属性。比如文本输入域的当前文本，或者某个按钮是否可用，他同时暴露了视图可以执行哪些行为，例如按钮点击或手势。\n M数据模型层 model层用来存放服务器返回的JSON转成的model数据\n V视图展示层 主要指View和ViewController View可以直接拥有ViewModel\n VM 视图适配器，他暴露出的属性和View元素显示内容，或者元素状态一一对应。ViewModel可以拥有Model\nBinder:还有一个比较重要的binder，虽然MVVM单词中没有他的一席之地，但是binder是MVVM的灵魂。他的最主要作用是在View和ViewModel中间做了双向数据绑定。\n\nMVC缺点：Massive View Controller，也就是胖VC。\nMVVM缺点：1.学习成本高。2.DEBUG困难。\nMVVM优点：\n 1.低耦合。View层可以独立于Model进行变化和修改，同时一个VIewmodel可以绑定到多个View/VC上\n 2.可重用性，可以吧一些视图逻辑放进ViewModel层里，让很多View/VC进行重用\n 3.独立开发，通过MVVM开发人员可以专注逻辑开发在ViewModel里面。而设计开发，开一专注于界面设计\n 4.可测试，通常来说要进行界面测试比较困难，但是MVVM课对ViewModel进行测试"
  },
  {
    "topicType":"Swift",
    "topicTitle":"weak的自己实现",
    "topicAnswer":"1，建个全局的映射表;定义为弱引用表\n2，表的结构是哈希表；\n3，表的key是对象的地址内存地址\n4，表的value是指向该对象的所有弱引用的指针；\n5，当前对象的引用计数为0的时候查询到弱引用表里的对象内存地址，遍历其中指向该对象的所有指针，将其置为nil;"
  },
]

module.exports = {
  dataJson:baseData
}

