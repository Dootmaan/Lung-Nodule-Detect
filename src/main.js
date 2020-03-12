import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from '../src/router/index.js'
import axios from 'axios'
import qs from 'qs'
import VueCookies from 'vue-cookies'
import api from './config/api'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$axios = axios;
Vue.prototype.qs = qs;
Vue.prototype.api = api;
Vue.use(VueCookies);

new Vue({
  render: h => h(App),
  router,
  components: { App },
  created(){
    if (this.$cookies.isKey('userId'))
        this.api.userId = this.$cookies.get('userId');
    else
        this.api.userId = '';

    // window.console.log('============'+this.api.userId+'-');
}
}).$mount('#app')
