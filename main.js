import Vue from 'vue';
import App from './App';
import store from './store';
import Request from './common/request';
import config from './common/config';
import util from './common/util';
import validate from './common/validate';
import api from './api/index';
import Dialog from '@/components/ws-dialog/ws-dialog.js';
Vue.use(Dialog);
import cuCustom from './colorui/components/cu-custom.vue';
Vue.component('cu-custom',cuCustom);
import './common/filter.js';
import './common/mixin.js';

Vue.prototype.$store = store;
Vue.prototype.$config = config;
Vue.prototype.$http = Request;
Vue.prototype.$Request = Request;
Vue.prototype.$api = api;
Vue.prototype.$util = util;
Vue.prototype.$validate = validate;
Vue.config.productionTip = false;


App.mpType = 'app';

const app = new Vue({
	store,
    ...App,
})

app.$mount()
