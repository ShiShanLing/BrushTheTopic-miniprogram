# BrushTheTopic-miniprogram
小程序学习

# 通用的自定义页面使用
## 因为需要自定义导航条,而且导航条要固定住不随着页面滑动,所以就自定义了组件 navigation-controller   
/**
isHideBackButton:是否隐藏返回按钮
backgroundColor:页面内部背景颜色
goBack 返回按钮绑定事件
*/
<navigation-controller isHideBackButton="" backgroundColor="rgb(242, 242, 242)" bind:goBack="goBack">
  <!-- 插槽 -->
  <view slot="before" style="width: 100%;">

  </view>
</navigation-controller>

