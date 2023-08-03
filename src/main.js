import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueLodash from 'vue-lodash'
import lodash from 'lodash'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueSimpleAccordion from 'vue-simple-accordion'
import 'vue-simple-accordion/dist/vue-simple-accordion.css'

import VueMoment from "vue-moment";
import moment from "moment-timezone";

Vue.use(VueMoment, {
  moment,
});

// const DEFAULT_TITLE = 'Fingerprint Technology Limited';
router.afterEach((to, from) => {
    Vue.nextTick(() => {
        document.title = to.meta.title || 'Fingerprint Technology Limited';
    });
});

// VUEPR SLIDE


// PROODUCT ZOOMER
import ProductZoomer from 'vue-product-zoomer'
Vue.use(ProductZoomer)

// AXIOS
import axios from "axios";
window.axios = axios;
const accessToken = localStorage.getItem("auth_token");
if (accessToken) {
  console.log(accessToken)
  axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
}
axios.defaults.baseURL = "http://127.0.0.1:8000/";
window.baseEnv = "http://127.0.0.1:8000/"


// ZOOM
const ImageZoom = require('vue-image-zoomer').default;
Vue.component('image-zoom', ImageZoom);

// SOCIAL SHARING
import VueSocialSharing from 'vue-social-sharing'
Vue.use(VueSocialSharing);


require('./assets/css/all.min.css');
require('./assets/css/bootstrap.min.css');
require('./assets/css/header.css');
require('./assets/css/home.css');
require('./assets/css/style.css');
require('./assets/css/Untitled-1.css');
require('./assets/css/offer.css');
require('./assets/css/basket.css');
require('./assets/css/checkout.css');

//
import InnerImageZoom from 'vue-inner-image-zoom';
import 'vue-inner-image-zoom/lib/vue-inner-image-zoom.css';
Vue.component('inner-image-zoom', InnerImageZoom);
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueLodash, { name: 'custom' , lodash: lodash })
Vue.use(VueSimpleAccordion)
new Vue({
  router,
  store,
  vuetify,
  BootstrapVue,
  IconsPlugin,
  render: h => h(App)
}).$mount('#app')
