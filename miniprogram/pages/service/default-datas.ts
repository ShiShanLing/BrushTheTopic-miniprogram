

export interface TopicType {
  text: string,
  value: string,
}

export interface Topic {
  //题目类型
  topicType:string,
  //学习次数
  learnNum:number,
  
  //学习水平 0 没学过,1已学习,2忘记答案
  levelLearning:number,
  //题目
  topicTitle:string,
  //答案.
  topicAnswer:string,
  //
  id:string,
}

var topicType: TopicType[] = [
  { text: 'OC', value: "OC" },
  { text: 'Swift', value: "Swift" },
  { text: 'CSS', value: "CSS" },
  { text: 'JS', value: "JS" },
  { text: 'TS', value: "TS" },
  { text: '小程序', value: "小程序" },
  { text: 'Flutter', value: "Flutter" },
]
//
var baseData:Topic[] = [
  {
    "id":'0',
    "topicType":"Swift",
    "learnNum":0,
    "levelLearning":0,
    "topicTitle":"什么是runLoop？他可以用来做什么？项目中需要注意的地方。",
    "topicAnswer":"runLoop顾名思义，是一种循环，但是他不像dowhile一样，会使CPU进入忙等状态，RunLoop在没有任务的时候会进入休眠状态，有任务的时候再唤醒去处理对应的任务。RunLoop是一个对象，它包含多个mode，多个commonMode和一个正在运行的mode。RunLoop和线程是绑定在一起的。每个线程都有一个对应的RunLoop对象，我们可以获取他，但是我们不能直接创建RunLoop。RunLoop和线程是一一对应的，对应的方式是以key--value的方式存储在一个全局的数据字典表里。主线程的RunLoop在初始化字典表的时候创建好子线程的RunLoop在首次被调用的时候创建，如果不调用那就一直不会被创建、RunLoop会在线程销毁掉之后自动销毁。项目中的运用Timer一个timer被加入到RunLoop中的时候，RunLoop会为重复的时间点添加事件。例如10：10，10：20，但是RunLoop为了节约资源并不会在非常准确的时间点调用这个Timer。NSTimer有个属性叫做Tolerance（宽容度），标记了到了当前时间点之后，允许的最大误差值。由于NTimer这种机制，所以他必须依赖于RunLoop才能执行。如果这个时间点错过了他只能等待下一个时间点。就像公交车，玩手机错过了这一班车，就只能等下一班车。为了避免这个问题。可以使用GCDTimer，因为GCD的Timer所在线程如果没有RunLoop，GCD会临时创建一个线程起执行这个block，执行完再销毁掉。AutoreleasePoolARC下的产物，为了替代人工管理内存，大大简化了iOS开发人员的内存管理工作；实际是系统代替人工在合适的地方添加release、autoRelease等内存释放操作。RunLoop和AutoreleasePool的关系。创建RunLoop时会创建一个AutoreleasePool，RunLoop进入休眠时会销毁掉AutoreleasePool并创建一个新的AutoreleasePool。RunLoop被销毁时，AutoreleasePool也会被销毁。ScrollView在scrollView滑动的时候会使NSTimer无效。有两种解决方法。（1.吧NSTimer放进runLoop并设置mode为common（2.使用GCDTimer实现常驻线程"
  },
  {
    "id":"1",
    "topicType":"Swift",
    "learnNum":0,
    "levelLearning":0,
    "topicTitle":"远程推送流程",
    "topicAnswer":"1.App注册APNs\n（a.只要注册过的设备才能接受到消息,在UIApplication的registerUserNotificationSettings:方法注册\n（b.注册之前有两个必要条件必须准备好：开发配置文件，应用程序的bundle indentifier应和配置文件的App Id一致。\n\n2.App获取device Token\n（a.在 DidRegisterForRemoteNotificationWithDeviceToken中获取device Token 此方法发生在注册之后。\n（b.如果获取失败需要在didFailToRegisterForRemoteNotificationWithError 中查看错误信息，此方法发生在获取device Token失败之后\n（c.只能在真机上获取device Token\n\n3.App 发送 device Token 给应用程序服务商，告诉服务器当前设备允许接收消息\n（a.device Token生产算法只有apple掌握。所以为了避免算法发生变化收不到推送，所以每次启动App都要获取device Token。\n（b.通常可以通过一个网络请求，吧device Token发送给应程序服务商的服务器端。在这个过程中最好只上传一次，一旦发现device Token发生变化 最后将旧的deviceToken一起上送给服务器端。服务器端删除旧令牌，存入新令牌，防止发送无效消息。\n\n4.应用程序服务商收到App device Token 组织信息发送给APNs。\n\n5.APNs根据消息中的 device Token 查找已注册的设备 发送消息。\n（a.正常情况下可以根据device Token可以成功吧消息发送到客户端，但是也不排除客户端被卸载的情况，如果发生错误，APNs会将这个错误信息通知服务端，防止浪费资源。（服务端收到这错误信息会把这个device Token移除  下次不再发送。）"
  },
  {
    "id":"2",
    "topicType":"Swift",
    "learnNum":0,
    "levelLearning":0,
    "topicTitle":"什么是runTime， 他可以用来做什么？项目中的运用。",
    "topicAnswer":"• 什么是runtime \nOC的函数调用称为消息发送。属于动态调用过程。在编译期并不能决定真正调用哪个函数，只有在运行的时候才会根据函数的名称找到对应的函数来调用。\n\n说到runtime就离不开消息发送机制\n1.对象调用一个方法就是向这个对象发送一条消息。首先通过对象的isa指针去找对象所对应的class，然后在class的cache中通过该SEL查找对应函数method,如果cache里面未找到，就去methodList里面去找。如果还找不到就去superClassMethodList里面去找，如果找到了，就放进cache里面，方便下次使用。 如果还是找不到，runtime不会立即报错。而是开始给对象几次补救的机会。\n1. 动态方法解析：向当前类发送resolveInstanceMethod信号,询问当前对象有没有动态添加这个方法\n2. 向当前对象发送 forwardingTragetSelector信号 询问当前对象，有没有别的对象可以处理这个消息。\n3. 如果上面两个方法都没有做处理，将会进行消息转发：runtime发送methodSignatrueSelector消息获取selector对应的方法签名，如果返回非空就调用forwrrdInvocation消息转发，如果返回空，就会向对象发送doesNotRecognizeSelector 程序崩溃退出\n4. 如果本类中没有的方法就去父类里面去找，父类里面没有就去其他类里面去找，如果找到了就返回这个对象，让其执行，这样就实现了消息转发。\n• 他可以用来做什么\n1.动态给系统类添加方法和变量\n2.替换系统的方法实现\n3.防crash（具体方案需要仔细看）\n3.归档接档（例如第三方model生成库）\n4.json转model（具体实现需要看第三方库）"
  },  
  {
    "id":'3',
    "topicType":"Swift",
    "learnNum":0,
    "levelLearning":0,
    "topicTitle":"什么是KVC\?他可以用来做什么\?底层原理\?",
    "topicAnswer":"(Key-value coding）键值编码\nKVC应用场景，通常用来修改类的属性，或者字典转模型\nKVC，通过字符串的方式访问属性，当一个对象的属性调用setValue方法时，会现在对象的内部查找对应的setKey方法，如果没有找到，就查找与key同名且带有下划线的属性，如果还没有找到，就查找key同名的属性并赋值。\n如果到这里还没有找到， 就调用setValueForUndefindeKey和 setValue：forUndefindeKey 方法。"
  },  
  {
    "id":'4',
    "topicType":"Swift",
    "learnNum":0,
    "levelLearning":0,
    "topicTitle":"什么是KVO\?,底层原理\?",
    "topicAnswer":"(Key Value Observing, 键值观察)\nKVO的本质就是重写被观察属性的setter方法。 \n当一个类的属性被观察，系统会通过runTime为这个类添加一个派生类。并把这个类的isa指针指向这个派生类，这样就实现了给被观察属性赋予新值是，调用的是派生类的set方法。重写的set方法在值改变的前后 (willChangeValueForKey didChangeValueForKey),通知观察对象，值的变化。"
  },  {
    "id":"5",
    "topicType":"Swift",
    "learnNum":0,
    "levelLearning":0,
    "topicTitle":"Thread,GCD,Operation",
    "topicAnswer":"• Thread是封装程度最小最轻量级，使用更灵活，但是需要手动管理线程的生命周期、线程同步和线程加锁等，开销比较大。\n\n• GCD（Grand Central Dispatch），又叫做大中央调度，对线程操作进行了封装，加入了新特性，内部进行了效率优化，提供简洁的C语言接口，使用更加简洁高效，也是苹果推荐的方法。\nGCD的优点\nGCD会自动利用更多的CPU内核\nGCD可用于多核的并行运算\nGCD会自动管理线程的生命周期\n程序员只需要告诉GCD执行什么任务，不需要编写任何线程管理代码。\n有两个比较重要的概念队列和任务\n（1：队列\n  ◦ 串行：FIFO的方式执行队列中的任务\n  ◦ 并行：队列中的先后添加的任务可以同时并行执行，任务之间不会相互等待，而且这些任务执行过程中的执行顺序不可预知。\n（2：任务\n ◦ 同步：dispatch_sync,同步会阻塞当前线程，要等添加的耗时任务块block完成后，函数才能回返，后面的代码块才能继续执行。如果在主线程，则会发生阻塞，用户感觉应用不响应，这是开发中所要避免的。有时使用同步任务的的原因，是想保证任务的执行顺序。\n ◦ 异步：dispatch_async，异步指的是将任务添加到队列之后函数立马返回，后面的代码不用等待添加的任务完成返回即可继续执行。\n\n• NSOperation, NSOperation是基于GCD的一个抽象基类，将线程封装成要执行的操作，不需要管理线程的同步和生命周期，比GCD更可控，例如可以加入操作依赖、设置操作队列最大可并发执行的操作个数、取消操作等。NSOperation作为抽象基类不具备封装我们操作的功能，需要他的两个实体子类，NSBlockOperation、NSInvocationOperatiom,或者继承NSOperation自定义子类。\n什么时候使用GCD什么时候使用NSOperation？\n如果任务有相互依赖关系，顺序性，就使用NSOperation\n如果需要多好的并发的能力就是使用GCD，当让我们平常简单任务处理也是使用GCD。"
  },  {
    "id":"6",
    "topicType":"Swift",
    "learnNum":0,
    "levelLearning":0,
    "topicTitle":"MVVM",
    "topicAnswer":"MVVM 这个模式的核心是VM层，这是个特殊的model类型。用来程序的UI状态。他包含描述每个UI状态的属性。比如文本输入域的当前文本，或者某个按钮是否可用，他同时暴露了视图可以执行哪些行为，例如按钮点击或手势。\nM数据模型层 model层用来存放服务器返回的JSON转成的model数据\nV视图展示层 主要指View和ViewController View可以直接拥有ViewModel\nVM 视图适配器，他暴露出的属性和View元素显示内容，或者元素状态一一对应。ViewModel可以拥有Model\nBinder还有一个比较重要的binder，虽然MVVM单词中没有他的一席之地，但是binder是MVVM的灵魂。他的最主要作用是在View和ViewModel中间做了双向数据绑定。\n\nMVC缺点：Massive View Controller，也就是胖VC。\nMVVM缺点：1.学习成本高。2.DEBUG困难。\n\nMVVM优点：\n 1.低耦合。View层可以独立于Model进行变化和修改，同时一个VIewmodel可以绑定到多个View/VC上\n 2.可重用性，可以吧一些视图逻辑放进ViewModel层里，让很多View/VC进行重用\n 3.独立开发，通过MVVM开发人员可以专注逻辑开发在ViewModel里面。而设计开发，开一专注于界面设计\n 4.可测试，通常来说要进行界面测试比较困难，但是MVVM课对ViewModel进行测试"
  },  {
    "id":'7',
    "topicType":"Swift",
    "learnNum":0,
    "levelLearning":0,
    "topicTitle":"weak的自己实现",
    "topicAnswer":"1，建个全局的映射表;定义为弱引用表\n2，表的结构是哈希表；\n3，表的key是对象的地址内存地址\n4，表的value是指向该对象的所有弱引用的指针；\n5，当前对象的引用计数为0的时候查询到弱引用表里的对象内存地址，遍历其中指向该对象的所有指针，将其置为nil;"
  },  {
    "id":"8",
    "topicType":"Swift",
    "learnNum":0,
    "levelLearning":0,
    "topicTitle":"__block的自己实现",
    "topicAnswer":"1,__block是内部是一个对象 {iSA，forwarding指针，当前对象}\n2，block的截获变量是劫持局部变量，局部静态变量是劫持不了的，全局的也劫持不了；\n3，我们可以参考局部静态变量截获不了的原因是因为访问的是局部变量的指针，所以对象的值改变，指针对应的也会改变，那么我们可以设计一个结构体包括当前对象和一个指向当前对象的指针，我们让block内部截获该结构体的指针，那么改变对象的值后，指针指向的内存空间的值也会随之改变。"
  },  {
    "id":"9",
    "topicType":"Swift",
    "learnNum":0,
    "levelLearning":0,
    "topicTitle":"一个接口/方法被调用一万次的优化方案；",
    "topicAnswer":"1，系统为了加快查找效率，是利用了缓存，在缓存列表缓存该方法的地址。\n2，我们可以直接访问该方法的指针地址来加快查找效率。"
  },  {
    "id":"10",
    "topicType":"Swift",
    "learnNum":0,
    "levelLearning":0,
    "topicTitle":"分类的方法覆盖原类方法如何不让覆盖而调用；",
    "topicAnswer":"1，遍历类方法列表，查找当前方法同名的所有实现，然后调用最后一个，就是原类方法\n2， <p>Method * modethods \= class_copyMethodList([self class],&count);//u_int count;\n Sel name \= method_getName(methods[i])\n If name \=\= 想要的 index \= I；\n Sel name \= method_getName(methods[index])\n IMP imp \= method_getImpImplementaion(methods[index])</p>"
  },  {
    "id":"11",
    "topicType":"Swift",
    "learnNum":0,
    "levelLearning":0,
    "topicTitle":"swift的泛型理解",
    "topicAnswer":"   1，泛型就是起个占位符作用，string,array,dictionay都是泛型；\n2，泛型函数，泛型类型，泛型约束，泛型协议。"
  },
  {
    "id":"12",
    "topicType":"Swift",
    "learnNum":0,
    "levelLearning":0,
    "topicTitle":"swift的Option底层实现，",
    "topicAnswer":"1，原理和三目运算符差不多，有值得时候就是值本身，无值的时候就是 nil 底层是枚举：case:none,some(Wrapped),关联值就是传进来的值；\n 2,由于不知道是什么类型所以需要解包；\n3，解包方式：\n 1.强制解包：！,nin就奔溃；\n 2，妥协解包（if let a\=option）\n 3,空合运算符式解包：\?\? 给默认值；\n4，optional的链式调用；如：ob\?.cls\?.name\?.uppercased()，果其中任何一个节点为 nil ，整个调用链都会失败，即返回 nil ，而不会crash\n5，隐式可选就是let height \= ''"
  },
  {
    "id":"13",
    "topicType":"Swift",
    "learnNum":0,
    "levelLearning":0,
    "topicTitle":"为什么使用swift，他比oc的优势",
    "topicAnswer":"1、Swift容易阅读，语法和文件结构简易化。\n2、Swift更易于维护，文件分离后结构更清晰。\n3、Swift更加安全，它是类型安全的语言。\n4、Swift代码更少，简洁的语法，可以省去大量冗余代码\n5、Swift速度更快，运算性能更高。\n访问权限由大到小依次为：open，public，internal（默认），fileprivate，private"
  },
  {
    "id":"14",
    "topicType":"Swift",
    "learnNum":0,
    "levelLearning":0,
    "topicTitle":"swift Unowned与Weak的理解",
    "topicAnswer":"1,如果产生循环引用的两个属性都允许为nil,这种情况适合用弱引用来解决\n两个类中,相互引用的两个属性都为可选类型,那么可以在一个属性的前面添加****weak****关键字,使该变量变为弱引用.\n2,如果产生循环引用的两个属性一个允许为nil,另一个不允许为nil,这种情况适合用无主引用来解决\n只能在不能为nil的那个属性前面加unowned关键字,就是说unowned设置以后即使它原来引用的内容已经被释放了，它仍然会保持对被已经释放了的对象的一个 ****无效的**** 引用，它不能是 Optional 值，也不会被指向 nil****。如果尝试去调用这个引用的方法或者访问成员属性的话，程序就会崩溃.\n3,如果产生循环引用的两个属性都必须有值,不能为nil,这种情况适合一个类使用无主属性,另一个类使用隐式解析可选类型;"
  },
  {
    "id":"16",
    "topicType":"OC",
    "learnNum":0,
    "levelLearning":0,
    "topicTitle":"一个NSObject对象占用多少内存\?",
    "topicAnswer":"系统分配了16个字节给NSObject对象(通过malloc_size函数获得)\n但NSObject对象内部只使用了8个字节的空间(64bit环境下，可以通过class_getInstanceSize函数获得)"
  },
  {
    "id":"17",
    "topicType":"OC",
    "learnNum":0,
    "levelLearning":0,
    "topicTitle":"对象的isa指针指向哪里\?",
    "topicAnswer":"instance对象的isa指向class对象\nclass对象的isa指向meta-class对象\nmeta-class对象的isa指向基类的meta-class对象"
  },
  {
    "id":"18",
    "topicType":"Flutter",
    "learnNum":0,
    "levelLearning":0,
    "topicTitle":"Dart语法中dynamic，var，object三者的区别",
    "topicAnswer":"var定义的类型是不可变的，dynamic和object类型是可以变的，而dynamic 与object 的最大的区别是在静态类型检查上"
  },
  {
    "id":"19",
    "topicType":"Flutter",
    "learnNum":0,
    "levelLearning":0,
    "topicTitle":"Dart中 \?\? 与 \?\?\\= 的区别",
    "topicAnswer":"A\?\?B\n左边如果为空返回右边的值，否则不处理。\nA\?\?\=B\n左边如果为空把B的值赋值给A"
  },
  {
    "id":"20",
    "topicType":"TS",
    "learnNum":0,
    "levelLearning":0,
    "topicTitle":"什么是TypeScript",
    "topicAnswer":"Typescript 是一个强类型的 JavaScript 超集，支持ES6语法，支持面向对象编程的概念，如类、接口、继承、泛型等。Typescript并不直接在浏览器上运行，需要编译器编译成纯Javascript来运行。"
  },
  {
    "id":"21",
    "topicType":"TS",
    "learnNum":0,
    "levelLearning":0,
    "topicTitle":"TypeScript 中 any、never、unknown、null & undefined 和 void 有什么区别？",
    "topicAnswer":"any: 动态的变量类型（失去了类型检查的作用）。\nnever: 永不存在的值的类型。例如：never 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型。\nunknown: 任何类型的值都可以赋给 unknown 类型，但是 unknown 类型的值只能赋给 unknown 本身和 any 类型。\nnull & undefined: 默认情况下 null 和 undefined 是所有类型的子类型。 就是说你可以把 null 和  undefined 赋值给 number 类型的变量。当你指定了 --strictNullChecks 标记，null 和 undefined 只能赋值给 void 和它们各自。\nvoid: 没有任何类型。例如：一个函数如果没有返回值，那么返回值可以定义为void。"
  },
]

module.exports = {
  dataJson:baseData,
  topicType:topicType
}

