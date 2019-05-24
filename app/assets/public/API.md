# API 接口文档

> 域名地址：
> 基础域名： http://47.99.144.152:7001/

## 注册页

> 地址： api/user/register

> 方法： POST

### 参数字段

| name       | type   | required | description  | other                                              |
| ---------- | ------ | -------- | ------------ | -------------------------------------------------- |
| user_name  | String | true     | 用户名       | 用户名： 字母                                      |
| password   | String | true     | 密码         | 至少六位                                           |
| avatar_url | String | false    | 用户头像地址 | base64 位小文件或 URL                              |
| phone      | Number | true     | 手机号码     | 谨慎填写 - 用于找回密码用 （目前没能力做短信验证） |

### 返回字段

| name | type | description | other |
| ---- | ---- | ----------- | ----- |
| none |      |             |       |

#### 接口返回示例

```json
{
  "code": 0,
  "data": {},
  "tips": {
    "tipType": 1,
    "text": "操作成功"
  }
}
```

## 登录页

> 地址： api/user/login

> 方法： POST

### 参数字段

| name      | type   | required | description | other        |
| --------- | ------ | -------- | ----------- | ------------ |
| user_name | String | true     | 用户名      | 用户名：字母 |
| password  | String | true     | 密码        | 至少六位     |

### 返回字段

| name                 | type   | description      | other                                                 |
| -------------------- | ------ | ---------------- | ----------------------------------------------------- |
| gender               | Number | 性别             | 0：女；1：男                                          |
| nickname             | String | 昵称             |                                                       |
| avatar_url           | String | 用户头像地址     |                                                       |
| access_token         | String | token            |                                                       |
| user_id              | String | 用户唯一标识     |                                                       |
| user_name            | String | 用户名           |                                                       |
| phone                | Number | 手机号码         | 19805815940                                           |
| reading_time         | String | 该账户阅读总时长 | 您已在本 APP 阅读总时长 800 小时 30 分钟 （暂时不做） |
| current_reading_time | String | 当天阅读时长     | 您今天在本 APP 阅读时长 4 小时 30 分钟 （暂时不做）   |

#### 接口返回示例

```json
{
  "code": 0,
  "data": {
    "gender": 1,
    "nickname": "Lemon",
    "avatar_url": "https://i.loli.net/2019/03/29/5c9e09f45a28c.jpg",
    "access_token": "asksdjoiwejfdwkemdlkmwoidmodm2342342m3wnedjkwasnomd2k3ew32edwmaspmxl2q1231lxsasd",
    "user_id": "asskaasdwerrjnvrk32fkljef2323w",
    "user_name": "cllemon",
    "reading_time": "800小时30分钟",
    "current_reading_time": "4小时30分钟",
    "phone": 19805815940
  },
  "tips": {
    "tipType": 1,
    "text": "操作成功"
  }
}
```

## 找回密码

> 地址： /api/user/reset

> 方法： POST

> Tips: 目前 只要这两个字段去找回吧

### 参数字段

| name      | type   | required | description | other |
| --------- | ------ | -------- | ----------- | ----- |
| user_name | String | true     | 用户名      |       |
| phone     | Number | true     | 手机号码    |       |
| password  | String | true     | 新密码      |       |

### 返回字段

| name | type | description | other |
| ---- | ---- | ----------- | ----- |
| none |      |             |       |

#### 接口返回示例

```json
{
  "code": 0,
  "data": {},
  "tips": {
    "tipType": 1,
    "text": "操作成功"
  }
}
```

## 书架页 - 书架图书列表

> 地址： api/bookcase/list

> 方法： GET

### 参数字段

| name    | type   | required | description | other |
| ------- | ------ | -------- | ----------- | ----- |
| user_id | String | true     | 用户 ID     |       |

### 返回字段

| name     | type   | description      | other |
| -------- | ------ | ---------------- | ----- |
| list     | Array  | 书架图书列表     |       |
| cover    | String | 书架图书图片地址 |       |
| title    | String | 书架图书名       |       |
| book_id  | String | 书架图书 ID      |       |
| progress | String | 书架图书阅读进度 |       |

#### 接口返回示例

```json
{
  "code": 0,
  "data": {
    "list": [
      {
        "cover": "sdasdwee1232ewsada.png",
        "book_id": "asdwa22323edw21312asdxas",
        "title": "AI前线",
        "create_time": 1558259456000,
        "update_time": 1558259456000,
        "progress": 0,
        "id": "84af01b55c284af01b55c284af01b55c2"
      },
      ...
    ]
  },
  "tips": {
    "tipType": 1,
    "text": "操作成功"
  },
}
```

