import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";

Vue.prototype.$client_id = "bed4ede8-3841-422c-9c38-1ea2cd7efe04";
Vue.prototype.$client_secret = "a761d068-54fe-45c3-a011-67a3f44f0cf1";
Vue.prototype.$authorization = "YmVkNGVkZTgtMzg0MS00MjJjLTljMzgtMWVhMmNkN2VmZTA0OmE3NjFkMDY4LTU0ZmUtNDVjMy1hMDExLTY3YTNmNDRmMGNmMQ==";

Vue.prototype.axios = axios;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  axios,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
