import Vue from 'vue'
import {
  registerMicroApps,
  setDefaultMountApp,
  runAfterFirstMounted,
  start,
} from 'qiankun'
import 'normalize.css'
import render from './render'
import {
  Icon,
  Search,
  Notify,
} from 'material/ui'
import 'material/ui/index.less'
import './less/index.less'

Vue.use(Icon)
Vue.use(Search)
Vue.use(Notify)

const loader = loading => render({ loading })

// 1. 注册子应用
registerMicroApps([
  {
    name: 'micro-juejin-home',
    // '//localhost:8001' 改成 '/juejin/micro-juejin-home'之后通过webpack-dev-server进行代理，好处不用显示设定ip
    // 另外需要注意不能与activeRule相同, 如果相同的话直接展示代理的页面
    entry: '/juejin/micro-juejin-home',
    container: '#subapp-container',
    loader,
    activeRule: '/juejin/home',
  },
  {
    name: 'micro-juejin-pins',
    entry: '/juejin/micro-juejin-pins',
    container: '#subapp-container',
    loader,
    activeRule: '/juejin/pins',
  },
], {
  beforeLoad: [
    app => {
      console.log('[LifeCycle] before load %c%s', 'color: green;', app.name)
    },
  ],
  beforeMount: [
    app => {
      console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name)
    },
  ],
  afterUnmount: [
    app => {
      console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name)
    },
  ],
})

// 2. 设置默认进入的子应用
setDefaultMountApp('/juejin/home')

// 3. 启动应用
start()

runAfterFirstMounted(() => {
  console.log('[MainApp] first app mounted')
})

if (module && module.hot) {
  module.hot.accept()
}
