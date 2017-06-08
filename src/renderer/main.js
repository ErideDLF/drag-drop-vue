import 'bulma/css/bulma.css';
import Vue from 'vue';
import Electron from 'vue-electron';
import App from './App';

Vue.use(Electron);

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: { App },
  template: '<App/>',
}).$mount('#app');
