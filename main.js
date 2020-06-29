import Vue from 'vue';
import App from './App';
import store from './store';
import Request from './common/request';
import config from './common/config';
import util from './common/util';
import validate from './common/validate';

import cuCustom from './colorui/components/cu-custom.vue';
Vue.component('cu-custom',cuCustom);

Vue.config.productionTip = false;

Vue.prototype.$store = store;
Vue.prototype.$config = config;
Vue.prototype.$http = Request;
Vue.prototype.$util = util;
Vue.prototype.$validate = validate;

App.mpType = 'app';

const app = new Vue({
	store,
    ...App
})

app.$mount()
