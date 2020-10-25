import Vue from 'vue'
import 'normalize.css'
import router, { destroy } from './router'
import 'material/config/axios'
import io from 'material/directives/v-lazy'
import { destroy as scrollDestory } from 'material/lib/scroll'
import initAxios from '@/config/axios'
import {
  Tag,
  Icon,
  Search,
  Notify,
  Loading,
  Empty,
  Mask,
  Button,
  Image,
} from 'material/ui'
import App from './App.vue'
import 'material/ui/index.less'
import './less/index.less'

Vue.use(Tag)
Vue.use(Icon)
Vue.use(Search)
Vue.use(Notify)
Vue.use(Loading)
Vue.use(Empty)
Vue.use(Mask)
Vue.use(Button)
Vue.use(Image)

let app = null

function render(props = {}) {
  const { container } = props
  app = new Vue({
    router,
    beforeDestroy() {
      scrollDestory()
      io.disconnect()
    },
    render: h => h(App),
  }).$mount(container ? container.querySelector('#app') : '#app')
}

if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log('[vue] vue app bootstraped')
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props) {
  initAxios()
  const { container } = props
  container.style.height = '100%'
  console.log('[vue] props from main framework', props)
  render(props)
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount() {
  app.$destroy()
  app = null
  destroy()
}

if (module && module.hot) {
  module.hot.accept()
}
