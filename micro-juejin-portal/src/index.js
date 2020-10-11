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
} from 'material/ui'
import 'material/ui/index.less'
import './less/index.less'

Vue.use(Icon)
Vue.use(Search)

const loader = loading => render({ loading })

// 1. 注册子应用
registerMicroApps([
  {
    name: 'micro-juejin-home',
    entry: '//localhost:8001',
    container: '#subapp-container',
    loader,
    activeRule: '/juejin/home',
  },
  {
    name: 'micro-juejin-pins',
    entry: '//localhost:8002',
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
