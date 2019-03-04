## 生命周期

- 当应用启动时 React Native 在内存中生成虚拟 DOM
- 状态过程：组件初始化 挂载 DOM 虚拟 DOM 卸载

### 生命周期钩子

#### 初始化及挂载阶段

> 初始化构造函数，和 state.

```javascript
  constructor(props) {
    super(props);
    this.state = {};
  }
```

#### componentWillMount

> 组件将要挂载
> render 前执行
> 生命周期内只执行一次。

```javascript
  componentWillMount() {
    console.log('组件将要挂载！')
  }
```

#### componentDidMount

> 组件已挂载
> render 后执行
> 生命周期内只执行一次。
> 异步请求等初始化操作可在这。

```javascript
  componentDidMount() {
    console.log('组件已挂载！')
  }
```

#### componentWillReceiveProps

> 当组件接收到 props 时执行,
> 参数为传递的 props。
> render 后执行
> 生命周期内可多次执行。
> 通常在此方法接收新的 props 值，重新设置 state。

```javascript
  componentWillReceiveProps(nextProps) {
    console.log('组件接收到新的Props，值为：', nextProps)
  }
```

#### shouldComponentUpdate

> 在 componentWillReceiveProps(nextProps) 执行之后立刻执行；或者在 state 更改之后立刻执行。
> 参数，分别是 props 和 state。
> 生命周期内可多次执行。
> 如果该方法返回 false，则 componentWillUpdate(nextProps, nextState) 及其之后执行的方法都不会执行，组件则不会进行重新渲染。

```javascript
  shouldComponentUpdate(nextProps, nextState) {
    console.log('在 componentWillReceiveProps(nextProps) 执行之后立刻执行；或者在state更改之后立刻执行，值为：')
    console.log(nextProps, nextState)
    return true;
  }
```

#### componentWillUpdate

> 在 shouldComponentUpdate(nextProps, nextState) 函数执行完毕之后立刻调用
> render()函数执行之前调用
> 参数: props 和 state
> 生命周期可多次执行

```javascript
  componentWillUpdate(nextProps, nextState) {
    console.log('在 shouldComponentUpdate(nextProps, nextState) 函数执行完毕之后立刻调用；render()函数执行之前调用，值为：')
    console.log(nextProps, nextState)
  }
```

#### componentDidUpdate

> render()方法执行之后立刻调用
> 参数: props 和 state
> 生命周期可多次执行

```javascript
  componentDidUpdate(preProps, preState) {
    console.log('render()方法执行之后立刻调用，值为：')
    console.log(preProps, preState)
  }
```

#### componentWillUnmount

> 组件虚拟 DOM 卸载

```javascript
  componentWillUnmount() {
    console.log('render()方法执行之后立刻调用，值为：')
  }
```
