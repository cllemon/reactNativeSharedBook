## react-native-shared-book

Shared book application based on react-native implementation. Focus on sharing and keep moving forward.

### 产品思路：

1.  首页： 轮播图： 承接一些活动页，或者一些推送等等。
    搜索： 跳转到搜索页面。
    发现： 一些好的软文推介, 点击跳转到对应软文页。

2.  分类页： 两列展示： 大类 - 小类。
    大类: 包含 ”文学小说“ ”教辅“ “都市小说” “技术类书籍”
    小类： 大类下对应细分领域

3.  列表页： 展示分类页对应信息的长列表，可筛选，搜索。

4.  详情页： 展示一本书籍的详细信息；
    轮播图： 展示图片信息
    信息条： 展示简要信息（作者，出版，价格，版次等）
    介绍卡片: 主要展示作者简介，内容简介，目录三个板块。
    操作： 加入书柜。（未登录人员操作提示去登录）

5.  书柜页： 展示该用户书柜里的所有书籍；
    操作：进入阅读器阅读该书。
    这里未登录人员，一律提醒去登录。

6.  阅读器页： 满足基本功能：阅读，字体大小调节，亮度调节，主题调节。

7.  登录页： 账户密码登录 - 一期
    加入验证码 - 二期
    手机登录 - 三期
    第三方登录 - 四期

8.  注册页： 基本注册信息： 昵称，性别，账户，密码，邮箱；
    账户校验 - 是否存在 - 一期
    邮箱验证 - 是否验证 - 二期

9.  修改密码： 原密码，新密码，二次新密码；

10. 我的页面： 可以上传一些图书。

### 说明

> 纯粹是想体验一下混合应用而起的一个项目，可能略显粗糙，但会持续写下去，直到达到相当成熟度。

> 服务端主要以 node - egg 搭的一套服务，项目地址。

> APP 将以 ios 为主，兼容 Android 为辅.

> 开发环境 macOS: '10.14' react-native: '0.57.4' node: v8.8.0

> 如有任何问题欢迎在 Issues 交流 🐸

> 注：将持续迭代...

### 目标页面搭建计划（可能更改）

- [x] 登录页 -- 完成
- [x] 图书列表筛选页 -- 完成
- [x] 图书分类页 -- 完成
- [x] 图书详情页 -- 完成一半
- [x] 首页 -- 完成一半
- [ ] 发现页 -- 待续
- [ ] 我的页 -- 待续
- [ ] 注册页 -- 待续
- [ ] 修改密码 -- 待续
- [ ] 订单列表页 -- 待续
- [ ] 订单详情页 -- 待续
- [ ] 评价页面 -- 待续
- [ ] 增删改-收货地址页 -- 待续
- [ ] 搜索页 -- 待续
- [ ] 客服页 -- 待续

### 目标技术涵盖点

- [x] 轮播 -- 待续
- [x] 长列表 -- 待续
- [ ] 手机号码验证 -- 待续
- [ ] 第三方登录 -- 待续
- [ ] 表单校验 -- 待续
- [ ] 上传头像 -- 待续
- [ ] 客服搭建 -- 待续
- [ ] 分享 -- 待续
- [ ] 优惠券营销体系 -- 待续
- [ ] App 上架 -- 待续

## Results the preview

  <img src="https://github.com/cllemon/vue-components-practices/blob/master/src/assets/images/form.jpg" width="330" height= "620" />

  <img src="https://github.com/cllemon/vue-components-practices/blob/master/src/assets/images/form.jpg" width="330" height= "620" />

  <img src="https://github.com/cllemon/vue-components-practices/blob/master/src/assets/images/form.jpg" width="330" height= "620" />

## Project setup

### 安装 React Native 的命令行工具

```
yarn add react-native-cli
```

### 下载和安装 Android Studio / XCode

```
App store
```

### (指定设备上)运行 APP

```

react-native run-ios

react-native run-android

react-native run-ios --simulator "iPhone 7 Plus”

```
