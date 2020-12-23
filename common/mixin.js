import Vue from 'vue';
import store from '@/store/index.js';

Vue.mixin({
    methods: {
        jumpTo(e){
            let target = e.currentTarget || e.target;
            let url = target.dataset.url || '';
            let type = target.dataset.type;
            let isAuth = target.dataset.auth || false;
            if(url === '' || url === '#') return ;
            if(isAuth === 'true' && !store.getters.isLogin) return ;
            switch(type){
                case 'SWITCH':
                    uni.switchTab({url});
                break;
                case 'REDIRECT':
                    uni.redirectTo({url});
                break;
                case 'RELAUNCH':
                    uni.reLaunch({url});
                break;
                case 'BACK':
                    uni.navigateBack();
                break;
                default:
                    uni.navigateTo({url});
                break;
            }
        }
    }
})