## 书架页 - 加入书架

> 地址： api/bookcase/add

> 方法： POST

### 参数字段

| name    | type   | required | description | other |
| ------- | ------ | -------- | ----------- | ----- |
| user_id | String | true     | 用户 ID     |       |
| book_id | String | true     | 图书 ID     |       |
| cover   | String | true     | 图书 封面   |       |

### 返回字段

| name | type | description | other |
| ---- | ---- | ----------- | ----- |
| none |      |             |       |

#### 接口返回示例

```json
{
  "code": 0,
  "data": {},
  "tips": {
    "tipType": 1,
    "text": "操作成功"
  }
}
```

## 书架页 - 移除书架

> 地址： api/bookcase/remove

> 方法： POST

### 参数字段

| name    | type   | required | description | other |
| ------- | ------ | -------- | ----------- | ----- |
| user_id | String | true     | 用户 ID     |       |
| book_id | String | true     | 藏书 ID     |       |

### 返回字段

| name | type | description | other |
| ---- | ---- | ----------- | ----- |
| none |      |             |       |

#### 接口返回示例

```json
{
  "code": 0,
  "data": {},
  "tips": {
    "tipType": 1,
    "text": "操作成功"
  }
}
```

## 书城 - 获取图书一级分类信息

> 地址： api/categories/list

> 方法： GET

### 参数字段

| name | type | required | description | other |
| ---- | ---- | -------- | ----------- | ----- |
| 无   |      |          |             |       |

### 返回字段

| name              | type   | description                                                        | other |
| ----------------- | ------ | ------------------------------------------------------------------ | ----- |
| list              | Array  | 一级类目信息列表                                                   |       |
| categories_id     | String | 一级类目 ID                                                        |       |
| label             | String | 一级类目名称                                                       |       |
| count             | Number | 一级类目下所含图书总数                                             |       |
| description       | String | 一级类目描述                                                       |       |
| cover             | String | 一级类目背景图（mobile）                                           |       |
| larger_cover      | String | 一级类目背景图（大）                                               |       |
| combination_cover | String | 一级类目背景图 (组合)                                              |       |
| titles            | String | 一级类目下所含图书名称缩略字符                                     |       |
| subclass_overview | String | 一级类目下所含图书二级类目简述                                     |       |
| subclass_count    | Number | 一级类目下对应二级类目数量(筛选条件 ：全部：言情 悬疑推理 科幻···) |       |
| id                | String | ID                                                                 |       |
| create_time       | Date   |                                                                    |       |
| update_time       | Date   |                                                                    |       |
| version           | Date   |                                                                    |       |

#### 接口返回示例

```json
{
  "code": 0,
  "data": {
    "list": [
      {
        "label": "文学",
        "categories_id": "18e77ec84d514c67aa0512f8a199fd85",
        "count": 4902,
        "description": "",
        "cover": "https://i.loli.net/2019/03/29/5c9e09f45a28c.jpg",
        "combination_cover": "https://i.loli.net/2019/03/29/5c9e09f45a28c.jpg",
        "larger_cover": "https://i.loli.net/2019/03/29/5c9e09f45a28c.jpg",
        "titles": "奇想博物志、烟花易冷，你依然如来时孤独、山风吹来薯...",
        "subclass_overview": ["文学理论", "历史评论"],
        "subclass_count": 12,
        "id": "579893d8cdf84c98a2f5b792070f5786",
        "create_time": 1554276782000,
        "update_time": 1554276782000,
        "version": 0
      },
      ...
    ]
  },
  "tips": {
    "tipType": 1,
    "text": "操作成功"
  },
}
```

## 书城 - 推荐（猜你喜欢）

> 地址： api/books/recommend

> 方法： GET

### 参数字段

| name | type | required | description | other |
| ---- | ---- | -------- | ----------- | ----- |
| 无   |      |          |             |       |

### 返回字段

| name           | type   | description                                                        | other |
| -------------- | ------ | ------------------------------------------------------------------ | ----- |
| authors        | String | 图书作者                                                           |       |
| categories_id  | String | 一级类目 ID                                                        |       |
| book_id        | String | 图书 ID                                                            |       |
| cover          | String | 一级类目背景图（mobile）                                           |       |
| hot            | String | 图书热度                                                           |       |
| summary        | String | 图书总结                                                           |       |
| title          | String | 图书题目                                                           |       |
| subclass_name  | String | 一级类目下所含图书二级类目名称                                     |       |
| subclass_count | Number | 一级类目下对应二级类目数量(筛选条件 ：全部：言情 悬疑推理 科幻···) |       |
| id             | String | ID                                                                 |       |
| create_time    | Date   |                                                                    |       |
| update_time    | Date   |                                                                    |       |
| version        | Date   |                                                                    |       |

