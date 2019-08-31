import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vant from 'vant';
import 'vant/lib/index.css';
import { Search } from 'vant';
Vue.use(Search);
import { Tab, Tabs } from 'vant';
Vue.use(Tab).use(Tabs);
import { Skeleton } from 'vant';
Vue.use(Skeleton);
import { Image } from 'vant';
Vue.use(Image);
import { Lazyload } from 'vant';
Vue.use(Lazyload);
import { Cell, CellGroup } from 'vant';
Vue.use(Cell).use(CellGroup)
import { Button } from 'vant';
Vue.use(Button);
import { Icon } from 'vant';
Vue.use(Icon);
import { Card } from 'vant';
Vue.use(Card);
import { PullRefresh } from 'vant';
Vue.use(PullRefresh);

import axios from 'axios'
Vue.prototype.$axios = axios;


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
