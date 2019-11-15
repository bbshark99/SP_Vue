import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import Vuesax from 'vuesax'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vuesax/dist/vuesax.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(Vuesax)

new Vue({
  render: h => h(App),
}).$mount('#app')