#### 接口返回示例

```json
{
  "code": 0,
  "data": [
      {
        "authors": "【美】Aditya Bhargava",
        "book_id": "e438057f61d516ad3560",
        "categories_id": "18e77ec84d514c67aa0512f8a199fd85",
        "cover": "https://i.loli.net/2019/03/29/5c9e09f45a28c.jpg",
        "hot": 0,
        "summary": "像小说一样有趣的算法入门书！",
        "title": "算法图解",
        "subclass_name": "程序语言与软件开发",
        "subclass_id": 12,
        "id": "579893d8cdf84c98a2f5b792070f5786",
        "create_time": 1554276782000,
        "update_time": 1554276782000,
        "version": 0
      },
      ...
  ],
  "tips": {
    "tipType": 1,
    "text": "操作成功"
  },
}
```

## 列表页 - 获取二级类目信息

> 地址： api/categories/subclass

> 方法： GET

### 参数字段

| name          | type   | required | description | other                            |
| ------------- | ------ | -------- | ----------- | -------------------------------- |
| categories_id | String | true     | 一级类目 ID | 18e77ec84d514c67aa0512f8a199fd85 |

### 返回字段

| name          | type   | description                    | other |
| ------------- | ------ | ------------------------------ | ----- |
| list          | Array  | 二级类目信息列表               |       |
| category_name | String | 一级类目名称                   |       |
| categories_id | String | 一级类目 id                    |       |
| subclass_id   | Number | 二级类目 ID                    |       |
| label         | String | 二级类目名称                   |       |
| cover         | String | 二级类目背景图（mobile）       |       |
| titles        | String | 一级类目下所含图书名称缩略字符 |       |
| book_count    | Number | 二级类目数量图书数量           |       |
| id            | String | ID                             |       |
| create_time   | Date   |                                |       |
| update_time   | Date   |                                |       |
| version       | Date   |                                |       |

#### 接口返回示例

```json
{
  "code": 0,
  "data": {
    "list": [
      {
        "category_name": "文学",
        "categories_id": "18e77ec84d514c67aa0512f8a199fd85",
        "subclass_id": 362,
        "label": "散文随笔",
        "cover": "http://cover.read.duokan.com/mfsv2/download/fdsc3/p01NOF6GPnCP/68GxB7FogWqqCf.jpg!s",
        "titles": "奇想博物志、烟花易冷，你依然如来时孤独、山风吹来薯...",
        "book_count": 1657,
        "id": "140105c5160e4038b5e31eb9cdb931a1",
        "create_time": 1554278688000,
        "update_time": 1554278688000,
        "version": 0
      },
      ...
    ]
  },
  "tips": {
    "tipType": 1,
    "text": "请求成功"
  },
}
```

## 列表页 - 获取对应类目下图书信列表

> 地址： api/books/list

> 方法： POST

### 参数字段

| name          | type   | required | description     | other                  |
| ------------- | ------ | -------- | --------------- | ---------------------- |
| categories_id | String | false    | 图书一级分类 ID | 筛选一级类目含所有图书 |
| subclass_id   | Number | false    | 图书二级分类 ID | 筛选二级类目含所有图书 |
| page          | Number | true     | 页码            | min: 1                 |
| count         | Number | true     | 页尺寸          | max: 20                |

> subclass_id | categories_id 两者必须含其一即可

### 返回字段

| name          | type   | description               | other |
| ------------- | ------ | ------------------------- | ----- |
| list          | Array  | 图书二级分类项 - 对应列表 |       |
| total_count   | Number | 图书总量                  |       |
| cover         | String | 图书封面地址              |       |
| title         | String | 图书名                    |       |
| summary       | String | 图书总结                  |       |
| authors       | String | 图书 作者                 |       |
| categories_id | String | 图书所属一级类目 ID       |       |
| subclass_id   | String | 图书所属二级类目 ID       |       |
| subclass_name | String | 图书所属二级类目名称      |       |
| book_id       | String | 图书 ID                   |       |
| hot           | Number | 热度                      |       |

#### 接口返回示例

