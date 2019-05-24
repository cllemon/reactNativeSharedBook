<p align="center">
  <img src="./app/assets/images/logo.png" alt="" height="100"  width="100">
</p>
<p align="center">
  <img src="https://img.shields.io/badge/License-MIT-lightgrey.svg" alt="">
  <img src="https://img.shields.io/badge/Powered%20by-ReactNative-28b1b0.svg" alt="">
</p>

## react-native-share-book

> 最初写这个项目纯粹就是满足自己读书的要求同时扩展一下知识技能，
> 后来发现周围很多认识的人都有阅读电子书的习惯，无奈大多第三方软件大多收费，
> 所以干脆自己好好去写一个以共享为主题的图书，让获取知识的途径更“便捷”。

> 由于“闲余”时间比较有限，加之接触 react 不久，写的也难免会有些仓促（多多包涵）...
> 但随着后续 深入 react 的过程中，肯定会改进项目中的不足之处。

> 目前项目很多功能只是初版，资源量也不是很大，但是这些都将会利用工作之余慢慢更新迭代。

> 本项目所有接口来源均是利用 [eggjs](https://github.com/eggjs/egg/) 写的一套 node 服务，
> 由于初版使用 js 写的，后期慢慢会用 TS 重构，所以这个项目就不放上来了，[API - 接口文档](https://github.com/cllemon/ReactNativeSharedBook/blob/master/app/assets/public/API.md)。

> 由于服务带宽很小，请不要“疯炸”接口，若有需要数据请直接留言，我会直接放出来。

> 如果对您有帮助，您可以点右上角 "Star" 鼓励一下 谢谢！ ^\_^

## 项目内容

### 注册页

| instructions                         | Preview（IOS）                             | Preview（Android）                                                         |
| ------------------------------------ | ------------------------------------------ | -------------------------------------------------------------------------- |
| `提供用户注册的页面，生成账户的页面` | ![register_ios](./public/register_ios.gif) | <img src="./public/register_android.png" alt="" height="362"  width="187"> |

### 登录页

| instructions         | Preview（IOS）                       | Preview（Android）                                                      |
| -------------------- | ------------------------------------ | ----------------------------------------------------------------------- |
| `用于用户登录的页面` | ![login_ios](./public/login_ios.gif) | <img src="./public/login_android.png" alt="" height="362"  width="187"> |

### 书城页

| instructions                                     | Preview（IOS）                            | Preview（Android）                                                        |
| ------------------------------------------------ | ----------------------------------------- | ------------------------------------------------------------------------- |
| `书城承载了所有图书资源，包含一级分类及推介数目` | ![register_ios](./public/library_ios.gif) | <img src="./public/library_android.png" alt="" height="362"  width="187"> |

### 列表页

| instructions                                                 | Preview（IOS）                           | Preview（Android）                                                     |
| ------------------------------------------------------------ | ---------------------------------------- | ---------------------------------------------------------------------- |
| `展示对应一级分类下所有图书列表，包含二级图书类目及图书信息` | ![login_ios](./public/book_list_ios.gif) | <img src="./public/list_android.png" alt="" height="362"  width="187"> |

### 详情页

| instructions           | Preview（IOS）                                | Preview（Android）                                                       |
| ---------------------- | --------------------------------------------- | ------------------------------------------------------------------------ |
| `介绍每一本书详细信息` | ![register_ios](./public/book_detail_ios.gif) | <img src="./public/detail_android.png" alt="" height="362"  width="187"> |

### 阅读器页

| instructions                                                   | Preview（IOS）                              | Preview（Android）                                                        |
| -------------------------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------- |
| `用于解析资源，阅读的容器，实现基本的目录、换肤、阅读基本功能` | ![login_ios](./public/book_reading_ios.gif) | <img src="./public/reading_android.png" alt="" height="362"  width="187"> |

### 我的页

| instructions                                                 | Preview（IOS）                         | Preview（Android）                                                     |
| ------------------------------------------------------------ | -------------------------------------- | ---------------------------------------------------------------------- |
| `主要放一些展示用户信息，设置等将在后期迭代更新的功能点入口` | ![register_ios](./public/mine_ios.gif) | <img src="./public/mine_android.png" alt="" height="362"  width="187"> |

### 个人信息页及书架

| instructions                               | Preview（IOS）                               | Preview（Android）                                                         |
| ------------------------------------------ | -------------------------------------------- | -------------------------------------------------------------------------- |
| `主要用于展示用户个人信息，及编辑个人信息` | ![login_ios](./public/personal_info_ios.gif) | <img src="./public/bookcase_android.png" alt="" height="362"  width="187"> |

### 设置页

| instructions                                 | Preview（IOS）                         | Preview（Android）                                                        |
| -------------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------- |
| `主要承载一些基础功能展示，及编辑的功能页面` | ![login_ios](./public/setting_ios.gif) | <img src="./public/setting_android.png" alt="" height="362"  width="187"> |

### 搜索页

| instructions                         | Preview（IOS）                        | Preview（Android）                                                       |
| ------------------------------------ | ------------------------------------- | ------------------------------------------------------------------------ |
| `用于快捷搜索图书，主要检索图书名称` | ![login_ios](./public/search_ios.gif) | <img src="./public/search_android.png" alt="" height="362"  width="187"> |

## 开发环境及第三方框架

- 开发环境:

  - macOS 10.14.3
  - node "v8.8.0"
  - react-native-cli "2.0.1"
  - Android Studio "3.2"
  - Xcode "10.2.1"

- 第三方框架
  - [react-native(0.58.6)](https://github.com/facebook/react-native)
  - [react-native-image-picker](https://github.com/react-native-community/react-native-image-picker)
  - [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)
  - [react-native-swiper](https://github.com/react-native-community/react-native-swiper)
  - [react-navigation](https://github.com/react-navigation/react-navigation)

## License

[MIT](http://opensource.org/licenses/MIT) License - Copyright (c) 2019 lemon。
