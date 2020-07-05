import Vue from "vue";
import ElementUI from "element-ui";
import VueUploadComponent from "vue-upload-component";
import store from "./store";
import Axios from "axios";

import App from "./App.vue";
import router from "./routes";
import "./element.components";
import "./shared/components/index";
import "./shared/filters";
import "./interceptors";

// css
import "./assets/css/normalize.css";
import "./assets/css/reset.css";
import "./assets/css/common.css";
import "element-ui/lib/theme-chalk/index.css";
// css

Axios.defaults.baseURL = process.env.VUE_APP_API_URL;

Vue.component("file-upload", VueUploadComponent);
Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