```json
{
  "code": 0,
  "tips": {
    "tipType": 1,
    "text": "请求成功"
  },
  "data": {
    "total_count": 1000,
    "list": [
      {
        "id": "000966b4290345a9a0cbbb967953d4b5",
        "create_time": 1554356304000,
        "update_time": 1554356304000,
        "title": "命运厚待认真生活的人",
        "cover": "http://sda1231sdsdasd1231TnxjtsHAt123AAVI0.jpg",
        "summary": "致所有认真生活的姑娘，“女孩到优雅女王”的变形记！",
        "authors": "日光卿晨",
        "book_id": "663cb498cbff4976a6e7fa730dea2b16",
        "hot": 0,
        "categories_id": "18e77ec84d514c67aa0512f8a199fd85",
        "subclass_id": 362,
        "subclass_name": "散文随笔"
      }
    ]
  }
}
```

## 图书详情页 - 获取图书详细信息

> 地址： api/books/detail

> 方法： GET

### 参数字段

| name    | type   | required | description | other |
| ------- | ------ | -------- | ----------- | ----- |
| book_id | String | true     | 图书 ID     |       |

### 返回字段

| name                 | type    | description  | other |
| -------------------- | ------- | ------------ | ----- |
| cover                | String  | 图书封面地址 |       |
| title                | String  | 图书名       |       |
| authors              | String  | 图书 作者    |       |
| book_id              | String  | 图书 ID      |       |
| copyright            | String  | 图书出版社   |       |
| word_count           | String  | 图书字数     |       |
| introduction         | String  | 图书 简介    |       |
| directory            | String  | 目录         | 暂无  |
| score                | Numbere | 评分         |       |
| main_tag             | String  | 主标签       |       |
| price                | String  | 价格         |       |
| epub                 | String  | 图书资源     |       |
| hot                  | String  | 热度         |       |
| publication_date     | String  | 出版日期     |       |
| tags                 | String  | 标签         |       |
| authors_introduction | String  | 作者简介     |       |

#### 接口返回示例

```json
{
  "code": 0,
  "tips": {
    "tipType": 1,
    "text": "请求成功"
  },
  "data": {
    "id": "000966b4290345a9a0cbbb967953d4b5",
    "create_time": 1554356304000,
    "update_time": 1554356304000,
    "main_tag": "失恋",
    "title": "命运厚待认真生活的人",
    "authors": "日光卿晨",
    "book_id": "663cb498cbff4976a6e7fa730dea2b16",
    "price": 36,
    "score": 8.4,
    "epub": "",
    "hot": 0,
    "publication_date": "2016-03-01",
    "copyright": "天津爱悦读科技有限公司",
    "word_count": 121166,
    "introduction": "这是一本女孩到优雅女王的变形记\r\n是失恋或失意时的暖心大白与好闺蜜\r\n无论何时，也要心怀美好，认真生活，迎接生命的厚待\r\n\r\n这是认真生活的姑娘认真写的一本书：\r\n失恋也好，跌落低谷也好，都像是从两个人的华尔兹到一个人的独舞，庆幸的是我们努力、认真，没有低头，一路保持优雅，最终迟早会迎接命运深处的掌声。\r\n我们都一样，美丽又彷徨，从女孩到女王的修炼道路上，唯有越努力，才越幸运，即使跌倒，也依旧要优雅地昂头站起来，不然皇冠会掉。\r\n失恋抑或失意，都会在你回首看时，感谢那段曾经认真生活的孤独日子，也感谢那些陪伴与失意，是它们让你拥有享受生命有分量的厚待，感谢这本书既像闺蜜又像暖心大白一样的安慰、陪伴、点醒。",
    "cover": "http://Tnxjtssad12312HAtA1231AVI0.jpg",
    "tags": [
      "失恋",
      "闺蜜",
      "暖心",
      "命运",
      "认真",
      "努力",
      "优雅",
      "女王",
      "文学",
      "女孩",
      "修炼",
      "掌声",
      "失意",
      "散文随笔"
    ],
    "authors_introduction": [
      {
        "blog": "",
        "email": "",
        "weibo": "",
        "name": "日光卿晨",
        "introduction": "日光卿晨，本名刘佳佳。浪漫主义的理工科妹子，南京师范大学研究生毕业，国家电网工程师，天蝎座。“ 经典短篇阅读”、“行动派”等公众号的专栏作者。作品多见于现在主流的公众号，其中《为什么你不能体面地做自己》在豆瓣收获阅读量11019，点赞量753次；《沦陷在穷困潦倒里不劳而获的人们》《新欢恰似故人归》《我们正在丢失的信任》《苟富贵，勿相妒》等阅读量均超过10万以上。曾获得世界华人写作比赛青年组金奖。"
      }
    ]
  }
}
```
