
var baseData = [
  {
    "topicType":"Swift",
    "topicTitle":"什么是runLoop？他可以用来做什么？项目中需要注意的地方。",
    "topicAnswer":"runLoop顾名思义，是一种循环，但是他不像dowhile一样，会使CPU进入忙等状态，RunLoop在没有任务的时候会进入休眠状态，有任务的时候再唤醒去处理对应的任务。RunLoop是一个对象，它包含多个mode，多个commonMode和一个正在运行的mode。RunLoop和线程是绑定在一起的。每个线程都有一个对应的RunLoop对象，我们可以获取他，但是我们不能直接创建RunLoop。RunLoop和线程是一一对应的，对应的方式是以key--value的方式存储在一个全局的数据字典表里。主线程的RunLoop在初始化字典表的时候创建好子线程的RunLoop在首次被调用的时候创建，如果不调用那就一直不会被创建、RunLoop会在线程销毁掉之后自动销毁。项目中的运用Timer一个timer被加入到RunLoop中的时候，RunLoop会为重复的时间点添加事件。例如10：10，10：20，但是RunLoop为了节约资源并不会在非常准确的时间点调用这个Timer。NSTimer有个属性叫做Tolerance（宽容度），标记了到了当前时间点之后，允许的最大误差值。由于NTimer这种机制，所以他必须依赖于RunLoop才能执行。如果这个时间点错过了他只能等待下一个时间点。就像公交车，玩手机错过了这一班车，就只能等下一班车。为了避免这个问题。可以使用GCDTimer，因为GCD的Timer所在线程如果没有RunLoop，GCD会临时创建一个线程起执行这个block，执行完再销毁掉。AutoreleasePoolARC下的产物，为了替代人工管理内存，大大简化了iOS开发人员的内存管理工作；实际是系统代替人工在合适的地方添加release、autoRelease等内存释放操作。RunLoop和AutoreleasePool的关系。创建RunLoop时会创建一个AutoreleasePool，RunLoop进入休眠时会销毁掉AutoreleasePool并创建一个新的AutoreleasePool。RunLoop被销毁时，AutoreleasePool也会被销毁。ScrollView在scrollView滑动的时候会使NSTimer无效。有两种解决方法。（1.吧NSTimer放进runLoop并设置mode为common（2.使用GCDTimer实现常驻线程"
  }
]


module.exports = {
  dataJson:baseData
}