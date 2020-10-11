import Vue from 'vue'
import router from './router'
import App from './App.vue'

let app = null

export default function ({ loading }) {
  if (!app) {
    app = new Vue({
      router,
      data() {
        return {
          loading,
        }
      },
      render(h) {
        return h(App, {
          props: {
            loading: this.loading,
          },
        })
      },
    }).$mount('#mainapp')
  } else {
    app.loading = loading
  }
}
